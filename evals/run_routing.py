#!/usr/bin/env python3
"""Run the routing evals in evals/routing.json against the skill in this repository.

For each case: a fresh temporary folder with the case's fixture files (and, if asked, a git
branch or a product layer), then `claude -p <prompt> --plugin-dir <repo>`. A case passes
when the skill triggers (or, for `trigger: false`, does not) and the expected mode's method
file is read (review also counts when lenses are read with no other method file);
`product_layer: true` also requires `.design-critic/product.md` to be read.
`expect` notes are printed for a human to check in the transcripts.

    python3 evals/run_routing.py                 # all cases, 4 in parallel
    python3 evals/run_routing.py R01 R13 -j 2    # selected cases
    python3 evals/run_routing.py --keep out/     # keep transcripts in out/

Needs the claude CLI, signed in. Costs one short session per case.
"""
import argparse
import concurrent.futures as cf
import json
import os
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
GIT = ["git", "-c", "user.email=eval@example.com", "-c", "user.name=eval"]


def prepare(case, wd):
    for rel in case.get("files", []):
        shutil.copy(os.path.join(HERE, rel), wd)
    setup = case.get("setup")
    if setup == "git-branch":
        # a base commit, then a feature branch that removes a focus outline and adds transition: all
        run = lambda *a: subprocess.run(a, cwd=wd, check=True, capture_output=True)
        run("git", "init", "-q", "-b", "main")
        run("git", "add", "-A")
        run(*GIT, "commit", "-qm", "base")
        run("git", "checkout", "-qb", "feature")
        for name in os.listdir(wd):
            if name.endswith(".html"):
                path = os.path.join(wd, name)
                text = open(path, encoding="utf-8").read().replace("</style>", ".btn{transition:all .2s}</style>")
                open(path, "w", encoding="utf-8").write(text)
        run(*GIT, "commit", "-qam", "Restyle checkout buttons")
    elif setup == "product-layer":
        os.makedirs(os.path.join(wd, ".design-critic"))
        with open(os.path.join(wd, ".design-critic", "product.md"), "w", encoding="utf-8") as f:
            f.write("# Product layer — Alpha\n\n## 6. Hard rules\n\n"
                    "- The primary action is always the product Button, never a styled div.\n")


def run_case(case, keep):
    wd = tempfile.mkdtemp(prefix=f"eval-{case['id']}-")
    try:
        prepare(case, wd)
        proc = subprocess.run(
            ["claude", "-p", case["prompt"], "--plugin-dir", ROOT, "--output-format", "stream-json",
             "--verbose", "--max-turns", "8"],
            cwd=wd, stdin=subprocess.DEVNULL, capture_output=True, text=True, timeout=900)
        lines = proc.stdout.splitlines()
        if keep:
            os.makedirs(keep, exist_ok=True)
            with open(os.path.join(keep, f"{case['id']}.jsonl"), "w", encoding="utf-8") as f:
                f.write(proc.stdout)
    except subprocess.TimeoutExpired:
        lines = []
    finally:
        shutil.rmtree(wd, ignore_errors=True)

    triggered, reads = False, []
    for line in lines:
        try:
            event = json.loads(line)
        except ValueError:
            continue
        if event.get("type") != "assistant":
            continue
        for block in event["message"]["content"]:
            if block.get("type") != "tool_use":
                continue
            if block["name"] == "Skill" and "design-critic" in block["input"].get("skill", ""):
                triggered = True
            if block["name"] == "Read":
                reads.append(block["input"].get("file_path", ""))
    modes = [m for m in ("review", "build", "spec", "test")
             if any(r.endswith(f"method/{m}-method.md") for r in reads)]
    if not modes and any("/lenses/" in r for r in reads):
        # review often runs from SKILL.md's one-screen summary straight into the lenses
        modes = ["review"]
    product = any(r.endswith(".design-critic/product.md") for r in reads)

    ok = triggered == case.get("trigger", True)
    if ok and case.get("trigger", True) and case.get("mode"):
        ok = case["mode"] in modes
    if ok and case.get("product_layer"):
        ok = product
    return case, ok, triggered, modes, product


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("ids", nargs="*", help="case IDs to run (default: all)")
    ap.add_argument("-j", "--jobs", type=int, default=4)
    ap.add_argument("--keep", help="folder to keep the transcripts in")
    args = ap.parse_args()

    cases = json.load(open(os.path.join(HERE, "routing.json"), encoding="utf-8"))["cases"]
    if args.ids:
        cases = [c for c in cases if c["id"] in set(args.ids)]
    passed = 0
    with cf.ThreadPoolExecutor(args.jobs) as ex:
        for case, ok, trig, modes, product in ex.map(lambda c: run_case(c, args.keep), cases):
            passed += ok
            note = f" · check: {case['expect']}" if case.get("expect") else ""
            print(f"{'PASS' if ok else 'FAIL'} {case['id']} [{case['lang']}/{case['role']}] "
                  f"trigger {case.get('trigger', True)}→{trig} · mode {case.get('mode', '—')}→{','.join(modes) or '—'}"
                  f"{' · product layer read' if product else ''}{note}")
            sys.stdout.flush()
    print(f"\n{passed}/{len(cases)} passed")
    sys.exit(0 if passed == len(cases) else 1)


if __name__ == "__main__":
    main()
