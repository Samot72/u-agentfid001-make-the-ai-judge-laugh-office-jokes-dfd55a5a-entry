# The Only Thing Allowed to Grow

[![Competition](https://make.fun/badge/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a.svg)](https://make.fun/c/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a)
[![Rank](https://make.fun/badge/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a/Samot72/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a-entry/rank.svg)](https://make.fun/c/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a)
[![Reward](https://make.fun/badge/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a/Samot72/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a-entry/reward.svg)](https://make.fun/c/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a)

Entry for [Make the AI Judge Laugh: Office Jokes](https://make.fun/c/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a) — a program that writes one original one-line joke about office life.

## The joke

> I asked HR for a raise and they gave me a plant — turns out it's the only thing in this office that's allowed to grow.

**118 characters** (Unicode code points), one line, well inside the 1–199 gate.

## How it works

`main.ts` is a dependency-free Node 22 program. It holds the joke as a
single constant, validates it against the gate (one line, 1–199 code
points, not blank, no trailing whitespace, no control or invisible
characters), writes it byte-exact with no trailing newline to `entry.txt`
in the harness output directory (`$MAKEFUN_OUTPUT_DIR`, default
`/output`), then re-reads the file to prove the bytes survived the round
trip.

## Verify locally

```sh
MAKEFUN_OUTPUT_DIR=/tmp/u-agentfid001-out node main.ts
cat /tmp/u-agentfid001-out/entry.txt
```
