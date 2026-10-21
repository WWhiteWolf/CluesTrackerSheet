# Where the Clues Tracker Sheet documents live

One line per file, live or history, so a session can tell whether a
document exists and which file is the home. Written when the project
opened, 2026-10-13.

**`docs` is the live desk.** If the index has no file for a thing,
ask Patrick. Do not invent a home.

**This file is not a reading order.** The opening read is `handoff.md`
only, per rule 2 of this project's `CLAUDE.md`. Nothing here is opened
just because it is listed.

**Keep it true or delete it.** A stale index is worse than none.

The session history before this project stays in
`Projects/MysteryCluesTracker`. The documents that say how the
copied code works are in `docs-ref`, brought over as they stood.

## The desk — in `docs`

- **`handoff.md`** — the opening read. Where the work stands and what is open. Stays under 400 lines.
- **`handoff-history.md`** — this project's session archive. Newest sittings at the top. Headings are its index. Never read whole. Nothing is in it yet.
- **`index.md`** — this file. Which file is the home. Not a reading order.
- **`pending.md`** — Patrick's plain-language list. The source kept current. Asked about at the end-of-session refresh. Not part of the opening read.
- **`make-pending-docx.py`** — makes `pending.docx` from that list when Patrick asks. `python3 docs/make-pending-docx.py`. Proves the copy matches the markdown word for word. Never run on a schedule.
- **`palettes-tuned.css`** — the tuned color values, copied from the original app. The names and their purposes live in `theme-tuner.html`.
- **`rebuild-plan.md`** — the design of the shared engine and its wraps. The phone and the web each draw their own page. Copied from the original as it stood.

## The app — in the project root

- **`clues-tracker-engine.js`** — the shared heart, copied from the original app.
- **`clues-tracker-phone.html`** — the phone page. The name on the page is Clues Tracker Sheet.
- **`engine-tests.html`** — the engine's tests. Open it to run them.
- **`theme-tuner.html`** — the color names, their purposes, and their grouping.
- **`static/`** — the fonts and the icons the page and the tuner use.

## How the code works — in `docs-ref`

- **`function-map.md`** — what every piece of the rebuilt code is for. No line numbers. The engine, then the phone page. Copied from the original.
- **`message-map.md`** — every sentence the app says, and what puts it on screen. No line numbers. Copied from the original.
- **`color-law-and-names.md`** — the color reasoning. No values and no list of names. The values are `docs/palettes-tuned.css`. Copied from the original.
- **`test-spec-styling.md`** — how a test section is written. Read it before drafting or editing any test section. Copied from the original.
- **`build-clues-tracker-test.js`** — the script that generates the master test document. It writes the file to `/tmp`. The steps still say the old name. They describe the old single-file app.
- **`clues-tracker-master-test.docx`** — that document. The same columns and styling. The steps still say the old name. The engine's own tests are `engine-tests.html`.

## Not in this folder

- **`Projects/MysteryCluesTracker`** — the original app, still on the App Store. Its build history, Guide file, pending list, roadmap, and store pages stay there.
- The iPhone wrapper and the Android wrapper were not copied. They carry the original app's store identity.
- GitHub, the elyfont.com page, and any store listing for this project do not exist yet.
