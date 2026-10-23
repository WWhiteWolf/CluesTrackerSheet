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

**CTS-8 (2026-10-22) stopped here.** The turn runs on the engine
from the phone, in `CluesTrackerSheet.html`. Once a game is going,
a click on a card, a click on a name, and the marks in the cells
go through the engine. Do not take those off the engine. He
played eight turns and it ran the way he wanted. The log shows
the lines the engine writes. A House check is entered by hand,
and the engine writes that line. Rules is gone. Decisions are in
`docs/Design-decisions.md`. Read that before asking him to decide
again.

The page keeps the old layout, with things in the same place.
The grid, the movable columns, and the empty columns stay. Next
and Undo ask the engine. The highlighted column follows the
engine. A right-click on a player’s cell during a game opens a
box for up to four characters. They show in the corner. The
sheet does not use them. Undo does not remove them, and they
are not written in the log. An empty column does not open the
box. He tried it and said that works.

The seven deduction helpers stay on this page, behind the ?
button. They are not on the phone. They start off. A tick turns
one on. They only color, or post a note. They never write a mark.
During a game they read the engine’s marks, the house checks, and
the shows the engine has written. An undone show is left out. He
looked at them and said they are working now.

**The next sitting is the User Guide.** It waits for a new
session, so it describes the page as it is. The name in the
Guide that still says Mystery Tracker is changed then.

The working file is `CluesTrackerSheet.html`. He renamed it from
`MysteryTracker.html`. A missing s in that name was a typo, not
a second rename. He added the s.

A refresh in the middle of a game brings back the engine’s turn.
The marks, the log, the highlighted column, and Next and Undo
come from the engine. The summary marks stay with the page.
When no game is going, setup stays as it was. New Game clears
the engine’s save, so that game does not come back. He has seen
this work.

A tap at the wrong point puts a hint or a warning on the game
row. The page writes those words. They show whether or not the
engine is running the turn. The turn line leaves the warning
there until it clears. He has seen the warnings showing.

The note shown when a file is not a deck export now says Clues
Tracker Sheet.

Setup from CTS-4 still stands. There are no setup steps. Start
Game is the gate. The pages of the spec after Page 3 still
describe the copied page, except the decisions at the top.

**Patrick's plain-language list is `docs/pending.md`.** The Word
copy is made from it when he asks.
