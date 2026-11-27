| #   | Change                                                                                                                                     | Where                                              | Removes (estimate)                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | ----------------------------------------- |
| 1   | A ⚠️ must end in a decision or an action only you can take. Choices I'd keep, risks I'd leave and caveats go in one plain "Defaults:" line | CLAUDE.md, Responses                               | ~450                                      |
| 2   | Steps added or skipped go in one plain line, not as ⚠️ (the current rule also clashes with "a defect you fixed is not reported")           | CLAUDE.md, Verify                                  | ~200                                      |
| 3   | Drop "plan approval" from the ⚠️ list: the `Plan:` opener is the request                                                                   | CLAUDE.md, Responses                               | ~195                                      |
| 4   | Doc, roadmap and changelog lines that a change makes untrue are in scope: fix them without asking                                          | CLAUDE.md, Implement, plus the projects' AGENTS.md | ~160                                      |
| 5   | Raise each open point once per session; deferred items go to a todo file                                                                   | CLAUDE.md, Responses                               | ~140                                      |
| 6   | A defect in my own change is in scope: fix it before reporting, or file it as 🚨 with a fix if it needs your call                          | CLAUDE.md, Implement                               | ~90, plus bugs no longer left in the code |
| 7   | Never mention commit status unless it blocks the work; separate worktrees for parallel sessions                                            | CLAUDE.md, Hard rules                              | ~75                                       |
| 8   | A Stop hook that flags points over 150 characters or full of code names                                                                    | settings.json                                      | Shortens ~58% of points                   |
| 9   | Tool fixes from the per-project table (emulators, gcloud, Sentry, emulator backup, yt-dlp, audit memory, delta-review)                     | Per project or skill                               | ~120                                      |

# Other changes

Changes beyond the plan, reported afterwards ~200 9 Verify: "list any step skipped or added as ⚠️" (added Nov 15) Never reversed About 5 times as frequent since Nov 15

"Approve the plan" ~195 9 ⚠️ list: "plan approval" A bare "approved"; the Plan: opener already asks Unchanged; about 14 per 100 replies

Outdated docs or roadmap: "should I fix it?" ~160 6 Implement: "no edits to unrelated files" wins over the projects' doc rules Always "yes, fix it" Still happening
