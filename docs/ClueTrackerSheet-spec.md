# Clues Tracker Sheet — Functional Specification (Code-Logic Edition)

A function-anchored, plain-English description of every code module in
`MysteryTracker.html`. Each block describes what one function (or one
small group of related functions, or one data structure) does, when it
runs, what it changes, and any rules or edge cases that matter.
Detailed enough that the app could be rebuilt from this spec alone.

The companion draw.io diagram (`mystery-tracker-design.drawio`) uses
the same block IDs (B2.4, B3.8, etc.) as labels, with connectors
showing call sequences and data flow. The two are a pair: the diagram
is the map, this document is the territory.

Pages 1–15 mirror the diagram's page tabs. Appendices document the
data shapes that cross page boundaries.

## Decided for this rebuild

Written CTS-3, 2026-10-21, and brought current in CTS-7.
The Setup below is in the page. The pages after Page 3 still
describe the rest of the page as it stood when it was copied in.
Where those pages mention a Rules button or a Rules panel, that
is out of date. Rules is not kept.

The work is done in Clues Tracker Sheet. Mystery Tracker stays the
archive. The starting page is the older web version, copied in as
`MysteryTracker.html`. He renamed that file to
`CluesTrackerSheet.html`. A missing s in that name was a typo,
not a second rename. He added the s. On disk the working file is
`CluesTrackerSheet.html`. Mystery Tracker is already on elyfont.com.
This web version goes on elyfont.com.

The page opens with the Clue Classic deck loaded. That deck is
the one saved as Clue C on 2026-05-26. Saved decks can be loaded.
A saved deck is held to the same shape: three categories and 21
cards. No cards are added or removed. Rows do not move up or
down. There are no muted cards and no unused categories.

The categories and cards are:

- suspects — Mr. Green, Col. Mustard, Dr. Orchid, Mrs. Peacock,
  Prof. Plum, Miss Scarlett
- weapons — Candlestick, Dagger, Lead Pipe, Revolver, Rope, Wrench
- rooms — Ballroom, Billiard Room, Conservatory, Dining Room,
  Hall, Kitchen, Library, Lounge, Study

Category names cannot be changed. The name of any card can be
changed. There is no fourth category, and there are no cards with
numbers for names.

There are no setup steps. Before the game starts, card names,
player names, card counts, and Me can all be changed, in any
order. Me's cards are checked in Me's column. Start Game is the
gate. After the game starts, those edits close. New Game is how
you come back to them. Next and Undo run the game. They do not
walk a setup.

Play waits until one seat is Me, and at least two players are
seated, counting yourself, and Me's cards are checked. If Me has
a card count, the checks must match it. If Me has no count, at
least two cards are checked. The deck is always 21 cards. The
three cards in the answer envelope are fixed. The other 18 go to
the players or the board. The number of cards on the board is not
entered on its own. If the players' card counts add up to 18,
no cards are on the board. If every seated player has the same
count and the counts add up to less than 18, the cards not
accounted for are on the board. A seated player with no count
keeps the game closed. Any other split keeps the game closed.

The turn runs on the engine from the phone. Once a game is going,
a click on a card, a click on a name, and the marks in the cells
go through the engine, so the engine knows what to do. Next and
Undo ask the engine. The highlighted column follows the engine.
He does not want the old page’s logic patched in beside that.
Taking those clicks off the engine was tried in CTS-6 and he
rejected it. The paths were put back. He played eight turns and
it ran the way he wanted.

The page keeps the old layout, with things in the same place, and
it keeps how the marks look. The grid, the movable columns, and
the empty columns stay. During a game the cells are drawn from
what the engine returns. A card shown to him is an ordinary check.
A card he showed is the word Me. There is no star and no arrow.

The engine decides what the log says and when a line is written.
The log on the page shows those lines. While a game is going, the
page does not keep a second play log of its own. He has seen the
log working.

A House check is entered by hand. The page shows that check. When
the check settles, which is when the pointer leaves the cell, the
page tells the engine. The engine writes the log line then, and
it crosses that card off the other players. He has seen the log
line work, after nobody showed and he checked Rope.

Rules is not kept. The Rules button and the rules panel are gone.
He has seen both gone. Guide and the ? button stay. The game row
and the turn row show messages. He has seen the messages.

A tap at the wrong point puts a hint or a warning on the game
row, so he can see what is wrong. The page writes those words.
They are not part of the engine, and they show whether or not
the engine is running the turn. The turn line leaves the warning
there until it clears. The highlighted name still shows whose
turn it is. He has seen the warnings showing.

The name in the title and in the heading is Clues Tracker Sheet.
The version beside the heading is Ver. 1.0. He checked both on
the open page.

The right-click is for entering the manual cell characters only.
It is not a mark cycle. This is settled. Those characters are
not in the page yet.

A refresh in the middle of a game brings back the engine’s turn.
The marks, the log, the highlighted column, and Next and Undo
come from the engine. The summary marks stay with the page.
When no game is going, setup stays as it was. New Game clears
the engine’s save, so that game does not come back. He has seen
this work.

Three major pieces are left. Manual cell characters. Deduction
logic. The User Guide. The name in the Guide that still says
Mystery Tracker is changed when the Guide is done.

---

## Page 1 — Master Overview

Index of the spec. One linked block per other page:

- **B1.1** → Page 2: App Launch & Auto-Save
- **B1.2** → Page 3: Setup
- **B1.3** → Page 4: Me Column Lifecycle
- **B1.4** → Page 5: Turn Sequence
- **B1.5** → Page 6: Reveal Popups
- **B1.6** → Page 7: Auto-Mark Engine
- **B1.7** → Page 8: Manual Mark Cycle
- **B1.8** → Page 9: House Column
- **B1.9** → Page 10: Σ Summary Column
- **B1.10** → Page 11: Player Out
- **B1.11** → Page 12: Undo & State Recovery
- **B1.12** → Page 13: Game Decks
- **B1.13** → Page 14: Game Log
- **B1.14** → Page 15: Mute & Hide System
- **Appendix A** — Data Shapes
- **Appendix B** — Optional Deduction Rules

---

## Page 2 — App Launch & Auto-Save

This page covers what runs when the app first opens (or reloads),
and how every state change gets saved to long-term storage so a
later reload picks up where the user left off. The 10 blocks below
describe the launch sequence, the snapshot routines that save and
restore the game, the storage slot itself, the refresher that
keeps the four action buttons in step with the game, and the
default grid the app starts from:

- **B2.1** initState() — creates the empty per-card-per-player files
- **B2.2** buildTable() — generates the on-screen grid from the
  current deck
- **B2.3** Window-load handler — what runs when the page first opens
- **B2.4** applySnapshot() — restores a saved game into live state
- **B2.5** Deck-load worker — swaps in the categories and cards
  from a saved deck
- **B2.6** autoSave() — writes the current state to long-term
  storage
- **B2.7** getSnapshot() — bundles current state into a save record
- **B2.8** The save file in long-term storage — the storage slot
  itself
- **B2.9** updateButtonStates() — decides which of the four action
  buttons are clickable
- **B2.10** defaultCategories() — the grid and mute defaults the
  app starts from

**B2.1 · `initState()`.** Creates an empty file, a pigeonhole, where
the shared history of a specific player with a specific card will be
held. Each file starts with these blank flags:

- **has** — does this player hold this card?
- **doesn't have** — has this player been ruled out for this card?
- **was-asked** — has this card been part of a guess this player
  made?
- **was-shown** — has this player shown a card on a turn?
- **was-shown-to-me** — has this player shown this card to Me?
- **was-shown-by-me** — has Me shown this card to this player?

Plus an empty list of marks (each mark records the turn it was
placed on).

Runs once when the page first opens, and again on New Game.

**B2.2 · `buildTable()`.** Reads the current category-and-card list
and generates one row per card. Each row contains:

- a name cell on the left
- the summary (Σ) cell
- the house (🏠) cell
- six player cells

Above each category (including the first) sits a colored banner row:
the category name in the left Card column, then a colored spacer
filling the rest of the row — the Σ, house, and six player columns.
The new rows replace whatever was in the table before. Runs:

- when the page first opens
- on New Game
- when a saved game is restored
- after a deck load
- when a card or category is added or removed
- on a Setup-step change, but only when returning to a step already
  visited — so every Back rebuilds, while moving forward rebuilds only
  on re-entry, not on a first visit
- when leaving Step 5 with Undo (to clear the Me column)
- when a card or category rename is undone

**B2.3 · `window 'load' handler`.** Starts once the page has finished
loading. Does the following in order:

- removes leftover storage records from earlier app versions
- loads the saved deck-slot list and renders the deck buttons
- decides what to restore. When the saved page says a game is
  going, the engine’s save is read first. The marks, the log,
  the highlighted column, and Next and Undo come from the engine.
  The summary marks still come from the page save. When the saved
  page is still in setup, that setup is restored and the engine’s
  save is not opened. If there is no saved page, a remembered
  deck is loaded. New Game clears the engine’s save, so a later
  refresh does not bring that game back
- prepares the deck-bar visibility, phase-bar text, button states
  (**B2.9**), Rules text, and Guide content so the on-screen state
  matches what was just restored

**B2.4 · `applySnapshot(d)`.** Takes a saved game (the kind made by
`getSnapshot`) and writes every piece of it back into the live app.
The following come back exactly as saved:

- the categories and cards (including which were muted)
- the player name and card-count input boxes
- the full cell history (every mark on every cell)
- the game log
- the turn order, current step, and turn count
- the current setup step
- who's "Me" and Me's original player name
- the game phase
- which players are Out and how (Quit or Wrong Accusation)
- the list of cards that could still be the secret answer
- the summary-column marks
- the house-checked card list

When a game is going, the marks, the log, and the turn painted
on screen come from the engine’s save. The summary marks in
this record are the ones that come back.

The on-screen table is redrawn and every cell refreshed. Per-step
Setup snapshots are wiped — those don't survive a page reload.

**B2.5 · `_doLoadGameDeck(idx, deck, opts)`.** Swaps in the category
and card names from a saved deck. This runs in two situations:

- automatically at page load, when there's no saved in-progress game
  but a last-used deck is remembered
- when the user clicks a deck slot during Setup

Deck loading is only available during Setup. At Start Game the Deck
Bar swaps its contents to per-turn directive during Play.

The swap replaces the category and card names and clears all
marks — including Me's ✓s from Step 5. A new deck means new
cards; nothing held under the old names carries over (**B13.3**).

Player names and card counts come back only if `opts.loadPlayers`
is true. The page-load auto-restore sets this so the page returns
exactly as the user left it. User-clicked loads ask via a
checkbox in the load popup — shown when the deck has saved
names, checked by default (**B13.2**).

Me is always cleared on deck load. Me is per-laptop session state
and is never carried in a deck file.

**B2.6 · `autoSave()`.** Bundles the current state into a save record
(via `getSnapshot`) and writes it as text into the save file in
long-term storage. Runs every time something changes that should
survive a page reload — a name typed, a mark placed, a step advanced,
a deck loaded.

**B2.7 · `getSnapshot()`.** Gathers every piece of live state worth
preserving into a single record. The record contains:

- the full cell history (every mark on every cell)
- the game log
- the turn order, current step, and turn count
- the Me column position and Me's original player name
- the game phase
- the player header inputs and card counts (these live only in the
  long-term save — see B3.8 for why they're *not* in per-step Setup
  snapshots)
- the list of cards that could still be the secret answer
- the categories (each with its name and card list)
- which categories and which cards are muted
- which players are Out and how (Quit or Wrong Accusation)
- the summary-column marks per card
- the house-checked card list
- the in-progress state of a right-click mark cycle on a player cell
  (which stage you're at, what to revert to)
- the current setup step
- the on/off state of each optional deduction rule (**Appendix B**)
- the save format version (8)

**Not saved:** the in-flight short-term memory that only makes sense
while the app is running:

- the per-step Setup snapshots (the wizard's "go back and pick up
  where you left it" memory; "wizard" explained in the next section)
- the in-progress state of a click cycle on a 🏠 cell (same idea, for
  the house column)

Both reset whenever the page reloads. There's no meaningful way
to resume something the user was halfway through, so the save file
just captures the visible result of each click and forgets the
"where am I in this cycle" bookkeeping.

**B2.8 · The save file in long-term storage.** A single slot in the
browser's long-term storage, named so that older versions of the app
can recognize it. Holds the saved state as text — the same shape
`getSnapshot` produces. Cleared by any action that intentionally
starts the app fresh — today, that's only the New Game button. Read
once by the page-load handler. Not touched anywhere else.

**B2.9 · Button-state refresher (`updateButtonStates`).** One
routine owns the enabled/greyed state of the four action buttons
in the banner — Undo, Undo Typing, Next, and Start Game. No other
code enables or disables them; everything funnels through here.
Every time it runs, it works out fresh whether each of the four
should be clickable:

- **Undo** — in Setup, clickable from Step 2 on (on Step 1
  there's nowhere to go). In Play, clickable when the play-undo
  entry (**B12.4**) would find anything to undo — the button runs
  the same test, so a click it allows is never refused. What
  counts as undoable lives on Page 12.
- **Undo Typing** — the routine also shows and hides this one:
  visible only during Setup Steps 2–4, the typing steps.
  Clickable when the current step's typing memory (**B3.9**)
  holds at least one entry.
- **the Next button** — in Play, always clickable. In Setup,
  clickable through Step 4; on Step 5 it greys out and Start
  Game takes over.
- **Start Game** — clickable only on Setup Step 5 with a Me
  column set (**B4.1**) and Me's held-card clicks in place:
  exactly the typed card count, or at least two when no count is
  typed. In Play it stays greyed out.

Midway through, it also re-applies the Tab navigation rules
(**B3.11**).

It runs after anything that could change one of those answers: at
launch and game restore, on Start Game and Edit Setup, on every
Setup Next- or Undo-press, on the Me pick and player-name edits,
on every change to the typing memory, and throughout Play by
riding along on the stage refresher and on every undo-stack push.

Net: the four buttons are never stale — whatever just happened,
this one routine has already re-decided which of them are live.

**B2.10 · The default grid (`defaultCategories`).** The grid the
app starts with before anything is restored. Four categories
totaling 30 cards:

- Category 1 — Card 1 to Card 9
- Category 2 — Card 10 to Card 18
- Category 3 — Card 19 to Card 27
- Category 4 — Card 28 to Card 30

Two mute defaults come with it: Category 4 is muted, and its
three cards (Card 28, 29, 30) are muted individually (**B15.1**).

The defaults are used in three places:

- at boot — this is the grid the app holds until the load
  handler (**B2.3**) restores a saved game or last-used deck
- on New Game — the categories and both muted sets reset to
  these defaults
- on restoring a very old save with no usable categories, which
  falls back to this grid (**B2.4**)

Net: a fresh app and a New Game both start from the same grid:
4 categories, 30 cards, the fourth category switched off.

**Within-page connectors.** B2.1 → B2.2 → B2.3. B2.3 branches to B2.4
(saved game) or B2.5 (last deck) or neither. B2.7 → B2.6 → B2.8.
B2.3, B2.4, and B2.5 all end by calling B2.9 to refresh the buttons.
B2.10 is the grid in place when B2.3 restores nothing; B2.4 falls
back to it when a legacy save has no usable categories.

**Off-page connectors.** B2.4 → Page 5. B2.5 → Page 13. B2.6 receives
incoming connectors from almost every other page (every state-changing
block ends with an auto-save). B2.9 → Page 3 (re-applies the Tab
rules, **B3.11**; reads the typing memory, **B3.9**), Page 4 (checks
the Me state, **B4.7**), and Page 12 (the anything-to-undo test:
**B12.4**, using **B12.6**'s check). Like B2.6, B2.9 receives
incoming connectors from almost every page — Setup stepping (Page
3), the Me pick and name edits (Page 4), the turn flow's snapshot
pushes (Page 5), both undo paths (Page 12), and deck loads (Page
13) all end with a button refresh. B2.10's defaults are also
what New Game resets Page 15's muted sets to (**B15.1**).

---

## Page 3 — Setup

There are no setup steps. Before Start Game, the edits below are
all open, in any order. After the game starts, they close. New
Game opens them again.

The opening deck is the three categories and 21 cards named in
the decided section. Category names are shown and cannot be
edited. Nothing is muted. Rows do not move. No cards are added
or removed.

- **B3.1** Card name input
- **B3.2** Player name and card count
- **B3.3** Me selection
- **B3.4** Me's cards
- **B3.5** Start Game
- **B3.6** New Game

**B3.1 · Card name input.** Each card name can be changed before
the game starts. The card's records move with the new name. An
empty name is refused, and the old name stays. After the game
starts, the names are plain text.

**B3.2 · Player name and card count.** Each of the six columns
has a name and a count. The count takes digits only, two at
most. An empty count shows a question mark. Both can be changed
before the game starts. After the game starts, both are locked.

**B3.3 · Me selection.** A right-click on a named column header,
before the game starts, offers "I am [name]". That column
becomes Me.

**B3.4 · Me's cards.** Before the game starts, clicks in Me's
column check the cards Me holds. A click in any other column is
refused until the game starts. If Me has a card count, the
checks cannot go past it. If Me has no count, there is no
ceiling here. Start Game still wants at least two checks in
that case.

**B3.5 · Start Game.** Stays closed until all of these are true.

- One column is Me.
- At least two players are named.
- Me's checks match Me's count, or are at least two when Me has
  no count.
- The players' counts add up to 18, or every seated player has
  the same count and the total is under 18.

A seated player with no count keeps it closed. Any other split
keeps it closed. Counts that add up to 18 leave the board empty.
An even split under 18 leaves the rest on the board. The three
envelope cards are already set aside, so this is the deck of 21.

Next does nothing before the game starts. After Start Game, Next
and Undo run the turns.

**B3.6 · New Game.** Clears the game and opens the edits again.
That is the way back to them.

**Off-page.** Start Game moves into Page 4 and Page 5. Undo
during play is Page 12.

---

## Page 4 — Me Column Lifecycle

"Me" is the player column the user occupies in the real life game.
The Me column gets green styling, a "Me" label in the header, and
special handling from the auto-mark rules because the user knows
their own cards.

The 7 blocks below describe how Me gets claimed, switched, and
undone, plus how Start Game seals everything in:

- **B4.1** Claim Me (right-click Step 5 header)
- **B4.2** Switch Me to a different column
- **B4.3** Click held cards in Me column (Step 5)
- **B4.4** Undo from Step 5 with Me picked
- **B4.5** Start Game
- **B4.6** Me-column styling refresh
- **B4.7** Me state (`meCol` and `meOriginalName`)

**B4.1 · Claim Me.** Triggered when the user right-clicks a player
column header during Step 5 and picks "🙋 I am [player name]". The
menu appears only on a column that has a name; on the column that
is already Me, the item instead reads "✓ This is currently your Me
column" and is greyed out. Picking the item does the following:

- saves that column's typed player name aside (so we can restore
  it later)
- writes "Me" into the column's name box
- marks that column as Me's
- adds the green Me-column styling
- refreshes the other column markers, the phase-bar hint, the
  button states (**B2.9**), and the info bar
- triggers an auto-save

Available only during Step 5 — the header right-click does nothing
in other steps.

**B4.2 · Switch Me to a different column.** A special case of B4.1.
If the user right-clicks a DIFFERENT column to claim Me while Me is
already claimed elsewhere, two extra steps happen first:

- the previous Me column's name box is restored to its original
  player name (from the saved-aside name)
- every cell in the previous Me column's row is wiped clean — any
  ✓ marks the user placed while that column was Me are removed,
  and the column redraws blank

Then the normal Me claim proceeds. Net: only one column ever reads
"Me", and switching Me leaves no orphan marks anywhere.

**B4.3 · Click held cards in Me column (Step 5).** During Setup, the
only clicks accepted on the grid body are inside the Me column. A
click anywhere on the grid:

- **Me column** — toggles a ✓ mark on that cell. Each ✓ records
  "Me holds this card." When a card count is typed for the Me
  column, the ✓s can't go past it — a click that would add one
  more is refused with a message until you unclick a card. No
  count typed means no ceiling; unclicking is always free. All
  these marks record turn 0 (the Setup phase) and become the seed
  for the auto-X propagation that runs when Start Game is pressed.
- **Any other column** — rejected with a status message.

**B4.4 · Undo from Step 5 with Me picked.** Runs after the user
confirms the two-tap popup on Setup Undo from Step 5. Does the
following:

- restores Me's column name box to its original player name
- wipes every ✓ placed in the Me column
- resets the Me column index to "none picked"
- clears the saved Me original-name memory
- drops the Step-5 save slot (so re-entering Step 5 is a fresh
  canvas)

Then calls the standard Setup Undo to step back to Step 4.

**B4.5 · Start Game.** Triggered by the Start Game button. Validates
that Me is picked, that Me's held-card clicks are in place (the same
card-count gate B2.9 applies to the button), and that at least 2
columns have player names. Then does the following:

- locks the player-name and card-count boxes, the card-name boxes,
  and the category banners (no more renames during Play)
- sets the game phase to Play
- resets the turn counter to 1
- builds the turn order from the named columns in their visual
  order

Then runs the initial auto-X propagation. Muted rows are skipped
entirely; for each active card:

- if Me does NOT hold it, marks Me's own column with ✗ (the user
  knows their own hand)
- if Me DOES hold it, marks every other active player's column
  with ✗ (those players can't be holding a card Me is holding)

All these initial ✗ marks record turn 0. The Deck Bar swaps its
contents to the per-turn directive, the buttons refresh, and the
info bar updates.

**B4.6 · Me-column styling refresh.** Goes through each player
column — header and body cells — comparing it to the current Me
column.

- If it matches, adds the green Me styling.
- If it does not match, removes the styling.

The "Me" text in the header is not part of this refresh — it is the
column's name-box value, written when Me is claimed (**B4.1**).

Runs after a Me change, a name edit during Setup, Setup Undo,
Start Game, New Game, a deck load, and the saved-game restore on
page load.

**B4.7 · Me state (`meCol` and `meOriginalName`).** Two pieces of
memory that together keep track of which column is Me:

- **Where Me sits** (`meCol`) — the position of the player column
  currently claimed as Me, or "none picked" if Me hasn't been
  claimed yet.
- **The original player name** (`meOriginalName`) — the player
  name that was in that column before "Me" replaced it. Used to
  restore the name on Undo or on a Me-switch.

Both pieces are part of the saved snapshot and survive a page
reload. Both reset to "none picked" and empty on New Game.

**Within-page connectors.** B4.1 ↔ B4.2 (switching uses both). B4.3
writes the ✓s consumed by B4.5 at Start Game. B4.4 → B3.2 (the
Step-5 undo path). B4.5 reads `meCol` from B4.7.

**Off-page connectors.** B4.5 → Page 7 (auto-X propagation from
Me's held cards). B4.5 → Page 5 (Start Game enters the turn
sequence). B4.4 → Page 12 (Undo). B4.1/B4.2 (the Me claim) and
B4.5 (Start Game) end with a button refresh (**B2.9**); B2.9
reads the Me state (**B4.7**).

---

## Page 5 — Turn Sequence

Each turn of Play moves through four stages:

- **Thinking** — the "beginning," nothing recorded yet.
- **Guessing** — the asker's three card guesses are entered.
- **Waiting** — play waits for a player to show one of those cards
  (or for everyone to pass).
- **Ready to advance** — the show (or no-show) has been recorded,
  and the Next button advances play to the next turn.

**The four stages above describe what the user sees. The 11 blocks
below describe the code, grouped by role (actions, utilities,
state) rather than by call order — see the companion draw.io
diagram for the call-flow view.**

- **B5.1** Click during the Guessing stage
- **B5.2** Guessing-stage commit (third click flips Guessing →
  Waiting)
- **B5.3** Pending-asks and committed-asks state
- **B5.4** Same-category replacement (one-step correction within a
  category)
- **B5.5** Passer auto-X (the "Passers-loop" ✗)
- **B5.6** Header click during the Waiting stage (records who
  showed)
- **B5.7** Next during Play (ends the turn)
- **B5.8** Click controls during Play
- **B5.9** Turn-level undo snapshot
- **B5.10** Phase-bar text during Play
- **B5.11** Turn order, turn step, turn count state

**B5.1 · Click during the GUESSING stage.** Starts when the user
makes the first ask-click (which moves the turn from Thinking to
Guessing). The user picks one card per active category in the
asking player's column. For each click:

- if it's on the wrong column, a status message redirects
- if the card is in a muted row (the card or its category is muted)
  or already picked this turn, the click is rejected
- if the click is on a card from a category that's already
  represented in this turn's pending guesses, the prior pick in
  that category is removed and replaced by the new one (one-step
  correction)
- otherwise the click adds a `?` mark to the cell, records which
  turn placed it, and pushes a record into the pending-asks list

**The `?` mark is unique.** Every ask of a card adds a new `?` to
the cell, with the turn it was placed on. All prior `?` marks stay
visible — even after a definitive ✓ or ✗ later lands. The cell
becomes the visual history of every turn this card was asked of
this player. (Compare: ✓/✗ are first-mark-wins, `!` is hidden once
a definitive mark lands.)

**B5.2 · Guessing-stage commit.** Triggered as soon as the
pending-asks list reaches the size of the active-category count.
The asks move from "pending" to "committed" and the
turn shifts from Guessing to Waiting. Then the app:

- clears the pending-ask highlight class from each cell (the `?`
  marks themselves stay — see B5.1)
- highlights any cell in another player's column that's a known ✓
  on one of the asked cards (those players are obligated to show;
  the highlight reminds the user to click their header)
- adds a live entry to the Log (see B14.7) showing the asker and
  the cards asked. "Waiting..." stands in for the shower's name
  until a show is recorded.
- pushes a partial undo snapshot so Undo can wipe just these three
  asks if the turn never advances

Net: the user's three guesses are locked in; play now waits for
someone to show.

**B5.3 · Pending-asks and committed-asks (state).** Two running
lists that track what the asker has guessed so far this turn:

- **Pending-asks** — guesses the user is still entering, at most
  one per active category. As soon as the count reaches the
  active-category count, they all move to the committed-asks
  list.
- **Committed-asks** — guesses the user has finished entering,
  meaning the turn is now in the waiting-for-show stage.

Each entry on either list records the card, the column, and the
cell's pre-click state (used for granular Undo). Both lists are
cleared at every turn-end commit or full Undo.

**B5.4 · Same-category replacement.** When a click would be the
second guess from the same category, the app doesn't reject.
Instead, it:

- finds the previous pending pick in that category
- restores that cell's pre-click state
- removes its record from pending-asks
- proceeds with the new click as a fresh first pick in that
  category

Net: clicking the wrong card and then the right one in the same
category is a single-step correction.

**B5.5 · Passer auto-X (the "Passers-loop" ✗).** The walk around
the turn-order ring that marks every passer with ✗ on every asked
card. Two cases trigger it:

- **Someone showed:** the walk goes from the asker forward to the
  shower. Every player in between (skipping Quit players) is a
  passer and gets ✗ on every asked card.
- **Nobody showed:** the walk goes all the way around the ring
  back to the asker. Every non-asker player (again skipping Quit
  players) is a passer and gets ✗ on every asked card.

Only Quit players are skipped. A player who is Out by wrong
accusation still holds cards, so when they pass they take ✗ like
anyone else.

Each ✗ mark records the turn it was placed on. Cells that already
have ✓, ✗, or ✓\* are skipped (first mark wins, no stacking).

Net: every player who couldn't have shown gets ✗ across all asked
cards.

**B5.6 · Header click during the WAITING stage.** Triggered when
the user clicks the SHOWER's column header during the Waiting
stage. A tap before then — while the turn's guess set is still
incomplete — is refused with a status reminder to finish picking;
nothing is committed. The handler runs these checks first:

- the clicked column must not be the asker
- the clicked column must not be Out (Quit)
- the clicked column must not have ✗ on every asked card (which
  would prove they couldn't show)
- the clicked column must not skip a player who's obligated to
  show by an earlier ✓

If all checks pass, one of these happens:

- **If the clicked column is Me** — the Me-as-shower popup opens.
- **If the asker is Me** — the Me-as-asker popup opens.
- **Otherwise** — marks land in two places:
  - **In the shower's column:** a `!` lands on each asked card
    except cells that already have ✓, ✗, or ✓\* (first mark wins,
    no stacking).
  - **On each passing player:** every passer gets ✗ on each asked
    card (the Passers-loop ✗ — see B5.5).

**Correcting the shower** (applies to the plain flow above; the
Me popups have their own paths — Page 6). Before Next is pressed:

- **Tapping the same header again** arms a confirm — "Tap [name]
  again to remove them as shower" — that holds for 5 seconds. A
  second tap within that window rolls back the shower's `!` marks
  and the passer ✗s, and the turn returns to Waiting. Tapping
  anything else cancels the arm.
- **Tapping a different header** (one that passes the same checks)
  rolls back the previous shower's marks the same way, then
  records the new column as the shower.

Net: this is the heart of the app — where each turn's revealed
clues land on the grid.

**B5.7 · Next during Play.** Called when the user presses the Next
button during Play. Does the following in order:

- validates that no player with a confirmed ✓ on an asked card has
  been bypassed
- applies any pending shower marks
- **if no shower was clicked** (everyone passed) — every player
  except the asker and Quit players gets ✗ on each asked card (the
  Passers-loop ✗ — see B5.5)
- builds the final log entry for the turn (including turns where
  the asker entered no guesses)
- pushes a full undo snapshot
- clears all pending state
- advances the turn step to the next player who isn't Out, and
  adds 1 to the turn count — the count goes up on every turn (see
  B5.11)
- refreshes the log, the info bar, and the stage locks and
  highlights (each cell was already repainted as its mark landed)

The `?` marks placed this turn stay on the grid as part of the
history (see B5.1).

Net: this turn's record is final, and the on-screen state shifts to
the next player's turn.

**B5.8 · Click controls during Play.** Two layers control which
clicks succeed at each stage. Locked cells ignore the click
silently; handler rejections show a status message that redirects
the user. Locks are re-applied at every stage transition.

- **Thinking/Guessing:** on the user's own turn nothing is
  locked; on another player's turn the only locked cells are the
  ones already ✗-ed in Me's column. A click outside the asking
  player's column is rejected with a redirect message (B5.1).
- **Waiting:** no cell click records anything — a show is
  recorded through the column headers and their popups only
  (B5.6). A few cells stay unlocked so a stray click draws the
  hint that points to the right header: on the user's own turn,
  the asked cards' cells in the other columns; on another
  player's turn, the asked cards in Me's column that Me holds.
  Every other cell is locked and silent.
- **Header guards (see B5.6):** the asker's own header, a Quit
  player's header, and a column with ✗ on every asked card are
  all rejected with a message, as is the must-show-first rule —
  a column past a player who holds an asked card (✓) can't be
  clicked as the shower until that player shows.

Columns with no player in them are hidden throughout Play and
take no clicks.

Net: this protects the user from clicks they'd just have to undo.

**B5.9 · Turn-level undo snapshot.** Pushes a snapshot onto the
turn-undo stack at certain transitions.

Snapshots are pushed when:

- the asker's guesses commit (B5.2) — pushes a **partial** snapshot
- the turn commits (B5.7) — replaces it with a **full** snapshot

Each snapshot records:

- the turn step and turn count
- a list of cell changes (each: card, column, and the cell's
  pre-change state)
- the solution-candidates set (see B7.8)

Net: every meaningful turn transition leaves a recoverable record
in case Undo needs to roll back.

**B5.10 · Phase Bar and Directives Bar text during Play.** Sets
two on-screen elements to reflect the live turn state, split by
role:

**The Phase Bar** carries **identity context** — when we are and
whose turn it is:

- **Prefix:** "🎮 Game · Turn N" — the cumulative turn number.
- **Directive:** "Your turn" (when Me is active) or "{name}'s
  turn" (when another player is active).

**The Directives Bar** (the Deck Bar repurposed during Play)
carries **action context** — what's happening and what to do.
Four messages, one per stage:

- "You are thinking" / "{name} is thinking — Tap all cards
  guessed, or tap Next if the player does not reach a room." —
  no asks picked yet (Thinking stage).
- "You are guessing" / "{name} is guessing — Tap all cards
  guessed." — asks partly picked (Guessing stage).
- "You are waiting" / "{name} is waiting — Tap the column header
  of the player who showed, or Next if nobody." — 3 asks
  committed, no shower yet (Waiting stage).
- "{shower} showed — Tap Next to continue." — a show has been
  recorded (Ready to advance stage).

The status-message slot writes to the Phase Bar's directive and
can temporarily overwrite the identity line with a hint or error
message. When the status timer clears, the identity line comes
back automatically. The Directives Bar keeps showing action
context throughout, so the user still knows what to do during a
status message.

Net: this serves as a quick reminder, when needed, of where the
state of play is currently.

**B5.11 · Turn order, turn step, turn count (state).** Three
pieces of memory that together track whose turn it is and where
we are in the round-robin:

- **Turn order** — the list of player column positions, in the
  order they take turns. Built at Start Game from the named
  columns.
- **Turn step** — the position within the turn-order list of the
  current asker. Advances after each turn; resets to 0 when the
  cycle wraps.
- **Turn count** — the cumulative turn number, starting at 1 and
  going up by 1 at the end of every turn. "Turn N" on the Phase
  Bar is this number — it counts player turns, not trips around
  the table.

All three are part of the saved snapshot.

Small data, big reach. The turn count is recorded on every mark on
the grid (Undo, the Log, and the auto-mark "first mark wins" rule
all read it). The turn order is the round-robin ring used for
Passers-loop
✗ walks and asker validation. The turn step says whose turn it is
right now. Most parts of the app depend on one of these three.

Net: this is how the app can back up for correction without
getting lost.

**Within-page connectors.** B5.1 → B5.2 (third click flips into
commit). B5.2 → B5.6 (after commit, the next action is a
shower-header click). B5.6 → B5.7 (Next can be pressed after any
show or non-show). Both B5.6 and B5.7 call B5.5 (Passer auto-X).
B5.8 runs after every state transition.

**Off-page connectors.** B5.6 → Page 6 (Me-as-shower /
Me-as-asker popups). B5.7 → Page 7 (auto-X). B5.7 → Page 14 (log
entry push). B5.7 → Page 12 (undo snapshot push). B5.6 → Page 11
(Out checks). B5.9's snapshot pushes (from B5.2 and B5.7) each
end with a button refresh (**B2.9**).

---

## Page 6 — Reveal Popups

Two popups handle the special cases where Me is involved in
showing or being shown a card. Both run during the Waiting stage
of a turn and finish by recording the show + propagating its
consequences.

The 4 blocks below:

- **B6.1** Me-as-asker popup
- **B6.2** Me-as-shower popup
- **B6.3** Filtering rules (inside both popups)
- **B6.4** Passers-loop ✗

**B6.1 · Me-as-asker popup.** Opens when Me is the asker and the
user clicks the shower's column header. Lists all asked cards as
buttons. Any card the shower's column already has ✗ on is
removed — the shower couldn't have shown it. The single check
covers:

- cards Me holds (at Start Game, auto-X propagated ✗ to every
  other player)
- cards another player already confirmed to hold (auto-X
  propagated ✗ to the shower)
- cards seen on the house board (auto-X propagated ✗ to every
  player)
- cards the shower had ✗ on from earlier turns

The user picks which card the shower revealed. On confirm:

- a ✓\* lands on the picked card in the shower's column
- auto-X propagates ✗ across that row — every other active
  player gets ✗ on the picked card
- the shower is registered as committed
- the live log entry updates from "waiting..." to "{shower}
  showed Me {card}"

The Passers-loop ✗ runs after this — see **B6.4**.

Net: the picked card is locked in on the shower's column.

**B6.2 · Me-as-shower popup.** Opens when Me's column header is
clicked during another player's turn (meaning Me is the shower).
Lists all asked cards. Cards Me doesn't hold are disabled
(you can't show a card you don't have) — only held cards are
clickable. The user picks which held card Me showed. On confirm:

- an "Me-showed-this" record is added to the asker's column on
  that card
- the live log entry updates to "Me showed {card}"

The Passers-loop ✗ runs after this — see **B6.4**.

Net: the asker has a record of the card Me showed.

**B6.3 · Filtering rules (inside both popups).** Both popups
remove or disable choices the shower can't possibly have:

- **Me-as-asker popup** removes any asked card where the shower's
  column has ✗ — that single check catches every impossibility
  (Me's own cards, other confirmed holds, house-checked cards,
  and direct ✗ from earlier turns).
- **Me-as-shower popup** disables cards Me doesn't hold — only
  the held subset is clickable.

**B6.4 · Passers-loop ✗.** When a popup commits, the app:

- walks the turn order from the asker forward, stopping at the
  shower
- for every player in between (skipping Quit players), drops ✗ on
  every asked card

Those players had the chance to show and didn't, so they don't
hold any of the asked cards. This follows the same logic as
B5.5's no-show case, but bounded between asker and shower.

Net: every passer between asker and shower is ruled out for every
asked card in one pass.

**Within-page connectors.** B6.1 and B6.2 both call B6.4 on
commit. B6.3 runs inside both.

**Off-page connectors.** B6.1, B6.2 → Page 7 (auto-X
propagation after ✓ lands). B6.1, B6.2 → Page 14 (live log
entry update). Both called by Page 5's B5.6 (header click during
waiting).

---

## Page 7 — Auto-Mark Engine

The Auto-Mark Engine is the set of rules that decides where ✗
marks land automatically as the game unfolds. The rules are:

- the first mark on a cell wins; no stacking
- a ✓ on a cell means ✗ everywhere else in that row
- a "shown to me" mark counts as a ✓
- Me's column is finalized at Start Game and never gets new auto-
  marks during Play
- only Quit players are skipped (see **B5.5**)
- a card on the board (house-checked) gets ✗ across the whole
  row, and is excluded from the secret-answer list

(The `?` mark is user-placed during Guessing, not by the
auto-mark rules — see **B5.1** for its lifecycle.)

The 9 blocks below implement those rules:

- **B7.1** Cell eligibility check (`canAutoX`)
- **B7.2** Single-cell auto-X (`applyAutoX`)
- **B7.3** Row sweep on a Mark-Out ✓ (`autoXRestOfRow`)
- **B7.4** Row sweep on ✓ during Play (`applyAutoXOnCheck`)
- **B7.5** Shared row sweep with undo list (`propagateRowCross`)
- **B7.6** The mark pusher (`markCell`)
- **B7.7** Rebuild a cell's flags from its marks list
- **B7.8** Secret-answer-candidate check
- **B7.9** The parts of a single mark

**B7.1 · Cell eligibility check (`canAutoX`).** Single-cell check
that returns yes if a cell can receive an auto-X. Returns no if:

- the cell already has ✓ (player holds the card)
- the cell already has ✗ (already ruled out)
- the cell already has ✓\* (shown to me — which counts as ✓)

The "first mark wins, no stacking" rule lives here. (Me's column
is implicitly skipped during Play — every Me cell already has ✓
or ✗ from Start Game, so the three checks above always return
false for Me.)

**B7.2 · Single-cell auto-X (`applyAutoX`).** Stamps a ✗ on one
cell. Calls the eligibility check (B7.1) first.

- **If not eligible** — returns silently.
- **If eligible** — captures the cell's pre-change state into an
  undo list (so the change can be rolled back later), places a ✗
  on the cell, records which turn placed it, and re-renders the
  cell.

**B7.3 · Row sweep on a Mark-Out ✓ (`autoXRestOfRow`).** The
row sweep used by the Mark-Out flow: when a leaving player's
revealed card gets ✓, this sweeps the rest of that row. It:

- goes through each player column other than the one that just
  got ✓, skipping Quit players
- for each, runs the eligibility check (B7.1) and stamps a ✗
  where eligible
- after the sweep, updates the secret-answer-candidate flag for
  that card

The Mark-Out flow flags every mark it places as permanent, so
Undo never removes them — cards seen can't be unseen (see
**B7.9**). An optional undo list can capture each ✗ for
rollback; the Mark-Out flow doesn't use one.

**B7.4 · Row sweep on ✓ during Play (`applyAutoXOnCheck`).**
Triggered by the popup commits (B6.1, B6.2) and by Next during
Play when applying pending shown-me marks (B5.7). A Play-phase
variant of B7.3 with three minor differences: it skips Me's
column explicitly (redundant safety — every Me cell is already
filled at Start Game, so the already-marked checks would block
it anyway), it runs its own copy of the B7.1 checks (✓, ✗, ✓\*)
instead of calling B7.1, and it doesn't keep an undo list (the
✗s it places during Play are permanent).

**B7.5 · Shared row sweep with undo list
(`propagateRowCross`).** A row sweep used by both the manual-
mark cycle commit and the house-cell commit. Goes through each
active player column other than the source, with these skips:

- Me's column
- players who quit
- cells that already have ✓, ✗, or ✓\*

Stamps a ✗ on every remaining cell, and hands back the list of
changes (each entry is a snapshot of the cell's pre-change state).
The manual or house cycle that asked for the sweep keeps the list,
so it can undo every ✗ if the user reverts.

**B7.6 · The mark pusher (`markCell`).** The single function that
adds a new mark to a cell. Runs these checks first:

- won't add a second ✓, ✗, or `!` if the cell already has that
  mark — first one wins. (`?`, ✓\*, and ←Me can still repeat
  across turns.)
- a repeating mark (`?`, ✓\*, ←Me) lands only once per turn on
  the same cell — asking the same card twice in one turn still
  adds just one `?`
- won't add a `!` if the cell already has ✓ or ✗ (the
  definitive answer makes the `!` noise)
- special guard against manual overrides: if a cell is in an
  active manual cycle, won't drop a contradicting ✓ or ✗ from
  any other source

If valid:

- the mark is added to the cell's history
- the cell's matching flag (✓, ✗, `?`, and so on — see **B7.9**
  for all types) is turned on

The pusher is called for `?` marks too — every ask drops a new `?`
on the cell. Together they build the cell's ask history (see B5.1).

Turn numbers let Undo find and remove marks from specific turns.
Turn 0 is special — it labels Setup-phase marks (Me's holds and
the Start Game sweep), which Undo never touches.

Net: every mark — auto or manual — enters a cell through this
one door, so the single-vs-stacking rules can't be bypassed.

**B7.7 · Rebuild a cell's flags from its marks list
(`recomputeCellBooleans`).** A cell keeps two records of its
marks: the full history list, and a set of yes/no flags for
quick lookups ("does this cell have a ✗?"). This block makes
the flags agree with the history again.

- goes through each mark type (✓, ✗, `?`, `!`, ✓\*, ←Me)
- turns that type's flag on if the history holds at least one
  such mark, off otherwise

Two things in the app remove marks from a cell's history:
Undo, and (during Setup) clicking a ✓ cell in your Me column
to clear it. Both can leave the flags out of date, so both
run this rebuild right after.

**B7.8 · Secret-answer-candidate check.** A card is a candidate
for the secret answer when:

- every player column in the turn order has a ✗ on it (nobody
  confirmed to hold it) — Out columns included
- no player has ✓ or ✓\*
- the card is NOT currently checked in the house column (house-
  checked cards are visibly on the board and can't be the
  secret)

A short routine recomputes the set of candidate cards and updates
the solution-candidates set whenever a relevant change happens.
The set is internal — no visual flag lands in the Card column.
The data is kept for the auto-mark rules.

The candidate set is also used by the optional deduction rules
(see **Appendix B**).

**B7.9 · The parts of a single mark.** Every mark in a cell's
history list is a small record with these parts:

- `type`: which mark it is — `check` (✓), `cross` (✗), `asked`
  (`?`), `showed` (`!`), `shownToMe` (✓\*), or `iShowedMe` (←Me)
- `turn`: records which turn placed the mark so Undo can find
  it later — internal only, never shown on screen (0 means
  Setup or Start Game)
- `manual` (optional): true on marks the user placed by hand
- `quit` (optional): true on every mark the Mark-Out flow
  places — Undo skips these, so they survive any rollback

**Within-page connectors.** B7.1 is the eligibility check that
B7.2 and B7.3 call first; B7.4 and B7.5 run their own copies of
the same checks.
B7.6 is called by B7.2, B7.3, B7.4, B7.5 to actually drop the
mark. B7.7 rebuilds the flags after marks are removed — Undo and
the Setup Me-column clear both use it.

**Off-page connectors.** Called from Pages 4 (Start Game), 5
(turn flow), 6 (popups), 8 (manual marks), 9 (house marks). B7.8
is read by Page 9.

---

## Page 8 — Manual Mark Cycle

Sometimes the user knows something the auto-mark rules don't, or
wants to correct a mark. During Play, right-clicking most
player×card cells lets the user set the cell by hand. Each
right-click moves the cell one step around a four-state cycle —
the auto-mark state → blank → ✗ → ✓ → and back to the auto-mark
state. Nothing is permanent while the user clicks: the cycle
commits when the mouse leaves the cell. (Which cells accept
manual marks, and the other jobs right-click does elsewhere in
the app, are in **B8.1**.)

The 6 blocks below describe the code — the user action first
(the right-click and the commit), then the machinery behind it
(the helpers, the per-cell memory, the log entry, and the
engine guard).

- **B8.1** Right-click handler
- **B8.2** Mouseleave commit
- **B8.3** Cell-snapshot routines
- **B8.4** Per-cell cycle memory
- **B8.5** Manual-mark log entries
- **B8.6** Engine guard against contradicting marks

**B8.1 · Right-click handler (`cycleManualMark`).** Right-click
is the app's "do something special here" gesture. What it does
depends on where the user clicks and on the mode.

In Setup:

- a category banner — move the banner up or down (Step 1), or
  mute/activate the category (Step 2)
- a card name — mute that card, or mass-mute (Step 3)
- a player header — "I am [name]," picking the Me column (Step 5)
- a deck slot — Export or Delete that deck

In Play:

- a player header — "Mark player Out…"
- a player×card cell — the manual mark cycle, this page's subject

The rest of this block covers only the last job — the manual mark
cycle on a player×card cell, which exists only in Play.
Right-clicks on a cell are ignored if the cell is in Me's column,
the column has no player, or the row is muted (the card itself or
its whole category). Otherwise each
right-click moves the cell one step: blank → ✗ → ✓ → back to the
auto-mark state.

On the first right-click of a new cycle (the cell wasn't already
mid-cycle), the handler cleans up before stepping:

- undoes the row of ✗s the previous commit added, if any
- saves a copy of the cell's current auto-mark state (the
  snapshot) — or, if a snapshot already exists from an earlier
  cycle, puts the cell back to that saved state

Only this one cell changes on screen. The row sweep and the log
entry wait until the mouse leaves the cell and **B8.2** commits.

**B8.2 · Mouseleave commit (`commitManualCycle`).** When the
user's mouse leaves the cell, the cycle commits. The cell's
final ✓/✗ state is compared to the pre-cycle snapshot and is
either changed or unchanged:

- **Unchanged** — the user cycled back to where the cell
  started. Nothing to keep: the log entry is removed and all
  cycle memory is cleared (marker, snapshot, undo list).
- **Changed to ✓** — runs the shared row sweep (**B7.5**),
  putting ✗ on the rest of the row, and stores the sweep's undo
  list on the cell. Pushes a manual-✓ log entry.
- **Changed to ✗ or blank** — no row sweep: a ✗ or a cleared
  cell says something about this player only, nothing about the
  rest of the row. Pushes the matching log entry.

As a safety net, a changed commit first clears any leftover undo
list from a prior commit (in practice B8.1's first click has
already done this).

After a changed commit, the cycle marker is cleared but the
snapshot — and the undo list, if a sweep ran — stay on the cell,
so a future cycle can put everything back.

Net: nothing is permanent until the mouse leaves the cell, and
cycling back to the start costs nothing.

**B8.3 · Cell-snapshot routines (`snapshotCell`,
`applyCellSnapshot`, `undoEntry`).** Three short routines behind
the manual cycle (**B8.1**, **B8.2**):

- **Copy** — takes a cell's current state (flags + marks array)
  and returns it as a record.
- **Restore** — writes a record back into a cell, replacing
  whatever was there.
- **Restore one cell from an undo list** — takes one entry from a
  propagation undo list (each entry is a record of one cell's
  state) and restores it, then re-renders the cell.

Page 9's house cycle uses only the third routine itself, to roll
back the ✗s it spread across a row. Its own baseline is a simple
checked/unchecked flag, so it never copies or restores its own
cell. The copy routine still works for it behind the scenes: the
shared row sweep (**B7.5**) uses it to build the undo list.

**B8.4 · Per-cell cycle memory (`manualStage`, `manualSnapshot`,
`manualUndoList`).** Three fields stored on the cell's state
record alongside the regular flags and marks:

- the cycle position — where the cell is in the cycle: blank, ✗,
  or ✓ (stored as `'blank'`, `'cross'`, `'check'`). Stored as
  `null` when the user has cycled all the way around, back to the
  auto-mark state, with the mouse still on the cell — the cycle
  is still open, and if the mouse leaves here, the commit runs
  **B8.2**'s full revert. When no cycle is in progress at all,
  the field is simply empty (`undefined`).
- the snapshot of the cell's pre-cycle auto-mark state (captured
  on first cycle entry, persists until the user fully reverts)
- the propagation undo list (the cells the last commit ✗'d,
  used to revert on the next cycle's first click)

All three fields are saved with the rest of the game. So nothing
is lost when the app is closed and reopened: a snapshot or undo
list left on a cell is still there. Even a half-finished cycle
comes back — the next right-click picks up where the cycle left
off.

**B8.5 · Manual-mark log entries (`logManualMark`).** Pushes a
one-line log entry when a manual cycle commits. The Log is a
true log: a new commit replaces only this cell's manual entry
from the current turn (re-commits within a turn collapse to one
entry) — manual entries from earlier turns are history and stay
put. Only a full Undo removes them. On a revert, no new entry is
pushed; if the current turn had one, it's removed.

Each entry is a record with these parts:

- `turn`: the turn number when the commit happened
- `playerIdx` / `player`: the marked column and its player name
- `isMe`: whether the column is Me's — always false today, since
  Me's column refuses manual marks (**B8.1**), but the log
  format carries the flag for every entry type
- `manual`: true — marks the entry as manual
- `manualAction`: `'check'`, `'cross'`, or `'blank'`
- `manualCard`: the card name

**B8.6 · Engine guard against contradicting marks (inside
`markCell`).** Inside the
mark pusher (B7.6), an extra check: if the target cell has an
active manual cycle in progress and a manual mark on it, the
auto-mark rules refuse to drop a contradicting ✓ or ✗ from any
other source. Manual is the source of truth while a cycle is open.
At the blank stage no manual mark exists yet, so the guard
doesn't block — the engine may still fill the cell mid-cycle.
Once committed and the cycle is gone, the manual mark stops
being special: it's simply the cell's ✓ or ✗, and the engine
treats it like one of its own — duplicates blocked by
first-one-wins, contradictions blocked because sweeps skip
already-marked cells.

Net: while a cycle is open, the user's manual mark outranks the
engine.

**Within-page connectors.** B8.1 ↔ B8.2 (right-click cycle vs.
mouseleave commit). B8.1 and B8.2 both use the B8.3 routines.
B8.4 is the per-cell state both functions manipulate. B8.2 →
B8.5 on commit.

**Off-page connectors.** B8.2 → Page 7's B7.5 (propagation on
✓ commit). B8.5 → Page 14 (log). B8.6 sits inside Page 7's
B7.6. Page 9's house cycle uses B8.3's undo-list restore to roll
back its spread ✗s.

---

## Page 9 — House Column

The 🏠 column is for the 2-player variant where undealt cards
sit face-down in rooms on the board. A click on a 🏠 cell marks
the card as "seen on the board"; when the mouse leaves the cell,
✗ propagates across the row (no player holds a board card) and
the card is excluded from the secret answer. Clicking again
reverts (clears) the cell.

The 6 blocks below describe the code that governs the House
Column:

- **B9.1** 🏠 click handler
- **B9.2** 🏠 mouseleave commit
- **B9.3** House state
- **B9.4** 🏠 cell render
- **B9.5** House-mark log entries
- **B9.6** House-card exclusion from secret-answer candidates

**B9.1 · 🏠 click handler.** The handler runs when the user
clicks a 🏠 cell during Play (clicks on muted cards do nothing).
On the first click of a new cycle, the handler does two things:

- it clears away the previous commit's work — if that commit
  propagated ✗ across the row, every cell in its undo list is
  reverted
- it stores a cycle baseline for this card, which marks the
  cycle as open

With that done, the handler toggles the card's house-checked
state — adding the card to the house-checked set if absent,
removing it if present — and redraws just this 🏠 cell. Row
propagation waits for the mouseleave commit (**B9.2**).

**B9.2 · 🏠 mouseleave commit.** The commit runs when the
pointer leaves a 🏠 cell. If no cycle is open for this card —
no click stored a baseline — the pointer just passed over the
cell, and nothing happens. Otherwise the commit clears the
cycle baseline — closing the cycle — and reconciles the row
with the card's final house-checked state:

- if the card ended up checked, the commit makes sure row
  propagation is in place — it runs the shared row sweep if no
  undo list exists, and stores the returned undo list
- if the card ended up unchecked, the commit makes sure no
  propagation remains — it undoes the stored list if there is
  one, then deletes it

Finally, the commit updates the Log (**B9.5**): a checked card
gets a house entry; an unchecked card gets none — any entry from
the current turn is removed.

**B9.3 · House state.** The house column keeps three pieces of
memory:

- the house-checked set — the card names currently marked as on
  the board
- the per-card undo lists — for each house-checked card, the
  cells its propagation ✗'d, kept so the propagation can be
  reverted
- the per-card cycle baselines — one entry per card with an
  open click cycle (set on the first click, cleared at commit);
  its presence is what tells B9.1 "new cycle" and B9.2 "cycle
  to commit"

Only the house-checked set is saved in snapshots. The undo
lists and cycle baselines are session-only and don't survive a
reload.

**B9.4 · 🏠 cell render.** The render reads one thing: the
house-checked set. If the card is in the set, its 🏠 cell shows
a ✓ glyph; if not, the cell is blank. No other state is
involved.

**B9.5 · House-mark log entries.** Each house commit writes a
one-line log entry, with an action of `check` or `blank`. The
Log is a true log: a new commit replaces only this card's house
entry from the current turn, while entries from earlier turns
are history and stay put. A `blank` pushes no new entry — it
just removes the current turn's entry if there was one.

**B9.6 · House-card exclusion from secret-answer candidates.**
The secret-answer check (**B7.8**) opens with an early return:
if the card is in the house-checked set, it is not a candidate.
The user has seen it on the board, so it can't be the secret.

**Within-page connectors.** B9.1 ↔ B9.2 (click vs. mouseleave).
Both read and write B9.3. B9.4 reads B9.3. B9.2 → B9.5.

**Off-page connectors.** B9.2 → Page 7's B7.5 (propagation on a
checked commit). B9.1 and B9.2 both use B8.3's undo-list restore
to roll back spread ✗s. B9.6 → Page 7's B7.8. B9.5 → Page 14.
Page 12's B12.5 → B9.3/B9.5 (Undo scrubs the undone turn's
house marks and log entries).

---

## Page 10 — Σ Summary Column

The narrow Summary Σ column to the right of the card-name column
is the envelope's own column — the user's summation of what's in
the secret answer. Just as a player's column shows what that
player holds and the 🏠 column shows what the board holds, the Σ
column shows what the user believes the envelope holds. The app
never writes to it or reads from it. Cycle: blank → red ✕ →
green ✓ → blank.

The 4 blocks below describe how the Σ column does all of this.

- **B10.1** Σ click handler
- **B10.2** Summary marks (state)
- **B10.3** Σ cell render
- **B10.4** Setup-mode click rejection

**B10.1 · Σ click handler.** Triggered by a click on a Σ cell
during Play. Cycles the card's summary mark: blank → x (red ✕)
→ check (green ✓) → blank. Clicks during Setup are ignored.
The Σ column is used during Play only.

**B10.2 · Summary marks (state).** A small record that keeps,
for each card, what the user has clicked into its Σ
cell. Possible values:

- empty (no mark)
- "x" (red ✕)
- "check" (green ✓)

Empty entries are dropped from the record rather than stored
as blanks. Part of the saved snapshot.

**B10.3 · Σ cell render.** Reads the summary mark for a card
and renders the matching glyph: a vivid red ✕ for "x", a
green ✓ for "check", or blank for "". Hovering the ✕ shows
"Held by a known player"; hovering the ✓ shows "The envelope
holds this card". Called from the full-cells render and after
every Σ click.

**B10.4 · Setup-mode click rejection.** The click handler
checks the game phase first. If the phase is Setup, the click
returns without effect.

**Within-page connectors.** B10.1 → B10.2 (writes) → B10.3
(renders).

**Off-page connectors.** Page 2's buildTable (**B2.2**) builds each
Σ cell and attaches its click handler; the full-cells render then
draws the glyphs. Saved/restored via Page 2's snapshot (**B2.7** /
**B2.4**); each Σ click ends with an auto-save (**B2.6**). New Game
and a deck load (**B2.5**) clear all Σ marks.

---

## Page 11 — Player Out

When a player makes a wrong accusation or outright quits, they are
marked Out. The two affect the auto-mark rules differently.

The 7 blocks below cover how a player is marked Out, how the app
remembers and shows it, and how the engine reacts:

- **B11.1** Right-click on a player header during Play
- **B11.2** Out-kind picker popup
- **B11.3** Card-picker popup (Quit only)
- **B11.4** Out state
- **B11.5** Out badges on column headers
- **B11.6** Inactive-column styling
- **B11.7** Engine effects of Out

**B11.1 · Right-click on a player header during Play.** Right-
clicking a player column header during Play opens the Player Out
flow, unless that player is already Out. The single menu option
leads to both kinds of Out, and the header ends up marked with
👋 (Quit) or 😢 (Wrong Accusation).

**B11.2 · Out-kind picker popup.** Opens the kind-picker popup.
Two buttons:

- **👋 Quit** — the player left the game completely; any held
  cards they show on the way out get ✓ in their column; the
  rest of their column gets ✗; their column is skipped
  everywhere.
- **😢 Wrong Accusation** — they made a wrong accusation; turn
  skipped, but they stay in the game showing cards but can no
  longer guess.

Clicking either button hides this popup and opens the next step
with that choice. Cancel closes the popup.

**B11.3 · Card-picker popup (Quit only).** The card picker is a
secondary popup whose title carries the action — "Mark {name}
Out — Quit 👋".

- **Quit** — a card-picker grid appears. Every active card across
  every active category is shown as a toggle button. Cards already
  confirmed in some other player's column are disabled with a
  "held by X" label. The user can click any cards the leaving
  player revealed on the way out.
- No card picker is shown for **Wrong Accusation**. That player
  stays in the game and will continue to show cards on future
  turns, so there's nothing to reveal at this moment.

Both flows have a Cancel and a red two-tap Mark Out button.

**B11.4 · Out state.** A small record that keeps, for
each player column that's currently Out, which kind of Out they
are:

- `quit` — the player left the game
- `wrongacc` — the player made a wrong accusation

Active players have no entry. Four short accessors wrap this for
read access, so other blocks don't poke at the record
directly. Saved in snapshots.

**B11.5 · Out badges on column headers.** Checks every player
column header against the Out state:

- **Quit** — adds the Out class (greys the header + 👋 badge;
  hover: "Player has quit").
- **Wrong Accusation** — the Out class plus a WrongAcc modifier
  (slightly lighter grey + 😢 badge; hover: "Wrong accusation —
  turn skipped, still shows cards").
- **Active player** — removes both classes; the badge is hidden.
  (Only matters when loading a saved game or after New Game —
  there's no path from Out back to active during Play.)

Runs after every change to the Out state.

**B11.6 · Inactive-column styling.** Dims a player column
(header and cells) when its name box is empty. Visible during
Setup Steps 1–4 only — from Step 5 on, empty columns are hidden
entirely. Runs whenever a player name changes, and at every big
state change — Start Game, New Game, loading a stored game, a
deck load, marking a player Out, and picking Me.

**B11.7 · Engine effects of Out.** Out players ripple through
many parts of the auto-mark rules:

- Quit players are skipped in auto-X propagation (B7.3, B7.4, B7.5)
- Quit players are skipped in the Passers-loop ✗ (B5.5, B6.4)
- Quit players are skipped when the "who must show first" checks
  walk the ring (B5.6, B5.7)
- Quit columns are protected three ways: the turn advance skips
  them (never the asker), the header-click guard refuses them as
  shower with a status message, and after Mark Out every active
  cell in their column already holds ✓ or ✗, which the
  first-one-wins rules won't overwrite.
- **Wrong-Accusation** players still appear in the turn order
  and still show cards (an exception — they're "still in" for
  show purposes), but their turn slot is skipped when the Next
  button advances
- **Quit** players are skipped in everything

**Within-page connectors.** B11.1 → B11.2 → B11.3. B11.3's
commit writes B11.4. B11.5 reads B11.4; B11.6 runs alongside it
but reads only the name boxes. B11.7 is a
description of how every other page's auto-mark logic respects B11.4.

**Off-page connectors.** B11.4 is read by Page 5 (the turn
advance, the shower guard, the Start Game sweep), Page 6 (the
Me picker popups), and Page 7 (auto-X propagation). It is saved
and restored by Page 2's snapshot and cleared by New Game.
B11.3's commit places its ✓/✗ through Page 7's mark pusher and
writes a permanent Out entry to the game log (Page 14); Page
12's Undo removes neither the marks nor the entry. If the out
player held the turn, the commit advances it (Page 5). B11.5
and B11.6 are called from many state-transition sites.

---

## Page 12 — Undo & State Recovery

Undo is one button that serves two roles. In Setup, it steps the
wizard back. In Play, it can roll back the current turn (if
anything's happened on it yet) or the previous turn.

The 7 blocks below describe how Undo does all of this:

- **B12.1** Undo button handler
- **B12.2** Setup-undo
- **B12.3** Setup-undo from Step 5 (confirmed)
- **B12.4** Play-undo entry
- **B12.5** Play-undo action
- **B12.6** Turn-mark check and turn-mark eraser
- **B12.7** Turn-level undo stack

**B12.1 · Undo button handler.** Branches by game phase:

- **In Setup:** refuses to go below Step 1. If the user is
  leaving Step 5 with Me already picked, opens a two-tap
  confirmation popup first; otherwise calls the standard setup-
  undo (**B12.2**) directly.
- **In Play:** hands off to the play-undo entry (**B12.4**).

**B12.2 · Setup-undo.** Does the following in order:

- captures the step being left into the per-step save slot (**B3.8**)
- decrements the step counter
- if a save slot exists for the new step, restores it; otherwise
  clears the Undo Typing memory (**B3.9**)
- refreshes the phase-bar text, button states (**B2.9**), Me
  styling, and column-hide rules
- pushes a status message and triggers an auto-save

**B12.3 · Setup-undo from Step 5 (confirmed).** Runs after the
two-tap confirmation on Setup Undo from Step 5. Does the
following in order:

- restores Me's column header to its original player name
- wipes every cell mark in Me's column (the ✓s for held cards)
- resets the Me column index and the original-name memory
- drops the Step-5 save slot
- rebuilds the table and re-renders cells
- removes the Me styling
- calls the standard setup-undo (B12.2) to step the wizard back
  to Step 4

**B12.4 · Play-undo entry.** If there's nothing to undo at all
(nothing's happened yet this turn and it's still turn 1), refuses
with a status message and never opens the popup. Otherwise decides
between two play-undo modes:

- **"In-progress" mode** — when the current turn has any
  pending asks, committed asks, pending shows of any kind
  (a player showing the asker, a card shown to Me, or Me
  showing a card), or marks placed on the current turn
  (i.e., the user is mid-turn). Wipes only the current
  turn's work.
- **"Previous turn" mode** — when nothing's happened yet this
  turn. Wipes the last completed turn instead and rolls the
  turn counter back.

Picks the right popup text and button label, then calls the
play-undo action with the appropriate flag on two-tap confirm.

**B12.5 · Play-undo action.** Removing cell marks for a turn is
not enough — house ✓s live in their own set, and manual cycle
bookkeeping lives on the cell. So before removing cell marks,
it scrubs companion state for the turn being undone:

- any house marks placed on that turn are pulled from the
  house-checked set, their undo lists cleared, their baselines
  deleted
- any manual marks placed on that turn have their per-cell
  cycle memory cleared (stage, snapshot, undo list)
- the matching house and manual log entries are dropped from
  the game log

Then:

- the mark eraser (**B12.6**) removes every cell mark placed
  on that turn
- in "previous turn" mode only: the turn counter is
  decremented, the last normal turn entry popped from the log
  (permanent Quit / Wrong Accusation entries survive), and the
  turn pointer stepped back one player (skipping players who
  are Out)
- all pending state is cleared
- all cells, the log, and the info bar are re-rendered; locks
  and styling reapplied; a status message pushed and an
  auto-save triggered

Net: every trace of the undone turn is wiped — cell marks, house
marks, manual marks, and log entries — except permanent Quit /
Wrong Accusation traces, whose log entries and quit-flagged marks
both survive.

**B12.6 · Turn-mark check and turn-mark eraser.** Two separate
functions, side by side in the code — near-identical twins:
the same loop over the same cells. Neither calls the other.

- **The check** (called by the play-undo entry, **B12.4**, and by
  the button-state refresher, **B2.9**) changes nothing — it just
  answers: does any cell have a mark placed on the given turn?
  Permanent Mark Out marks don't count. B12.4 uses the answer to
  tell a mid-turn from an untouched turn.
- **The eraser** (called by the play-undo action, **B12.5**)
  goes through every cell, filters its marks list to drop
  entries placed on the given turn, then rebuilds the boolean
  flags from what's left. Marks placed by Mark Out are flagged
  permanent and survive the filter.

**B12.7 · Turn-level undo stack.** A stack of snapshots collected
during each turn — currently captured but not actively used.
What each snapshot records, and when it's pushed, is covered by
**B5.9**.

**Why they are not used here:** play-undo (B12.5) walks the cells
and removes marks placed on the turn being undone, rather than
restoring a snapshot wholesale. The snapshots are kept available
in case a future Undo path needs them.

**Within-page connectors.** B12.1 → B12.2 or B12.3 (setup
paths); B12.3 ends by calling B12.2. B12.1 → B12.4 → B12.5
(play paths). B12.4 calls B12.6's check. B12.5 calls B12.6's
eraser.

**Off-page connectors.** B12.2 saves and restores Page 3's per-step
snapshots (**B3.8**) and Undo Typing memory (**B3.9**). B12.3 →
Page 4 (the same flow seen from the Me side: **B4.4**; styling
refresh **B4.6**). B12.5 → Page 9 (house), Page 8 (manual), Page 14
(log). B12.6's eraser rebuilds each cell's flags via Page 7's
**B7.7**. B12.7 is fed from Page 5 by **B5.9**. Setup-undo and
play-undo both end with an auto-save (**B2.6**) and a button
refresh (**B2.9**). B12.6's check is also run by **B2.9**.

---

## Page 13 — Game Decks

A Game Deck is the set of category and card names for a
particular game variant — classic Clue, Master Detective, a
house-rules mix, along with the player names and card counts on
screen when it was saved (loading those back is optional). Up
to four can be saved at a time. Decks can also be exported to a
file and imported back.

The 10 blocks below cover the user actions first (B13.1–B13.6),
then how a deck is stored (B13.7–B13.9), and last the slot row on
screen (B13.10):

- **B13.1** Save Current
- **B13.2** Load Deck
- **B13.3** Deck-swap worker
- **B13.4** Delete Deck
- **B13.5** Export Deck to File
- **B13.6** Import Deck from File
- **B13.7** Deck file shape
- **B13.8** Saved-decks storage routines
- **B13.9** Last-used deck marker
- **B13.10** Deck-slot rendering and slot right-click menu

**B13.1 · Save Current.** Opens the Save Slot popup. Two stages:

- **Pre-check** — if all four slots are full, shows a "No open
  slots" status message AND a 3-second popup, then returns
  without opening the Save Slot popup.
- **Slot-name prompt** — if there's room, prompts for a slot name
  (max 6 chars). Validation rejects empty names, names already
  used in another slot, and (defensively) the full-slots case.

On confirm:

- builds a deck record (categories + cards + player names +
  card counts + the muted layout — see B13.7)
- pushes it onto the saved-deck list
- writes the list to long-term storage
- remembers this slot as the last-used
- redraws the slot buttons

Net: the current categories, cards, and player names are preserved
under the chosen slot name.

**B13.2 · Load Deck.** Opens the Load Deck popup for the given
slot. The popup shows:

- the deck's name and a warning that category and card names
  will change and all marks on the board will be cleared
- if the deck was saved with player names, a checkbox — "Also
  load the saved player names" — checked by default
- a Cancel and a two-tap Load button

On confirm, calls the deck-swap worker with the deck and the
checkbox's answer (treated as off when the deck has no saved
names).

**B13.3 · Deck-swap worker.** (Detailed in B2.5; same function.)
Runs only during Setup — when the user loads a deck slot, or at
boot when no game is active but a last-used deck is remembered.
Swaps in the new deck's category and card names and clears the
grid:

- all marks are cleared, including Me's ✓s — a new deck means
  new cards, so what Me held under the old names can't carry
  over
- player names and card counts are restored only if the caller
  asks; otherwise they stay as typed
- Me is always cleared — each laptop picks its own Me

Then: remembers the deck slot as last-used, redraws the table
and cells, refreshes the Rules textarea for the new slot, and
auto-saves.

Net: loading a deck gives a clean grid under the new names —
only the player line-up survives.

**B13.4 · Delete Deck.** Opens a confirmation popup with the
deck's name ("This cannot be undone"). On two-tap confirm:

- removes the deck from the saved-deck list; later decks shift
  down one slot to close the gap
- writes the list back to long-term storage
- fixes the last-used marker: if it pointed at the deleted
  slot, it's cleared; if it pointed past it, it moves down one
  so it stays on the same deck
- redraws the slot buttons

**B13.5 · Export Deck to File.** Builds a text file (JSON
format) from the deck record and triggers a browser download.
The file carries:

- a format marker and version number (the marker is what B13.6
  checks on import)
- the export date and time
- the deck record itself — name, categories with their cards,
  players, card counts, and the muted layout
- the slot's Rules text, so the rules travel with the deck

The file name is the deck name (cleaned of characters that can't
appear in file names) plus the export date:
`{deckname}-YYYY-MM-DD.json`. Doesn't modify any state.

**B13.6 · Import Deck from File.** Opens the browser's standard
file-picker popup, set to `.json` files. On selection, three
checks, each bailing with a status message if it fails:

- the file must parse as JSON
- it must carry the Mystery Tracker deck format marker (so a
  random .json can't sneak in)
- it must have at least one category

If the file passes, a slot-picker popup opens listing all four
slots by name (or "empty"). Occupied slots are marked ⚠. The
user picks the slot to import into; Cancel backs out.

On pick:

- if another slot already holds a deck with the imported deck's
  name, an inline error says so and the popup stays open so the
  user can pick differently or Cancel
- if the chosen slot is occupied, a two-tap Overwrite
  confirmation popup runs first

On commit:

- builds a deck record from the file (name, categories with
  their cards, players, card counts, and the muted layout — name
  trimmed to 6 chars)
- writes it into the chosen slot and saves the list to long-term
  storage
- the file's Rules text (if any) is written to that slot's Rules
  storage; if the file has none, the slot's old Rules text is
  cleared
- redraws the slot buttons and shows a status message

Net: import fills a slot but doesn't load it — the user clicks
the slot to bring the deck onto the grid.

**B13.7 · Deck file shape.** Each saved deck is a small record:

- name (max 6 chars)
- categories: a list of `{name, cards}` entries, where cards is
  a list of card name strings
- players: a list of six player names (with Me's original name
  written in place of "Me", so the file is laptop-portable)
- card counts: a list of six card counts — a number per player,
  or blank where none was typed
- muted layout: which category banners and which cards are
  switched off, so a loaded deck comes up with exactly the
  cards it was saved with

An exported file (B13.5) wraps this record in four extra fields:
the format marker, version number, export date and time, and the
slot's Rules text. Import (B13.6) unwraps it — only the record
lands in the slot, and the Rules text goes to the slot's Rules
storage.

See Appendix A for the full shape.

**B13.8 · Saved-decks storage routines.** Two short routines that
wrap long-term storage:

- **Read** — reads the JSON string from the deck-list slot,
  parses it, and returns a list (or an empty list if parsing
  fails).
- **Write** — takes a list, encodes it as JSON, and writes it
  back.

**B13.9 · Last-used deck marker.** A separate long-term storage
slot holding just the integer position of the most-recently
saved/loaded deck. -1 if none. Read by the page-load handler to
drive the auto-load decision.

**B13.10 · Deck-slot rendering and slot right-click menu.**
Builds the deck-slot row in the deck bar. Each slot is a button
labeled with the deck's name (or "N. Empty"). The last-used
slot (B13.9) is highlighted.

Click behavior:

- **Left-click on a filled slot** — triggers Load (B13.2).
- **Right-click on a filled slot** — opens a small menu: Export
  to file (B13.5) or Delete (B13.4).
- **Right-click on an empty slot** — shows "Slot is empty —
  nothing to Export or Delete."

**Within-page connectors.** B13.1, B13.2, B13.4, B13.5, B13.6
all read or write B13.8. B13.1, B13.3, and B13.4 write B13.9.
B13.2 → B13.3 on confirm. B13.10 dispatches to B13.2 (click)
and to B13.5 / B13.4 (right-click).

**Off-page connectors.** B13.3 reads and writes Page 2's cell
state and triggers an auto-save. B13.9 is read by Page 2's
page-load handler. B13.1, B13.2, B13.4, and B13.6 all open
their popups through the popup infrastructure. B13.3, B13.5, and B13.6 read or write the
per-slot Rules storage (no spec block yet — see pending list).

---

## Page 14 — Game Log

A running log of every meaningful event during the game.
Rendered top-to-bottom (newest first) in the Log panel on the
right side of the page.

The user references the Log to see exactly:

- who asked
- who showed
- what was asked
- what was shown
- when it happened
- and more…

The 7 blocks below detail how this is done:

- **B14.1** The game log (state)
- **B14.2** Entry kinds
- **B14.3** Turn entry push
- **B14.4** Manual entry push (current-turn replace)
- **B14.5** House entry push (current-turn replace)
- **B14.6** Log render
- **B14.7** Live log entry

**B14.1 · The game log (state).** A running list of every
meaningful event during the game, in the order it happened.
Each entry is a small record with at minimum a turn number; the
other fields depend on what kind of entry it is (see B14.2 for
the entry kinds). Saved in snapshots.

**B14.2 · Entry kinds.** Four kinds:

- **Turn entry:** the asker's name and column position, all
  asked cards, the shower's name (if any), what was shown to Me,
  what Me showed.
- **Manual mark entry:** the player column, the card, the
  action (✓ / ✗ / blank), and a `manual: true` marker.
- **House mark entry:** the card, the action (always ✓ —
  a blank pushes nothing, see B14.5), and a `room: true`
  marker (kept in code as `room` for
  back-compatibility, even though the on-screen column is the
  House column). Player column is set to -1 with player name
  "Board".
- **Out entry:** the player's name and column, how they went
  out (Quit or Wrong Accusation), and an `out: true` marker.
  For Quit only: the cards the player revealed on the way out.
  Permanent — Undo never removes it (**B12.5**).

**B14.3 · Turn entry push.** Every Next press pushes a turn
entry, capturing:

- the asker
- the cards asked
- the shower (if any)
- the shown-to-me records (which cards Me was shown)
- the i-showed records (which cards Me showed)

Pass turns (no asks made) push an entry too — the asked-cards
list just stays empty. That entry's Log line reads "did not
reach a room." If cards were asked but nobody showed, the
entry still pushes with an empty shower field; that Log line
ends "→ nobody."

**B14.4 · Manual entry push (current-turn replace).** Each
manual cycle commit pushes a manual entry. Only the current
turn's log entry ever changes — previous turns' log entries
never change (a full Undo is the only exception). Two rules:

- **Current-turn replace** — a manual entry for the same cell
  from the current turn is stripped before pushing, so
  re-commits within a turn collapse to one entry.
- **Revert** — strips the current turn's entry (if any) and
  pushes nothing. Earlier turns' entries stay exactly as they
  were.

**B14.5 · House entry push (current-turn replace).** Each house
cycle commit pushes a house entry. Same true-log rule as B14.4:
only the current turn's log entry ever changes — previous turns'
entries never change. Two rules:

- **Current-turn replace** — a house entry for the same card
  from the current turn is stripped before pushing, so
  re-commits within a turn collapse to one entry.
- **Blank action** — strips the current turn's entry (if any)
  and pushes nothing. Earlier turns' entries stay exactly as
  they were.

**B14.6 · Log render.** Goes through the game log newest-first
(with the live entry at the very top if there is one). For each
entry:

- builds the prefix (Tn — or "Now" for the live entry — plus
  the player's name in their color)
- dispatches on the kind:
  - **manual:** renders `{card} → ✓/✗/blank`
  - **house:** swaps the name for a "🏠 House-room" who-tag
    and renders `{card} → ✓`
  - **out:** renders "👋 Quit" or "😢 Wrong Accusation", plus
    "(showed: {cards})" when the player revealed cards on the
    way out
  - **turn:** renders all asked cards (joined with `·`), then
    the show result:
    - "{shower} showed" — another player showed the asker
    - "Me showed {card}" — Me showed the asker
    - "{shower} showed Me {card}" — Me was shown the card
    - "nobody" — no one showed
    - "waiting..." — live entry, no show yet
    - empty asked list: the line reads "did not reach a room."
      instead

**B14.7 · Live log entry.** A single entry (or none) that
represents the turn currently in progress. Built when asks
commit (B5.2) and updated as shows are recorded. Rendered at
the top of the log with a "Now" label. Cleared on Next or Undo.
Returning to Setup wipes it with the rest of the log. It is not
saved in snapshots, so restoring a save mid-turn drops the
"Now" line.

**Within-page connectors.** B14.3, B14.4, B14.5 all
write B14.1. B14.6 reads B14.1 and B14.7.

**Off-page connectors.** B14.1 saved/restored via Page 2's
snapshot. Out entries are pushed by Page 11's Mark Out commit
(**B11.3**) and survive Undo (**B12.5**). B14.7 is built by
Page 5's ask commit (**B5.2**) and updated by Page 6's reveal
popups as shows are recorded. B14.6 runs whenever an entry is
pushed or the live entry changes, and again after Page 12's
Undo and Page 2's snapshot restore. B14.4, B14.5 entries
dropped from log by Page 12's scrub.

---

## Page 15 — Mute & Hide System

The user can mute categories and individual cards during Setup
to trim the deck down to a game's actual content. Muted entries
grey out in early Setup steps and disappear entirely once Step
5 starts or Play begins. During Play a muted entry is out of
the game: it can't be asked, takes no marks, and doesn't count
toward the asks-per-turn limit. Muting can't be changed during
Play.

The 6 blocks below describe how muting is stored, toggled, and
applied:

- **B15.1** Muted sets (state)
- **B15.2** Mute toggle from right-click menus
- **B15.3** Active-vs-muted checks
- **B15.4** Hide-mode trigger
- **B15.5** Hidden-row styling
- **B15.6** Engine effects of muting

**B15.1 · Muted sets (state).** Two sets:

- muted category indices: the categories currently muted (the
  entire category is excluded from play)
- muted card names: the cards currently muted (only that card
  is excluded)

Both sets are saved in snapshots — game saves and the per-step
Setup snapshots. New Game resets both to the grid defaults
(**B2.10**): the 4th category and its three cards muted. Edit
Setup leaves them
unchanged, so mutes survive a return to Setup.

**B15.2 · Mute toggle from right-click menus.** The right-click
menus offer different options per Setup step:

- **Step 2 (on a category banner):** Mute / Activate.
- **Step 3 (on a card name):** Mute this card / Mute this card
  and all below / Activate.

Each menu item flips the appropriate set and triggers a redraw.
"Mute card and all below" mutes every card from the clicked one
down to the last card in its category.

**B15.3 · Active-vs-muted checks.** Two short read-only checks:

- "Is this category active?" — returns true if its position
  is NOT in the muted-category set.
- "Is this card active?" — returns true if its name is NOT in
  the muted-card set.

Used by the table build (to grey muted rows), the right-click
menu labels, and Page 11's Mark Out popup — its card picker and
Quit ✗-fill skip muted entries. A third helper built on the
category check counts the active categories; that count sets
the asks-per-turn limit (**B15.6**).

**B15.4 · Hide-mode trigger.** (Also documented as B3.12.)
Hide mode turns on when the phase is Play, or when the phase is
Setup and the current step is 5+. In hide mode, muted rows AND
empty player columns disappear from view. A muted category hides
its banner row and all its card rows; a muted card hides just
its own row.

**B15.5 · Hidden-row styling.** A CSS class that hides a row
entirely. Applied when hide mode is on to muted category banner
rows and muted card rows — including every card row of a muted
category. Removed when hide mode is off so muted rows are
visible, greyed: a muted category greys its banner and all its
card rows; a muted card greys its own row. The class doesn't
apply to non-muted rows or to empty player columns (those have
their own hide class).

**B15.6 · Engine effects of muting.**

- muted categories don't count toward the asks-per-turn limit
- muted rows never get swept: a row sweep runs only on the row
  of the card that set it off — a show (Page 6), a manual ✓
  commit (Page 8), a Mark Out Quit reveal (Page 11), or Start
  Game's initial ✗ pass (Page 5) — and none of those can start
  from a muted card
- cells in muted rows are unclickable — in hide mode the rows
  are gone from view entirely, and the click handlers refuse
  cards in muted rows as a backstop
- muting is reversible at any point during Setup (Steps 2 and
  3 via right-click) but locks once Play starts

Net: no marks ever land in a muted row — a muted entry plays
no part in the game.

**Within-page connectors.** B15.2 writes B15.1. B15.3 reads
B15.1. B15.4 reads B15.1 to decide which rows to hide. B15.5
is the styling B15.4 applies. B15.6's effects ride on B15.3's
checks and B15.4's hiding.

**Off-page connectors.** B15.1 saved/restored by Page 2, reset
to the grid defaults (**B2.10**) on New Game, and carried in
deck export/import by Page 13; Page 3's card renames carry mute
entries to the renamed card. B15.3 called from Page 5
(the ask-click muted-row refusal, the asks-per-turn limit and
turn prompts, and Start Game's initial ✗ sweep, which skips
muted rows) and Page 11 (Mark Out card picker and Quit ✗-fill).
B15.4 runs after load and New Game (Page 2), after Setup step
changes and name edits (Page 3), at the Me pick (Page 4), at
Start Game (Page 5), and as part of the every-cell re-render
after a show commit (Page 6), a Mark Out (Page 11), an Undo
(Page 12), or a deck load (Page 13).

---

## Appendix A — Data Shapes

### A.1 — Cell State File / Pigeonhole (one per card × player column)

```
{
  check:        boolean,    // player holds this card
  cross:        boolean,    // player does NOT hold this card
  asked:        boolean,    // player asked about this card
  showed:       boolean,    // player showed a card on a turn
  shownToMe:    boolean,    // player showed this card to Me
  iShowedMe:    boolean,    // Me showed this card to this player
  marks:        [Mark, …],  // mark history list (see A.2)
  // optional manual-cycle bookkeeping (Page 8):
  manualStage?:    'blank' | 'cross' | 'check' | undefined,
  manualSnapshot?: PreCycleSnapshot,
  manualUndoList?: [PropagationUndoEntry, …]
}
```

### A.2 — Mark Record (entries in cell.marks)

```
{
  type:    'check' | 'cross' | 'asked' | 'showed' |
           'shownToMe' | 'iShowedMe',
  turn:    integer,         // 0 for Setup or Start Game, otherwise turn count
  manual?: true,            // present on user-placed manual marks
}
```

### A.3 — Game Log Entry (entries in gameLog)

Four kinds; all carry at minimum a turn number. See B14.2 for
the full field list per kind.

### A.4 — Game Deck Record (one saved slot)

```
{
  name:        string (max 6 chars),
  categories:  [{name, cards: [string, …]}, …],
  players:     [string, …],   // length 6
  cardCounts:  [number | null, …],   // length 6 (null = not entered)
  mutedCategoryIdxs: [integer, …],   // category banners switched off
  mutedCards:        [string, …],    // card names switched off
}
```

### A.4a — Exported Deck File (the record plus a wrapper)

```
{
  format:     'mystery-tracker-deck',
  version:    3,
  exportedAt: ISO date string,
  rules:      string,          // the slot's Rules text
  …plus all six record fields above
}
```

### A.5 — Saved Game Snapshot (the value at the save file slot)

A single record produced by getSnapshot. See B2.7 for the full
field list. Save format version 8.

### A.6 — Per-Step Setup Snapshot

```
{
  categories:        [{name, cards}, …],
  mutedCategoryIdxs: [integer, …],
  mutedCards:        [string, …],
  typingUndoStack:   [TypingUndoEntry, …],
}
```

Session-only; not in the saved snapshot.

**Note:** player names and card counts are NOT in this snapshot. The
DOM input boxes own them — names are only editable in Step 4, so
there's no need to remember them per step, and doing so would let a
stale Step-5 snapshot clobber later Step-4 edits.

### A.7 — Undo Typing Stack Entry

```
{
  type:    'cat-name' | 'card-name' | 'player-name' | 'card-count',
  oldValue: string,
  // plus a location: catIdx, cardIdx, or col, depending on type
}
```

---

## Appendix B — Optional Deduction Rules

The optional deduction rules are a set of opt-in helpers that point
out what the marks on the grid already imply. Each one either colors
the board or posts a note in the Deductions panel — none of them
ever places a mark. Default play is unchanged: the user does all the
recording, and the helpers only surface what follows from it.

The helpers live behind the "?" header button, which opens the
Deductions panel. Every rule starts off; the user ticks the ones
they want.

**The Deductions panel ("?").** The "?" button in the header opens
the Deductions panel, a third overlay beside Guide and Rules. The
three share the Log column's space and are mutually exclusive —
opening one closes the other two. The panel opens on its own
whenever the app enters Setup: a page load that lands in Setup, New
Game, and Return to Setup. It never closes itself — the user closes
it, or opening Guide or Rules replaces it.

**The checklist.** Inside the panel, the line "Optional helpers:"
heads seven checkboxes, all off by default. The
user can tick or clear any of them at any time, and a change takes
effect right away. The colorings themselves only appear during
Play, since Setup has no marks to reason about. Each rule is
described below in the order it appears in the panel.

**The seven rules.** In panel order:

1. **Green — must be part of the answer.** A card whose whole row
   is ✗ — every player ruled out — must be one of the secret
   cards. Its name cell turns green. Worked out live each time the
   board repaints, never from a saved list, so it can't show a
   stale answer.
2. **Red — ruled out.** A card someone is confirmed to hold (a ✓
   or ✓\* anywhere on its row), or that is checked onto the board in
   the house column, can't be a secret card. Its name cell turns
   red.
3. **Red — gave it away on a show.** When one player showed another
   a card and has ✗ on every other card asked that turn, the card
   they showed is the only one left, so they must hold it. Its name
   cell turns red. This reads every show between two other players
   (shows involving Me are already exact), across the committed Log
   and the turn in progress, so the red lands the moment a show
   gives a card away; a ✗ learned on a later turn counts just as
   much. If the marks ever contradict a show — ✗ on every asked
   card — the rule colors nothing.
4. **Red — hand fully known.** When a player's card count is N and
   N cards in their column are marked "they hold it" (✓ or ✓\*),
   their whole hand is accounted for: every other cell in their
   column is a silent ✗, tinted red.
5. **Green — must hold.** The reverse: when a player's column is ✗
   on every card except exactly N of them (N = their card count),
   those survivors must be their whole hand — each is a silent ✓,
   tinted green.
6. **Green — last card standing.** When every card in a category
   but one is ruled out, the survivor must be that category's
   secret card. Its name cell turns green.
7. **Red — fencing.** Every show between two other players proves
   the shower holds at least one of that turn's asked cards — a
   fence. Once enough fences that share no cards are known to pin
   down all of a player's unseen cards, the rest of their column
   must be cards they don't hold: each is a silent ✗, tinted red.
   The closing logic and the notes it posts are described under
   "The fence notes" below.

**Shared guards (rules 4, 5, and 7).** These three read a player's
card count. Without a count typed they stay silent. Me's own column
is skipped — it is fully known at Start Game. Muted rows don't
count. And if the marks contradict a rule, it colors nothing.

**Two kinds of coloring.** The rules color the board in two
different places:

- **Name-cell tints (rules 1, 2, 3, 6).** These color the card's
  name in the left header column — green for "in the answer," red
  for "ruled out." The fact is about the card itself, true for
  every player.
- **Column-cell tints (rules 4, 5, 7).** These color individual
  cells inside one player's column — a silent ✗ in red, a silent ✓
  in green — because the fact is about that one player's hand.

In every case the color is only a hint: a real ✓ or ✗, the
current-turn column highlight, and the grey of a muted row all
paint over it. The color never blocks or replaces a mark the user
makes.

**The "Why?" note.** Right-click a tinted card name during Play and
a small note explains why it is colored: for green, that every
player is ruled out on that row, or that it is the last card left in
its category; for red, the name of the player who holds it, that it
is on the board, or which show gave it away and when. The note works
out its answer live at click time, clears itself after five seconds,
and any click clears it sooner.

The column-cell tints (rules 4, 5, 7) have no such note — a
right-click on a player cell is the manual mark cycle. Rules 4 and 5
need none: the ✓s or ✗s that drive them are already on the grid.
Fencing's reasoning lives off the grid, so its results are written
into the Deductions panel instead.

**The fence notes.** Fencing depends on the card count. To close a
player's column — name their hand and tint the rest — the rule needs
that player's count typed; without it, fencing shows nothing for
that player. (The one thing it still reports either way is a flatly
impossible show — see "A conflict" below.)

Below the checkboxes, an area appears while the fencing rule is on.
It posts only facts that are both definite and impossible to see
anywhere else — the grid, the Log and the tints carry everything
else, so individual fences are not listed here. Two kinds of line
appear, newest first to match the Log:

- **A closed column.** When fencing pins down a player's whole hand,
  one line names what is now known. If every unseen card is
  identified, they are all named with the turns that did it ("Eve
  holds: Plum, Rope and Hall (turns 1, 2 and 3)."). If some are
  pinned but others remain, the line names the sure ones and counts
  the rest ("Eve holds Plum and Rope — 1 unknown card, not one of
  the tinted."), or, when none are individually pinned, just the
  count ("Eve: 3 unknown cards, none of the tinted.").
- **A conflict.** In red, when the marks can't all be true: a show
  whose asked cards are now all ✗ in the shower's column
  ("…conflicts with the ✗s in their column — one of those marks is
  wrong."), or a player whose shows can't fit their hand ("…shows
  don't fit their hand — a mark or their card count is wrong."). The
  first time a conflict appears it also flashes once as the app's
  brief red status message, in case the panel is closed; it speaks
  again only if the conflict is fixed and then comes back.

When there is nothing to report the area reads "Nothing definite
yet." Every line is recomputed live and disappears as soon as the
marks behind it are corrected.

**How it's saved.** The seven checkbox states travel with the game.
They are written into the saved snapshot (save format version 8, see
**A.5** / **B2.7**) and come back when a saved game is reloaded, so
the board returns with the same rules on. New Game and any older save
start with all rules off. Game decks never carry rule states — a deck
is the layout, not the play.

**Safety and structure.** Every rule obeys two hard limits: it is
read-only — it never writes a ✓, ✗ or any other mark — and
decoration-only — its entire output is color on a cell, a right-click
note, or a line in the Deductions panel. The user still records
everything by hand. The whole feature is one self-contained block at
the bottom of the HTML file; from the rest of the app it reaches only
the "?" button, the Deductions panel, and one guarded close-call
inside each of the Guide and Rules toggles. Delete the block, the
button and the panel and the feature is gone, with default play
untouched.

---

## Index of Block IDs

- **Page 1**: B1.1–B1.14 (links)
- **Page 2**: B2.1–B2.10 (Launch & Auto-Save)
- **Page 3**: B3.1–B3.12 (Setup Wizard)
- **Page 4**: B4.1–B4.7 (Me Lifecycle)
- **Page 5**: B5.1–B5.11 (Turn Sequence)
- **Page 6**: B6.1–B6.4 (Reveal Popups)
- **Page 7**: B7.1–B7.9 (Auto-Mark Engine)
- **Page 8**: B8.1–B8.6 (Manual Mark Cycle)
- **Page 9**: B9.1–B9.6 (House Column)
- **Page 10**: B10.1–B10.4 (Summary Column)
- **Page 11**: B11.1–B11.7 (Player Out)
- **Page 12**: B12.1–B12.7 (Undo & State Recovery)
- **Page 13**: B13.1–B13.10 (Game Decks)
- **Page 14**: B14.1–B14.7 (Game Log)
- **Page 15**: B15.1–B15.6 (Mute & Hide)

**Total: 109 functional blocks** across 15 pages, plus an
appendix documenting 7 data shapes.
