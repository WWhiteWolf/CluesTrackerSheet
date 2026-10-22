# Session hand-off — Clues Tracker Sheet

This file carries only what the next session needs: where the work
stands and what is open in front of it. It stays under 400 lines.
`docs/index.md` says which file is the home for a document. It is
not a reading order, and it is not opened at the start. A finished
session is written at the top of `docs/handoff-history.md`, which
is never read whole. The history before this project is
`Projects/MysteryCluesTracker`, opened only when something needs
tracing.

## Where things stand

**Opened 2026-10-13.** Clues Tracker Sheet is a new project, built
off Mystery Clues Track Sheet. The original app stays alive and on
the App Store, and it can still be changed on its own.

The rebuilt engine, the phone page, the tests, the fonts, and the
theme tuner were copied as they stood. The page shows Clues Tracker
Sheet.

The chain is CTS. Patrick named it on 2026-10-13. Nothing here
is a Y-session. Those stay with the original.

The original app's caution about hard-coded Classic card names does
not govern this project. This project may carry built-in decks with
those names.

**CTS-1 (2026-10-13) — the repository is started.** The GitHub
repository is `WWhiteWolf/CluesTrackerSheet`, and it is public.
It is not a fork of Mystery Clues Track Sheet. The first commit
is `Init CTS`. `.DS_Store` is left out. The original app's
history was not copied. The maps and the test steps still say
the old name inside the text, and that was left on purpose.

The folder had been committed into Build-root, the Projects
repository, during Y-53. `CluesTrackerSheet/` is on that
repository's ignore list. Commit `2nd try` stopped tracking the
folder there. The files stayed in this folder.

## What is open

**CTS-4 (2026-10-21).** Setup is in `MysteryTracker.html` and in
Page 3 of `docs/ClueTrackerSheet-spec.md`. There are no setup
steps. Start Game is the gate. The pages of the spec after Page 3
still describe the copied page. Mystery Tracker is already on
elyfont.com.

**CTS-5 (2026-10-22).** The game side is underway in
`MysteryTracker.html`. Decisions already made are in
`docs/Design-decisions.md`. Read that before asking Patrick to
decide again. A new decision is written there.

The engine runs turn order and deductions only. The page keeps
the layout, how marks look, a right-click, and the rules that
belong to marking.

Already in the page, and not to be taken out: the grid fills the
space and stays in proportion when the viewing percentage changes,
including the text. The column headers stay the height of their
words. The grid does not bring up scroll bars. The card column is
only as wide as the names need. A player column can be dragged
during play without changing the turn order. Columns with no name
stay visible and stay out of the turn.

Next and Undo ask the engine. The highlighted column follows the
engine.

**The next piece.** Once a game is going, a click on a card, a
click on a name, and the marks drawn in the cells go through the
engine, and a right-click on a cell does nothing. That is wider
than the decision. Put the marking back on the page. Leave turn
order and deductions with the engine. Do not take out the grid,
the column moving, or the empty columns.

The right-click is not settled. `docs/Design-decisions.md` says
so. Do not change it until Patrick says which account stands.

A refresh in the middle of a game still brings back the old saved
page, not the engine's turn.

The working file is still named `MysteryTracker.html`. It should
be `CluesTrackerSheet.html`. Patrick does the rename. The original
in the Mystery Tracker folder stays untouched.

**Patrick's plain-language list is `docs/pending.md`.** The Word
copy is made from it when he asks.
