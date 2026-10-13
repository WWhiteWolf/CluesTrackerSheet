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
Sheet. The iPhone and Android
wrappers were not copied. They carry the original app's store
identity.

The chain is CTS. Patrick named it on 2026-10-13. Nothing here
is a Y-session. Those stay with the original.

The original app's caution about hard-coded Classic card names does
not govern this project. This project may carry built-in decks with
those names.

## What is open

**The first packaging is the web version, for elyfont.com.** It has
not been started. The iPhone wrap and the Android wrap come after
it, and each will be new rather than a copy of the original's store
listing.

**The repository has not been started.** This folder is not a
repository yet. Three repositories stay separate, and the order
is this.

The `Projects` folder is its own repository, and it ignores each
app by name. `CluesTrackerSheet` is not on that list yet. Before
anything else, add `CluesTrackerSheet/` to `Projects/.gitignore`
and commit that line in the `Projects` repository only. If it is
missing, this app can get swept into the parent repository.

On GitHub, create a new empty repository. Do not fork Mystery
Clues Track Sheet. Leave the README, the license, and the GitHub
ignore file unchecked, so GitHub does not make the first commit.

Then start a new repository inside this folder. Do not copy the
original app's history. Leave `.DS_Store` out of the commit. The
first commit contains only the new file names. The maps and the
test steps still say the old name inside the text, and that was
left on purpose.

The original app's document changes stay in
`MysteryCluesTracker` and get their own commit there. Patrick
starts the GitHub repository. The assistant runs no git.

**Patrick's plain-language list is `docs/pending.md`.** The Word
copy is made from it when he asks.
