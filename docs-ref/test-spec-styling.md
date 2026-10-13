# Test-Spec Styling — drafting conventions for the master test doc

Created session #100 (2026-07-17; proposed #99). For
`docs/mcts-master-test.docx` and the script that builds it. Read this
before drafting or editing any test section. Conduct rules (one step
at a time, "Go?", Patrick commits) live in `CLAUDE.md` and the master
hand-off — this file is only about HOW THE TEST SPEC IS WRITTEN.

## The standing law

**The docx is GENERATED. Extend `docs/build-mcts-test.js` — never
hand-edit the docx.** Every section lives in the script as
`[do, makeSure]` pairs; step numbers (N.1, N.2 …) come from the
script at build time and are never typed into text. After any change,
regenerate and verify the docx against the intended wording —
row-for-row, not by eye.

## The document's shape

- A SINGLE-PASS procedure: 30 sections run in order, each picking up
  exactly where the one before ended. Appendix A (the deal and the
  eight turns) is the tester's face-up view of the scripted game.
- Table columns: Step | √/X | Do as directed below: | Make sure: |
  Notes. The script authors only Do and Make sure; √/X and Notes are
  the tester's.
- Every section opens with a start banner: "Start: …" naming the
  exact carried-in state — the turn, who is thinking, and any marks
  carried in from earlier sections.
- A section's first step may also say so in words: "This section
  continues from X.Y."
- The cast is fixed: Ann (Seat 1), Bob (Seat 2), Me (Seat 3),
  Dan (Seat 4).

## Step voice

- **Do:** imperative, one action or one tight cluster ("Tap X, then
  tap Y in the list."). **Make sure:** present tense, declarative —
  what IS on the screen, checkable at a glance.
- An EMPTY Do cell makes an observation row: the tester keeps
  looking after the previous action.
- Exact on-screen text always in quotes, word for word from the app.
  Wording is decided by reading `mystery-clues-tracker.html` (or from
  a Patrick phone run) — never from memory.
- **Text handled as a string is marked, in BOTH cells (Patrick,
  #142).** Whenever text is being treated as an object rather than as
  conversation — what the app shows, and equally what the tester is
  told to type — it goes in straight double quotes, in the Do cell as
  well as the Make sure: `type "XXXX"`, not `type XXXX`. Quotes are
  the mark because italics are not available: the cell builder
  (build-mcts-test.js line 898) puts a single run in a cell with only
  a bold switch, so no part of a step can look different from the
  rest without changing the script's machinery. Where a Do names a
  QUANTITY instead of a string — "type fourteen characters", "type
  seven letters" — no quotes is correct; that is a description, not
  something to copy.
- Describe only what is there now. Never contrast with what used to
  be there or what was removed.
- CAPS carry the one load-bearing word of a step — "by ITSELF",
  "THE SKIP", "FRESH INSTALL" — used sparingly or not at all.
- "(Behind the curtain: …)" holds tester-only knowledge from
  Appendix A — what the app cannot and must not know.
- Plain language, short sentences, no programmer jargon. Internal
  code names never appear.
- Typographic apostrophes (Ann's → Ann’s); straight double quotes
  for quoted screen text; literal emojis exactly as the app shows
  them (😢 👋 🤔 ⏳ 🏠 ∑ ✅ ❌ ▶ ↩ 📖 💬).

## Canonical phrasings for recurring mechanics

- Two-tap confirms — arming: "Tap X once." → "The button turns red
  and reads 'Sure?' — armed." Lapse: "Wait about 3 seconds" → "it
  quietly disarms/resets." Firing: "Tap X, then again at 'Sure?'."
  (The armed label varies: Sure? / Delete? / Load? / Clear? /
  Undo? / Prev Turn? — quote the real one.)
- Refusals: "The tap is refused" (or "Refused —") plus the exact
  message, and where it shows. Warnings and refusals render WHITE;
  directions and confirmations gold; the Setup strip is always
  black-on-gold (#96).
- Kill-and-relaunch: "Close the app (swipe up from the bottom,
  pause, swipe the app away) and reopen it."

## What a section covers

- Every path through its feature: the happy path, each refusal, the
  arm-and-lapse, Cancel/Close-changes-nothing — and, when it comes
  cheap, an already-proven floor re-proved quietly (a 3-card hand
  re-proves the "at least 3" minimum without spending a step on it).
- Every asserted behavior is code-verified or phone-verified before
  the section is settled.
- The 💬 feedback address is Patrick's own inbox — a delivery
  check (as in 24.12) is verifiable by him alone.

## How a section is born (the §22 pattern)

1. Claude reads the real code paths, then proposes the section as a
   two-column draft in chat — for discussion, not yet in the script.
2. Patrick marks it up; wording settles together.
3. Whenever the current code is already loaded on Patrick's phone,
   his review IS a phone run — he always runs the draft on the phone
   as he reads it, review and test together, because the phone is
   the only real proof. What the run teaches goes back into the
   draft.
4. On Patrick's go, the settled steps are pasted into
   `build-mcts-test.js`, the docx is regenerated and verified
   row-for-row, and any standalone draft file is deleted.
