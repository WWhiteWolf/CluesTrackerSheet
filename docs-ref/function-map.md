# Function map — Mystery Clues Track Sheet (the rebuild)

What every piece of the rebuilt code is for, in plain English.

**It carries no line numbers, on purpose (Patrick, Y-27).** A number
is a position rather than a name, so it shifts the moment anything
above it is edited, and neither Patrick nor Claude ever jumps by line
number anyway. Names do not drift. The old function map, part two of
Appendix D in `docs-ref/build-mcts-test.js`, carried numbers and its
own introduction warned that they go stale; this one is the same shape
with that weakness taken out.

**It comes in two parts, because the rebuild is two files.**

- **Part One — the engine**, `mystery-engine.js`. The shared heart.
  It owns the state and every rule of the game. It decides; it never
  draws.
- **Part Two — the phone page**, `mystery-phone.html`. One packaging
  of that engine. It draws, and much of what it holds sits in markup
  rather than in functions, so its entries point at windows and
  sections as well as at functions.

Keeping them apart means the engine part stands untouched when a
second packaging — the web rebuild, or the Android leg — is finally
given the rebuilt page.

**Where a behaviour crosses between the two,** the entry names the
other side, so each half points at its partner.

**`docs-ref/message-map.md` points here.** Every sentence the app says
is recorded there against the function or window it lives in, so that
map carries no line numbers either.

---

# Part One — the engine (`mystery-engine.js`)

## How to read this part

The families below follow the file's own order and its own section
banners, so reading the map top to bottom and reading the file top to
bottom land in the same places.

Most of what follows is private to the engine. Only the names listed
under **The public door** can be called from outside, and an entry
says so when the packaging is the thing that calls it.

## The public door

Everything the packaging is allowed to call, as the engine hands it
back at the end of the file:

`connect`, `boot`, `visibleMarks`, `cellTap`, `headerTap`, `nextTap`,
`undoTap`, `confirmShownMe`, `confirmIShowed`, `correctShower`,
`accuse`, `playerOutCards`, `playerOut`, `newGame`, `logView`,
`inspect`, `testing`, `setSeat`, `addCategory`, `deleteCategory`,
`editCategory`, `toggleMyCard`, `envelopeSize`, `countsPrefill`,
`countsDefault`, `setCounts`, `setupUnmet`, `play`, `savedDecks`,
`saveDeck`, `loadDeck`, `deleteDeck`, `sumCommit`, `sumStarWarning`,
`houseTap`, `setCellNote`, `cellNote`.

The whole thing lives under one global name, `Engine`, set on `window`
in a page and on `globalThis` in the test runner.

## How the engine speaks to the packaging

The packaging hands the engine an object of functions through
`connect()`, and the engine calls them when something needs repainting
or saying. Every hook is optional; a missing one is skipped silently.

- `cellChanged(card, col)` — this one grid cell needs repainting.
- `houseChanged(card)` — this 🏠 cell needs repainting.
- `sumChanged(card)` — this ∑ cell needs repainting.
- `turnChanged()` — the turn, the phase or the highlights moved.
- `logChanged()` — the turn log gained or lost an entry.
- `setupChanged()` — the Setup screen needs repainting.
- `status(text, kind)` — say this to the player. `kind` is
  `'direction'` for a plain report or `'warning'` for a refusal.

**The engine holds the bulk of the app's talking,** and all of it
leaves through `status`.

## What the engine keeps

One object, rebuilt whole by `freshState()` and saved whole. Its
fields:

- `categories` — the deck: a list of `{ name, cards }`.
- `players` — six seat names, empty string for an empty seat.
- `meSlot` — which seat is Me, or −1 for none.
- `myCards` — the card names in Me's hand.
- `counts` — the dealt-card counts: `entered`, `house`, and six
  `players` numbers.
- `cellState` — `cellState[card][col]` is that cell's list of marks. A
  mark is `{ type, turn }`, plus `quit` or `house` when one applies.
- `cellNotes` — keyed `card + '_' + col`, the player's own short
  reminders.
- `sumOverrides` — `sumOverrides[card]` is `'check'`, `'star'`, or
  absent.
- `sumTurnChanges` — what each touched ∑ cell held when the turn
  began, so the turn's end logs only real changes.
- `houseChecked` — `houseChecked[card]` is the turn its 🏠 mark landed.
- `playerOutKind` — `playerOutKind[col]` is `'quit'` or `'wrongacc'`.
- `activePlayers` — the ring, in seat order.
- `turnCount` and `turnStep` — which turn, and where in the ring.
- `gamePhase` — `'asking'`, `'showing'` or `'waiting'`.
- `pendingCards` and `pendingAskerCol` — the ask being built.
- `lastShowerName`, `lastShowerCol`, `lastShowCards` — the show just
  committed, which is what makes taking it back possible.
- `accusationResult` — `'won'`, `'lost'`, `'opp:N'`, or null.
- `gameInProgress` — true from `play()` until the next `newGame()`.
- `turnLog` — the log entries, oldest first.

**One runtime variable sits outside the state:** `modalShowerCol`,
which remembers whose header opened the shown-to-me picker. It is
never saved, so a picker left open across a close and reopen does not
survive.

## Where the engine writes

Two keys in `localStorage`, and nothing else:

- **`mctsGame`** — the whole state, wrapped as `{ schema, state }`
  with `schema` at 1.
- **`mctsDecks`** — the saved decks, kept apart from the game so a New
  Game never touches them.

The shipped App Store version uses different keys and they are never
read. Old and saved games never matter.

## The limits, all in one place

| What | Limit |
| --- | --- |
| Player name | 6 characters |
| Category name | 13 characters |
| Card name | 13 characters |
| Categories | 4 |
| Cards in the deck | 30 |
| Saved decks | 4 |
| Saved deck name | 6 characters |
| Cell note | 4 characters |

---

## A. The connection to the packaging

**`connect(h)`.** Takes the packaging's object of hook functions and
keeps it. Called once, at start-up. Passing nothing disconnects every
hook.

**`emit(name, ...args)`.** The engine's own way of calling a hook: it
runs the named hook if the packaging supplied one and does nothing at
all if it did not. Every report the engine makes goes through here.

## B. The state and the cells

**`DEFAULT_CATEGORIES()`.** The factory deck, built fresh each time it
is asked for: three categories of nine cards, named "Card 1" through
"Card 27".

**`freshState()`.** Builds a whole new empty state object, every field
at its starting value. It is the single description of what a state
is, and both `newGame()` and `boot()` build on top of it.

**`allCards()`.** The deck flattened into one list of card names, in
deck order. Deck order is what every card list in the app is sorted
by, so this is reached for constantly.

**`ensureCell(card, col)`.** Hands back one cell's list of marks,
creating the empty structure if that cell has never been touched. It
is the only place cells come into being.

## C. Mark rules

**`placeMark(card, col, type, flags)`.** The one door for putting a
mark in a cell, private to the engine — the packaging has no way to
call it. It enforces the standing rules and returns true when the mark
lands, false when a rule refuses it:

- ✓, ✗ and ! land once ever in a cell.
- A ! is refused outright in a cell that already holds a ✓ or a ✗.
- ? and Me land once per turn per cell.
- When a ✓ lands, every other active player is crossed off for that
  card — one hand holds it, so no other can. That is bookkeeping, not
  thinking.
- `flags.quit` marks it permanent, so a turn wipe never removes it.
  `flags.house` marks it as placed by a 🏠 board mark, so clearing
  that mark can find exactly its own crosses again.

**`visibleMarks(card, col)`.** What a cell should actually show, which
is not the same as what it stores. While a cell holds a ✓ or a ✗ its !
marks stay in storage but are not drawn, and they come back into view
if the ✓ or ✗ is ever removed. A ? always shows — it is the player's
own trace of what was asked. It hands back copies, so the caller can
do as it likes with them. **The packaging calls this to paint every
cell.**

**`wipeTurn(turn)`.** Removes every mark belonging to one turn, across
the whole grid, keeping the quit-flagged ones. A 🏠 mark placed that
turn leaves with it.

## D. Small readings of the state

**`activeCategoryCount()`.** How many categories have cards in them.
This is the number of cards an ask needs, so an empty category is mute
everywhere.

**`getCategory(card)`.** Which category a card lives in, by position.

**`currentCol()`.** Whose turn it is — the seat standing at `turnStep`
in the ring.

**`pName(col)`.** A player's display name: "Me" for the Me seat, the
typed name, or "P1" through "P6" for a seat with neither.

**`columnPhrase(col)`.** The same thing worded for a sentence spoken
to the player — "your column" for Me, "Kate's column" for anyone else.

**`isGameOver()`.** True when a game is running and either an
accusation verdict ended it, or no live opponent is left. A 😢 player
is not alive; a 👋 quit has already left the ring. It reads from the
state, so an ending survives closing and reopening the app.

**`gameOverGuard()`.** The freeze. It answers a tap that arrives after
the game has ended — "Game over — tap New to start a new game" — and
reports true so the caller stops. Nearly every door in the engine
calls it first.

**`appendLog(entry)`.** Pushes one entry onto the turn log and tells
the packaging the log changed.

## E. Setup — the seats, the deck and the hand

Every door in this family refuses while a game is running. New Game is
the only road back to Setup. Any change to the seats or the deck
clears the entered counts, because those numbers describe a deal that
may no longer exist.

**`setupClosed()`.** True while a game is in progress — the one test
every Setup door makes first.

**`clearCounts()`.** Puts the counts back to nothing entered, House at
zero and every player at zero.

**`seatedSlots()`.** Which seats are dealt in: the Me seat and every
seat with a typed name.

**`setSeat(slot, name, isMe)`.** The seat window's one commit. Marking
a seat as Me moves Me here and empties its name, since Me has no typed
name; typing a name into the Me seat turns it back into an ordinary
player. Names are trimmed and capped. The counts clear only if
something actually changed.

**`addCategory()`.** Adds an empty category, named for its position,
up to the cap of four.

**`deleteCategory(index)`.** Deletes a category and drops its cards
from the Me hand. It refuses to delete the last one — "At least one
category is needed".

**`editCategory(index, catName, rows)`.** The card-edit window's one
commit, and the largest Setup function. Each row arrives as
`{ orig, name }`, with `orig` null for a new row; a nameless new row
is simply dropped. It works in three passes:

- **Collect** — trim and cap every name, discard the blanks.
- **Guard** — refuse the whole edit if the deck would go over thirty
  cards, or if any name duplicates another anywhere in the deck.
  Comparison ignores case, because cards are known by name everywhere.
- **Apply** — a renamed card keeps its place in the Me hand, a removed
  card leaves it, and a category emptied by the edit is deleted so
  long as one category survives.

**`toggleMyCard(card)`.** A tap on a card chip puts it into the Me
hand or takes it back out. This is the one Setup change that does not
clear the counts: picking the hand is a thing you do to satisfy the
counts, not a thing that invalidates them.

## F. The counts and the Play gate

**`envelopeSize()`.** How many cards the solution envelope holds — one
per category that has cards. It sits aside before any deal, so every
counts calculation works from the deck minus the envelope, never the
whole deck.

**`countsPrefill(house)`.** Given a House number, splits the rest of
the dealt cards evenly among the seated players, dealing any remainder
one each from the first seat on.

**`countsDefault()`.** What the counts window opens on — the app's own
reading of the deal. The seated players take an even share and House
takes whatever is left over, which is where spare cards sit on a real
table. So there is always a suggestion on screen and Done can accept
it as it stands.

**`setCounts(house, playerCounts)`.** The counts window's Done. Every
dealt card must be accounted for: House plus the seated players must
come to the deck minus the envelope exactly, in whole numbers, or the
whole entry is refused with "The number of cards entered does not
equal the number of cards in your deck". Numbers offered for empty
seats are ignored. Only a successful Done sets `entered`, which is
what makes the counts count as answered for.

**`setupUnmet()`.** The Play gate, worded. It hands back the first
unmet condition as a full sentence, or null when Setup is complete,
and it checks them in the order the Setup flow runs: a seat marked Me,
at least two players counting yourself, at least two categories with
cards, at least three cards in each of those, at least twelve cards in
the deck, the counts entered, and the Me hand holding exactly the
number of cards the counts say it does. **The packaging calls this to
dim or brighten ▶ Play,** as well as to speak when Play is tapped.

**`play()`.** The gate speaks, or the game begins. Starting drops
every empty category, seats the ring from `seatedSlots()`, and lays
the turn-zero marks — a ✓ in the Me column for each card in the hand,
which crosses that card off for everyone else, and an ✗ for each card
not held. Then turn 1 opens on the first seat in the ring.

**Those turn-zero marks quietly do a lot of work later:** they are why
two of the private-picker fallbacks further down can never fire.

## G. Saved decks

A saved deck is structure only — the category names and their cards.
Counts are set fresh every game and are never saved with a deck.

**`savedDecks()`.** Reads the decks back from `mctsDecks`. Malformed
or missing data reads as none rather than throwing.

**`writeDecks(decks)`.** Writes the list back, failing silently where
there is no storage.

**`saveDeck(name)`.** Saves the current deck structure under a name.
It refuses an empty name, refuses at four decks, and refuses a
duplicate name ignoring case — each with its own sentence.

**`loadDeck(index)`.** Replaces the whole deck with a deep copy of the
saved one, dropping empty categories and falling back to the factory
deck if nothing survives. The Me hand and the counts both clear,
because they speak of cards that may be gone.

**`deleteDeck(index)`.** Removes one saved deck and says so.

## H. The turn machinery

The packaging routes every grid-cell tap to `cellTap()`, the Next
button to `nextTap()` and a confirmed Undo to `undoTap()`. **The
two-tap confirm on Undo belongs to the button, in the packaging** —
the engine sees only the confirmed tap.

**`cellTap(card, col)`.** The one grid door. It returns true when the
engine consumed the tap and **false to tell the packaging to open its
own cell-note editor instead** — so the note editor is what a tap
means whenever the engine has no use for it. The engine consumes a tap
in the asker's own column during asking, and a tap on an already-asked
cell while a shower is being chosen.

**`askingTap(card, col)`.** A tap in the asker's column: pick,
unpick, or swap. A second pick in the same category swaps out the
first, so an ask can never name two cards from one category. When the
last category is covered the phase swings to showing on its own; short
of that, the progress line speaks.

**`takeBack(card, col)`.** A tap on an asked cell while the turn waits
for a shower takes that pick back and reopens the asking phase. Once a
shower has been chosen the moment has passed and Undo is the only road
back.

**`removePick(card, col)`.** Drops one card from the pending ask and
strips its ? mark from the current turn.

**`askProgressStatus()`.** Says how far the ask has got — "2/3 —
need: Weapons" — naming the categories still missing.

**`nextTap()`.** The Next button, which means four different things
depending on the phase:

- Waiting — advance to the next turn.
- Asking with some picks made — refuse, because a half-made ask is
  neither an ask nor a pass: "Select all or none of the cards in
  your column first". The picks stand.
- Asking with no picks — the silent skip. The turn passes, a "pass"
  line goes to the log, and play moves on.
- Showing with a full ask — the nobody-showed road.

**`advanceTurn()`.** Moves the turn to the next live player, hopping
over 😢 players — they take no more turns but stay in the showing
ring. It settles the turn's ∑ changes into the log first, raises the
turn count and clears every scrap of mid-turn state.

**`undoTap()`.** A confirmed Undo. Mid-turn it wipes the current
turn's marks; at a turn's very start it also steps back one turn,
hopping over 😢 players the same way the forward walk does, and wipes
that turn too. Quit-flagged marks and ∑ marks survive. The Undo writes
its own log entry — honest history — listing every hidden ! the wipe
brought back into view. On turn 1 with nothing pending it answers
"Nothing to undo".

**`wipeTurnTracking(turn, returned)`.** Wipes one turn while watching
for hidden marks coming back. It notes what each affected cell showed
before, wipes, then looks again — a cell that lost its last ✓ or ✗
shows its stored ! again, and each return is added to `returned` so
the log can call attention to it.

## I. The showing flow

The packaging routes every column-header tap to `headerTap()` and
follows the road the answer names. The five roads are `'refused'`
(a guard spoke, nothing changed), `'marked'` (a show between two other
players committed at once), `'shownme'` (open the shown-to-me picker
with the cards given), `'ishowed'` (open the I-showed picker with the
cards given), and `'correct'` (the shower's own header tapped again —
**after the packaging's own confirm tap**, call `correctShower()`).
Closing a picker without confirming needs no engine call at all,
because nothing lands until the confirm.

**`mustShowOn(col)`.** Does this player have to show — that is, do
they hold a ✓ on any of the asked cards? Setup marks count only for
Me; another player's ✓ counts from the first real turn onward.

**`mustShowFirstLine(col)`.** The must-show refusal, worded in one
place (Patrick, Y-27). Two doors reach it — tapping a header to say
someone showed, and tapping Next ▶ to say nobody did — and it used to
be typed out at both, which a later rewording could have left
disagreeing with itself.

**`headerTap(col)`.** The showing flow's front door, and the busiest
function in the engine. Before any of the real guards it answers the
easy cases: a tap after game over, a tap on a player who has quit, a
tap during asking ("Select 3 cards in your column first"), and a tap
while waiting (which is either the take-back road or "Tap Next ▶ to
continue"). Then three guards, in order:

- **The asker cannot also show.**
- **A player with ✗ on every asked card cannot show** — there is
  nothing they could be holding.
- **Turn order holds.** Walking the ring from the asker, the first
  player who must show blocks everyone seated after them.

Anything that survives all three goes to `commitShower()`.

**`commitShower(showerCol, askerCol)`.** Picks the road. Me showing
someone else opens the I-showed picker; a show to Me opens the
shown-to-me picker; a show between two other players commits at once,
since neither card is anything Me is entitled to see. Picker lists
come back in deck order.

**Each picker offers one list and no other.** The I-showed picker
offers the asked cards Me holds; the shown-to-me picker offers the
asked cards Me does not hold. Neither can come out empty, and turn
zero is the reason: if none of the asked cards are mine then my column
is crossed on all of them and the second guard refuses my header; if I
hold all of them then my turn-zero ✓s crossed them off for everyone
else, so every other header is refused too. That reasoning is entirely
inside this file; nothing about it depends on the page.

**`markShower(showerCol, askerCol)`.** A show between two other
players: a ! on the shower for each asked card not already confirmed
in an earlier turn, the passers crossed off, the turn logged, and the
phase moved to waiting. It records the show in `lastShower…` so it can
be taken back.

**`autoXPassers(askerCol, showerCol)`.** Walks the ring from the seat
after the asker up to the shower and crosses each of those players off
on every asked card. They were asked and showed nothing.

**`confirmShownMe(card)`.** The shown-to-me picker's confirm. The
picked card lands as a plain ✓ in the shower's column — **being shown
a card is the only way a ✓ ever lands in play** — the passers are
crossed off, the turn is logged with the card named, and the status
line names who showed it. With no pick it answers "Select a card".

**`confirmIShowed(card)`.** The I-showed picker's confirm. A Me mark
lands in the asker's column for the card I showed, the passers between
us are crossed off, and the turn is logged.

**`correctShower()`.** Takes back a mis-tapped third-party show, after
the packaging's confirm tap. The show's ! marks and its passer ✗ marks
leave, its log entry leaves, and the turn reopens waiting for the
right header. Quit-flagged and 🏠 marks are untouched. It is reachable
only after `markShower` — the two private pickers clear
`lastShowerCol`, so a show involving Me cannot be taken back this way.

**`nobodyShowed()`.** Next ▶ with a full ask and no shower. It first
checks that nobody is holding a must-show ✓, refusing with the same
one-place sentence if someone is. Otherwise every player but the asker
is crossed off on the asked cards, the line "No player showed — those
cards are ❌-ed out for them" goes up, the turn is logged, and play
advances.

## J. The ∑ column and the 🏠 column

Both columns are the player's own hands at work. The engine keeps the
books and concludes nothing.

**`sumStarWarning(card)`.** The watcher's one judgment: would a ⭐ on
this card make more than one in its category? It hands back the
warning to speak, or null. **The packaging asks this before it
commits,** so a second ⭐ can arm its "Sure?" tap with the warning
already on screen.

**`sumCommit(card, value)`.** The ∑ picker's commit — `'check'` for ✕,
`'star'` for ⭐, or null to clear. On the turn's first touch of a cell
it records what that cell held when the turn began, so the turn's end
can log only what truly changed. A ⭐ that crowds its category speaks
the warning as it lands; the star still stands, because this is advice
and not a refusal.

**`flushSum()`.** Sends the turn's settled ∑ changes to the log. A
cell touched and left as the turn found it logs nothing. It runs at
the end of a turn and also before an accusation or a quit is logged,
so an ending never swallows the last changes.

**`houseTap(card)`.** The 🏠 toggle, both directions in one function.
Marking says the card was seen on the board, so no hand holds it:
every other active player is crossed off, each ✗ flagged as the
house's so the clearing can find them again. Me needs no cross,
because the Me column crossed off every unheld card at turn zero.
Clearing takes back the mark, exactly those crosses, and the log entry
— but only if the entry belongs to the current turn. An earlier turn's
entry stays as history.

## K. Cell notes

A note is the player's own hand at work, like ∑. It is never logged,
and a turn wipe never touches it.

**`cellNote(card, col)`.** Reads one cell's note back for painting.

**`setCellNote(card, col, text)`.** The note window's one commit.
Text is trimmed and capped at four characters; empty text deletes the
note rather than storing a blank one.

## L. Endings and exits

The packaging opens its own windows and owns its own two-tap confirms.
Nothing lands until the one commit call below.

**`accuse(col, cards, result)`.** The verdict, and **the only door to
an ending. No verdict can ever be undone.** It refuses without an
accuser, refuses a 😢 player who is already out, and refuses an
incomplete card set — one card from every category with cards. Then
the permanent ⭐ log line is written, and one of three things happens:

- **Your own verdict ends the game either way** — won or lost.
- **An opponent right ends it as their win.**
- **An opponent wrong sends them to the permanent 😢 sideline and the
  game plays on** — unless they were the last live opponent, when the
  game ends and you have won. If the wrong accuser was holding the
  turn, their turn ends at once: a standing ask is abandoned and
  leaves no trace, its ? marks coming off exactly as the take-back
  road does, and play moves on.

**`playerOutCards(col)`.** The quit picker's card list, in deck order,
each card carrying the name of whoever already holds it — a card
confirmed by a ✓ in another column cannot be in this player's hand, so
**the packaging fades those dead.**

**`playerOut(col, shownCards)`.** The 👋 quit commit. Any pick that
another player's ✓ makes impossible is dropped first. The shown cards
land as permanent ✓ marks, the rest of that column is permanently
✗-ed — their hidden cards have left the game — and the player leaves
the ring. Showing no cards on the way out is legal. If the leaver was
the last live opponent, the message says so and the game is over. A
player quitting cleanly on their own turn ends that turn.

**`removeFromRing(col)`.** Takes a player out of the ring with the
turn-pointer care that costs the most thought: a quit on somebody
else's turn must not move the turn along, and the pointer must never
come to rest on a 😢 player.

**`newGame(keepPlayers, keepDeck)`.** A confirmed New Game. It
rebuilds the whole state fresh and lays back only what the two choices
keep:

- **The seats,** if Same Players.
- **The deck,** if Same Deck.
- **The counts' numbers, but only when both are kept.** The numbers
  belong to the group and its deck rather than to the deal — the same
  people playing the same deck put the same number of cards in the
  same places, and that is knowledge no guess can reach. Either choice
  taken New clears them, because a changed seating or deck describes a
  game the old counts no longer fit.
- **The settled flag never carries** (Patrick, Y-23, correcting
  Y-22). The numbers come back filled in, but the counts window waits
  for Done before the game treats them as answered for — so nothing
  can return from a close and reopen claiming to be answered for.
- **The hand never carries.** A fresh shuffle really does put
  different cards in it.

There is no game-over guard here. New Game is the one door out of an
ended game.

## M. The log's words

The engine words the log; the packaging paints it. **Wording law:
players by name, and the person playing is "you", never "Me".**

**`sayName(name)`.** Turns "Me" into "You" and leaves every other name
alone.

**`line(text, highlight)`.** Builds one detail line, with a highlight
flag for the lines the log must call attention to.

**`wordEntry(e)`.** Words one log entry into a title and its detail
lines, labelled with its kind so the packaging can style one block per
kind. Seven kinds: the turn, the pass, the accusation, the ∑ change,
the 🏠 board mark, the quit, and the undo. The undo entry is the one
that uses the highlight flag, on each hidden ! the wipe brought back.

**`nowLine()`.** The live "Now" line — the game's present moment in
one sentence, or null when no game is running. It reports the four
endings and, short of those, whether the table is waiting on a Next,
waiting for someone to show, or waiting on whoever's turn it is.

**`logView()`.** Everything the log page needs in one object: the Now
line, the shared empty-state sentence, and the entries newest first.
**This is the packaging's only door to the log.**

## N. Saving and waking

**`hasStorage()`.** Whether `localStorage` exists at all. Where it
does not, saving and loading quietly do nothing rather than failing.

**`save()`.** Writes the whole state under `mctsGame`, wrapped with
its schema number. Every committing function in the engine calls it,
so there is no separate "save now" for the packaging to remember. In
the phone wrapper the native side mirrors `localStorage` on its own;
the engine simply writes.

**`boot()`.** Reads the snapshot back at start-up, if one exists.
Missing fields take their defaults, because the state is laid over a
fresh one — so a snapshot written by an older build still loads. A
wrong schema number or unreadable data is ignored and the app starts
fresh.

## O. The test door

**`inspect()`.** Hands back a deep copy of the whole state: read
anything, break nothing.

**`testing`.** The harness's way in, and the visual driver's way to
walk the real app into any state. It carries `reset(fields)` for
building a scenario on top of fresh defaults, `setTurn(turn)`,
`useStorageKey(key)` and `useDeckKey(key)` so tests never touch the
real saved game, and direct handles on `placeMark` and `wipeTurn`.

---

## Things that hold across the whole engine

- **Only the engine places marks.** `placeMark` is private, and every
  mark in the app arrives through it.
- **Every function that changes something saves.** The packaging never
  has to.
- **Every refusal speaks.** A guard that stops something emits a
  `status` of kind `'warning'` and reports its refusal to the caller.
- **Setup is closed while a game runs.** Every Setup door tests
  `setupClosed()` first, and New Game is the only way back.
- **`gameOverGuard()` comes first.** Nearly every door calls it before
  anything else, which is what makes an ending a freeze rather than a
  message.
- **Deck order is the order of everything.** Every card list the
  engine hands out is filtered through `allCards()` so it comes back
  in deck order.
- **One guard is kept although nothing can reach it today**
  (Patrick, Y-29). `undoTap()`'s "Nothing to undo" cannot fire from
  the phone page, whose Undo button is dim and dead in exactly that
  moment, as family O of Part Two sets out. It stays because the
  reason is the page's and not the engine's, and the Android leg and
  the web rebuild will each bring their own buttons. **The heart never
  relies on a packaging to protect it.**

---

# Part Two — the phone page (`mystery-phone.html`)

## How to read this part

The families below follow the file's own order and its own section
banners, top to bottom — the head's styles first, then the markup,
then the page's own script. Part One's families are lettered A
through O and this part's begin again at A, so a letter is never
said without the part it belongs to.

Much of what this part describes sits in markup rather than in
functions, so a window is described where its functions live, and
the two are read together.

**The page decides nothing.** Every rule, every refusal and every
mark belongs to the engine. This file draws what it is told, opens
the windows the engine's roads name, and keeps three small things
of its own.

## What the page is responsible for

- **Drawing** — the Setup screen, the game grid, the two bars, and
  the three side pages.
- **The windows** — thirteen of them, opened and closed here, each
  handing its one commit to the engine.
- **The two-tap confirms** — every one belongs to a button on this
  page, never to the engine.
- **Its own three things** — the theme, the notepad, and the
  column order.

## The head, before anything runs

- **The portrait lock.** In landscape every child of the body is
  hidden behind one sentence asking for the phone to be turned
  back upright.
- **Six bundled font faces** — three of Lora and three of Playfair
  Display, loaded from `static/fonts/`, so the page needs no
  network.
- **The two palettes**, `.theme-dark` and `.theme-light`, copied
  from `docs/palettes-tuned.css`, the ruling record. Every color on
  the page is a named variable from these two blocks and nothing is
  hard-coded outside them.
- **The stylesheet**, under its own banners, in the same order as
  the markup below it.

## The hooks, and what each is wired to

All seven the engine offers are supplied, in one call at the foot
of the file:

| Hook | Wired to |
| --- | --- |
| `setupChanged` | `renderSetup` |
| `status` | `showStatus` |
| `cellChanged` | `paintCell` |
| `sumChanged` | `paintSum` |
| `houseChanged` | `paintHouse` |
| `turnChanged` | `onTurnChanged` |
| `logChanged` | a small function that repaints the Log page, but only while the Log is the screen showing |

## The five screens

One frame shows at a time. The app header sits outside them all
and is always there.

- **`screenSetup`** — the seats, the deck, the hand, and ▶ Play.
- **`screenGame`** — the two bars and the grid.
- **`screenLog`** — the turn log.
- **`screenNotes`** — the notepad.
- **`screenGuide`** — the Player Guide, markup only.

## The thirteen windows

Each is a backdrop holding one modal, shown by adding `open`:

| Id | What it is |
| --- | --- |
| `modalSeat` | one seat's name and its "This is Me" box |
| `modalEditCards` | a category's name and all its cards |
| `modalSaveDeck` | naming a deck to save |
| `modalDeckAction` | Load or Delete one saved deck |
| `modalCounts` | "Where are the cards?" |
| `modalShownMe` | which card was shown to me |
| `modalIShowed` | which card I showed |
| `modalSum` | the ∑ picker |
| `modalNote` | a cell's four-character note |
| `modalAccuse` | the accusation, all three steps |
| `modalPlayerOut` | the 👋 quit, both steps |
| `modalNewGame` | the two Same-or-New choices |
| `modalFeedback` | the feedback form behind the Guide |

## Where the page writes

Three keys of its own, all separate from the engine's two:

- **`mctsTheme`** — dark or light.
- **`mctsNotes`** — the notepad's text.
- **`mctsColOrder`** — the grid's column order.

In the iOS wrapper all five keys are mirrored to the native side by
the storage bridge in family A.

## What the page keeps outside the engine's state

None of it is saved; all of it is gone when the page closes.

- `twoTapState` — which buttons are armed, and their timers.
- `statusTokens` — one counter per status outlet.
- `gameStatusLive` — whether a message is holding the hint line.
- `grid` — the built table's element maps, null until a game shows.
- `colOrder` — the display order of the eight movable columns.
- `dragTapSwallow` — eats the click a finished drag leaves behind.
- `editingSeat`, `editingCat`, `deckIdx` — which one a window is
  working on.
- `countHouse` and `countPlayers` — the counts window's working
  numbers, before Done.
- `showPick` — the card picked in whichever show picker is open.
- `sumCard`, `noteCard` and `noteCol` — which cell those two
  windows are on.
- `accuseCol` and `accusePicks` — the accusation being built.
- `outCol` and `outCards` — the quit being built.
- `ngPicks` — the New Game window's two answers.
- `feedbackQ1` — the feedback form's first answer.

---

## A. The wrapper's storage bridge

**One unnamed function, run before the engine loads.** Inside the
iOS wrapper the system can reclaim the web view's `localStorage`
under storage pressure, so the native side keeps a mirror. This
block wraps `setItem` and `removeItem` so every write is also
posted to the native side, and posts a full copy of everything
already stored at each launch. At the next launch the wrapper
injects the mirror back before any script runs.

In a plain browser the bridge is simply not there and the block
returns at its first line, having done nothing. It is loaded ahead
of the engine so that even the engine's first write is mirrored.

## B. The theme

The choice is packaging state under `mctsTheme`; dark is the
first-launch default, and the button shows the theme a tap would
switch to.

**`applyTheme(name)`.** Swaps `theme-dark` for `theme-light` on the
body, sets both theme buttons' glyph — ☀ while dark, 🌙 while light
— and saves the choice.

**`toggleTheme()`.** Reads which class the body is wearing and
applies the other. It is wired to the button on the Setup screen's
STEP 1 – PLAYERS line and to the one in the turn bar, which are the
same button in two places.

## C. The screens

**`showScreen(id)`.** Takes `active` off every screen and puts it
on the named one, then settles what belongs to that screen:

- ▶ Play shows on Setup alone.
- New and Out show on the Game screen alone.
- Setup refreshes the Play gate as it opens.
- The Log paints itself, the Notepad loads itself, and all three
  side pages dim the return that does not lead to the live page.

## D. The side pages, and the feedback window

**`refreshPanelFoot()`.** Each side page carries two returns, ←
Setup and Game →, and only the one leading to the live page is
awake: the Game screen while a game is running, Setup otherwise.

**`renderLogPage()`.** Paints `Engine.logView()` — the Now line
first when there is one, then either the shared empty sentence or
one block per entry, each with its title and its lines, a
highlighted line wearing the notice color. The engine words all of
it; this only draws.

**`copyLog()`.** Turns the same view into plain text. In the
wrapper it hands the text to the native clipboard bridge, because
the modern clipboard needs a secure context and a `file://` page is
not one; a plain browser uses the modern way. An empty log says
"Nothing to copy" instead.

**The notepad** is packaging state under `mctsNotes`.
`saveNotes()` writes on every keystroke, `loadNotes()` reads it
back as the page opens, and `clearNotes()` — behind a two-tap
Clear — empties the box, drops the key, and then hides and
re-shows the pad to force a full repaint, because the web view can
leave a half-drawn placeholder when the pad is emptied by code
rather than by typing.

**The Guide is markup only,** with no function of its own. Its
words were carried over whole at Y-13 and await their own
rewording session.

**The feedback window** sits behind the Guide's 💬 Suggest button.
`openFeedback()` clears the four answers and puts the rating back
to the middle; `setFeedback(val)` records the first answer and
shows the pick by opacity alone; `submitFeedback()` builds a
`mailto:` carrying all five answers, which the wrapper hands to
iOS. **The email stays numbered on purpose** though the window's
own questions lost their numbers at Y-27.

## E. The windows, and the two-tap confirm

**`openModal(id)` and `closeModal(id)`.** Add and remove `open` on
the backdrop, and nothing else. Closing a window without confirming
needs no engine call, because nothing lands until the confirm.

**`twoTap(id, btn, action, confirmLabel, resetMs)`.** The one
confirming mechanism on the page. The first tap freezes the
button's width so the shorter label cannot shift its neighbours
mid-tap, remembers the original label, shows "Sure?", turns the
button the delete color, says "Tap again to confirm", and starts a
three-second timer that puts all of it back. A second tap inside
that window clears the timer, restores the label and runs the
action.

**Everything that fires through it:** Undo, correcting a
mis-tapped shower, a ⭐ that would crowd its category, deleting a
category, loading or deleting a saved deck, the accusation's Yes
and its No, Remove Player, Start New Game, and the notepad's
Clear.

## F. The status renderer

The engine's `status` hook lands in **`showStatus(msg, kind)`**,
which puts one message into every outlet at once, since a window
covers whatever screen is behind it:

- the Setup screen's strip, which covers its footer while a message
  shows;
- the Log page's strip over its own footer;
- the Notepad's slot in its head;
- the Game screen's stage-bar hint line;
- and the open window's own reserved message line, if one is open.

**`renderStatus(el, msg, key, onCleared)`.** Draws the words into a
span and, one frame later, measures them. A message wider than its
slot scrolls across it — hold, scroll slowly, hold — for somewhere
between three and ten seconds by how far it overruns; one that fits
sits five seconds. `statusTokens` carries a counter per outlet, so
a newer message cancels the older one's timer rather than fighting
it.

**The Game screen's outlet is the only one that owes something
back.** When its message clears, the phase's resting direction
returns to the hint line, and `gameStatusLive` keeps an ordinary
repaint from stepping on a message while it is up.

A warning wears the warn color; a plain direction wears the
outlet's own.

## G. Setup's painting

**`renderSetup()`.** The whole Setup screen in one call — the
seats, the saved-deck chips, the card picker, the counts button's
settled look, and the Play gate. **This is what the `setupChanged`
hook runs,** so every Setup change in the engine repaints the lot.

**`seatedSlots(s)`.** The page's own reading of which seats are
dealt in — the Me seat and every seat with a typed name. It mirrors
the engine's private one of the same name, because the counts
window needs the list before anything is committed.

**`renderSeats(s)`.** Six boxes, each labelled "Seat 1" through
"Seat 6" and showing "Me", the typed name, or a dash. The Me seat
wears the me colors and a named seat its own border. A tap opens
the seat window. The six sit two rows of three (Y-22).

**`renderCardPicker(s)`.** One section per category: its banner
carrying the name and the card count and a Rename → Edit button,
then a chip per card. A chip for a card in the Me hand wears the
picked colors, and a tap calls `Engine.toggleMyCard`. Below the
last category, ＋ Add Category shows while there are fewer than
four.

**`renderDeckBar()`.** A chip per saved deck; a tap opens the
deck-action window.

**The counts button wears the card chips' picked colors when the
counts are entered** (Patrick, Y-22), so a settled answer looks the
same everywhere and no new color name was needed.

**`refreshPlay()`.** Dims ▶ Play while a game is running or while
`Engine.setupUnmet()` still names something. **The engine's gate
does all the deciding; the button only dims and brightens.**

**`tryPlay()`.** Calls `Engine.play()` and shows the Game screen
when it starts. A refusal speaks the gate's own sentence and the
screen does not change.

## H. Setup's four windows

**The seat window.** `openSeat(i)` fills the name box and the "This
is Me" box from the state and puts the cursor in the box;
`toggleMeCheck()` flips the checkbox and empties the name when it
is checked, since Me carries no typed name; `clearSeatInput()`
empties both; `confirmSeat()` hands both to `Engine.setSeat` and
closes.

**The deck-edit window.** `openEditCards(ci)` builds a row per card
and puts the category name in its own box, and it disarms the
delete two-tap left over from the window's last visit. **A name the
app supplied itself — "Category 3", "Card 12" — shows as a grey
placeholder in an empty box rather than as text,** so the player
types over nothing and a box left blank keeps the name it had.

- `makeCardRow(card)` builds one row: a name box capped at thirteen
  characters and a red ✕ that removes the row on the spot.
- `addCardRow()` adds an empty row and puts the cursor in it.
- `deleteCategoryTap(btn)` is the two-tap on the category's own ✕,
  which closes the window if the engine allows the delete.
- `saveCategoryEdit()` collects every surviving row as
  `{ orig, name }`, falling back to the placeholder for a blank
  box, and hands the whole set to `Engine.editCategory`. **The
  window closes only if the engine accepts it,** so a refused edit
  stays on screen with its refusal spoken.

**The save-deck window.** `openSaveDeck()` empties the name box;
`confirmSaveDeck()` hands it to `Engine.saveDeck` and closes on
success.

**The saved-deck window.** `openDeckAction(i)` names the deck and
disarms both two-taps; `confirmLoadDeck()` and
`confirmDeleteDeck()` are what those two-taps run.

**The counts window, "Where are the cards?".**

- `openCounts()` refuses with "Fill the seats first" when no seat
  is taken. **It opens on the numbers the state is carrying
  whenever there are any** — a game's settled counts, or the
  numbers a New Game brought over — and only a first game, with
  every number still at zero, opens on `Engine.countsDefault()`'s
  guess.
- `renderCountRows()` draws the Envelope row first as a stated
  fact, its steppers hidden but still holding the row's shape so
  the numbers line up, then House, then a row per seated player.
- `stepCount(kind, slot, delta)` moves one number by one, held
  between zero and the dealt total. Moving House re-splits the
  players through `Engine.countsPrefill`, so the window always
  offers a whole answer.
- `confirmCounts()` hands both to `Engine.setCounts`. **Only that
  Done makes the counts count as answered for** (Y-23).

Numbers are given by tap alone — the − and ＋ steppers, never the
phone keyboard (Patrick, Y-7).

## I. The grid's painting

**`SYM`.** The five marks and how each is drawn: ✓, ✗, ?, ! and Me.

**`grid`.** The built table's element maps — the six headers, every
cell by card and column, the ∑ and 🏠 cells and their headers, the
card list in order, and the shape signature. It is null until a
game is showing.

**`gridSignature(s)`.** One line naming the game's shape: the
categories, the ring, the seat names and the Me seat. When it
changes the table is rebuilt; when it does not, the table is
repainted in place.

**`askerColNow(s)`.** Whose column wears the asker color right now
— nobody once the game has ended, otherwise the recorded asker, or
the seat whose turn it is.

**`gameIsOver(s)`.** The painting's own reading of an ending: a
verdict landed, or no live opponent left. **It is a mirror of the
engine's `isGameOver`, not a second opinion** — the engine guards
its own doors, and this only steers what gets drawn.

**`buildGrid()`.** Builds the whole table once per game shape:

- The pinned name row — the fixed CARDS corner, then every movable
  header in the saved column order. Each header is its column's
  drag handle, and the six player headers are tap targets as well.
- A banner row per category, then a row per card, each row's cells
  laid in the same saved order.
- Then it paints everything: the headers, every cell, the ∑ and 🏠
  columns, the turn bar and the stage bar.

**`paintHeaders(s)`.** Me green, the asker blue, a 👋 quit and a 😢
wrong accuser both gold with their own mark, an empty seat faded
with a dash. **Being out outranks being the asker** — a player
sidelined while still the recorded asker wears the 😢.

**`paintCell(card, col, s)`.** One cell, entirely from
`Engine.visibleMarks`: the ground first — the Me column, a dead
column, or the picked look while the cell is in the standing ask —
then the ✓ or ✗ wash, then the marks themselves, then the note in
the bottom-right corner. **This is what the `cellChanged` hook
runs.**

**`paintSum(card)` and `paintHouse(card)`.** The ∑ cell's ⭐ or ✕,
and the 🏠 cell's ✓. Both read straight from the state.

**`paintTurnBar(s)`.** The turn line — "Turn 3 — Kate is thinking
🤔" while the asker picks, "is waiting ⏳" while a shower is sought,
"showed ✓" once one is named, and the same worded to you as "you
are". **At an ending the bar says so in the turn text's place:**
your own win in bigger letters with the breathing glow, an
opponent's win in the same letters without it, and the two losses
quietly.

**`onTurnChanged()`.** The `turnChanged` hook, and the busiest
painter. With no game it drops the grid and empties the wrap. With
a changed shape it rebuilds. Otherwise it repaints the headers, the
turn bar, the stage bar and **every cell** — because the picked
look follows the standing ask, which can change without any
`cellChanged` report of its own.

## J. The column drag

The eight movable columns — ∑, 🏠 and the six players — reorder by
a hard press and drag on their header. **Only the Card column keeps
its place.** The order is packaging state under `mctsColOrder`.

**The default is ∑ and 🏠 in close beside the cards, the players
following them** (Patrick, Y-23). It is read back at load and
accepted only if it is an array of the right length holding exactly
the same eight tokens; anything else falls back to the default.
**Once a column has been dragged the saved order wins, and nothing
ever puts the default back** — it is the player's own arrangement
from then on.

**`wireColumnDrag(th, tok)`.** The press-and-drag wiring, one
header at a time. A quick tap passes straight through. A press held
450 milliseconds lifts the column and outlines it; a finger that
drifts more than eight pixels before the hold lands is a scroll and
cancels the press. While dragging, the column's cells slide with
the finger, and crossing onto a neighbour trades seats with it at
once, the anchor resetting so the column rests where the finger is.
Letting go saves the order and sets `dragTapSwallow` for four
tenths of a second, **so the click a finished drag leaves behind is
not read as a header tap.**

**`columnCells(tok)`.** A column's header and every cell beneath
it, header first.

**`applyColOrder()`.** Re-seats every movable cell by appending
column by column, left to right — appending a live node moves it —
so each row lands in the new order with the fixed Card cell
untouched at its front.

**`seatUnderFinger(x, dragTok)`.** Which seat in the order the
finger is over, judged by the headers' live places on screen.

**`saveColOrder()`.** Writes the order back.

## K. The tap routing

**`nameOf(s, col)` and `phraseOf(s, col)`.** The page's own small
namings — "Me" and "your column" — matching the engine's `pName`
and `columnPhrase`, so a window and a status line never disagree
about what to call somebody.

**`onCellTap(card, col)`.** Hands the tap to `Engine.cellTap` and
opens the note window when the engine hands it back. **The note
editor is what a tap means whenever the engine has no use for it**
— the road out of `cellTap` named in Part One, family H.

**`onHeaderTap(col)`.** Hands the tap to `Engine.headerTap` and
follows the road it names:

- `'shownme'` — open the shown-to-me picker with the cards given.
- `'ishowed'` — open the I-showed picker with the cards given.
- `'correct'` — arm a two-tap on that same header, then call
  `Engine.correctShower`.
- `'refused'` and `'marked'` — do nothing. The engine has already
  spoken, or has already committed and reported.

**Next ▶ calls `Engine.nextTap` directly.** Undo is a two-tap on
its own button and then `Engine.undoTap` — **the engine never sees
an unconfirmed Undo.**

## L. The two show pickers

**`showPick`.** One selection variable serves both pickers, since
only one is ever open.

**`fillPickList(listId, cards)`.** Clears the pick and builds a
button per card, tapping one selecting it alone.

**`openShownMe(showerCol, cards)`.** Titles the window "Kate shows
you…" and fills its list.

**`confirmShownMePick()`.** Calls `Engine.confirmShownMe`, then
closes **only once the phase has moved off showing** — so a refusal
leaves the picker standing with its refusal on the window's own
message line.

**`openIShowed(askerCol, cards)`.** Titles it "You show Kate…".
**When there is only one card I could have shown, it arrives
already selected,** so Confirm is a single tap.

**`confirmIShowedPick()`.** The same shape as the other confirm.

Cancel and Close need no engine call at either picker.

## M. The ∑ picker and the note window

**`openSum(card)`.** Titles the window with the card, shows the
mark already there as selected, and disarms the ⭐ two-tap from the
window's last visit.

**`sumPick(value)`.** Commits ✕, ⭐, or a clear through
`Engine.sumCommit`, and closes when the engine takes it.

**`sumStarTap(btn)`.** A ⭐ that would not crowd its category lands
at once. One that would arms a "Sure?" two-tap **and speaks the
engine's warning as it arms,** so the second tap is made knowing
what it means. The warning is advice, not a refusal — the star
still lands.

**`openNote(card, col)`.** Names the cell — the card and whose
column — fills the box with the note already there, and puts the
cursor in it.

**`confirmNote()`.** Hands up to four characters to
`Engine.setCellNote`. An empty box clears the note rather than
storing a blank one.

## N. The three endings windows

**`endedGuard(s)`.** A window asked to open after the game has
ended does not open; it speaks the engine's own game-over sentence
instead. Both the accusation and the Player Out window call it
first.

**`resetTwoTaps(ids)`.** Disarms whatever a window left armed on
its last visit, so nothing opens half-confirmed.

**The ⭐ accusation window** runs in three steps in the one window.

- `openAccuse()` lists every player in the ring, a 😢 one shown
  with its mark and refused by name if tapped. Picking an accuser
  builds the card list and wakes the verdict question — "Are you
  right?" for your own accusation, "Are they right?" for anyone
  else's.
- `buildAccuseCards(s)` lists the cards under their category
  headings and names how many are wanted. A second pick in one
  category swaps out the first.
- `refreshAccuseVerdict(s)` brightens Yes and No once an accuser
  and a full set of cards are picked.
- `accuseVerdict(result, btn)` **still speaks the refusal in words
  when a dim button is tapped** — dim guides, it does not silence —
  and otherwise fires the two-tap into `Engine.accuse`. No verdict
  can be undone, which is why it is confirmed twice.

**The Player Out window** runs in two steps.

- `openPlayerOut()` lists every active player but Me, says so
  plainly when there is nobody eligible, and leaves 👋 Quits dim
  until somebody is picked.
- `quitShowTap()` opens the shown-cards picker from
  `Engine.playerOutCards`. **A card already ✓-held in another
  column comes back faded and dead with its holder named** — it
  cannot be in two hands. Picking none is legal.
- `outRemoveTap(btn)` fires the two-tap into `Engine.playerOut`,
  which commits the permanent marks.

**The New Game window.** `openNewGame()` clears both choices;
`setNgPick(kind, val)` records one and shows it by opacity;
`updateNgStart()` brightens Start once both are answered; and
`ngStartTap(btn)` fires the two-tap into `Engine.newGame`, then
closes the window, repaints Setup and shows it.

## O. The stage bar

**`restingHint(s)`.** What the hint line says when nothing else is
using it:

- asking — "Select 3 cards in Kate's column", counted from the
  categories that have cards;
- showing — "Tap the name of who showed — or Next ▶";
- waiting — "Tap Next ▶ to continue";
- and nothing at all at an ending, where the hint sleeps.

**`paintStage(s)`.** Dims Undo and takes its taps away at turn
one's clean start and at every ending, then restores the resting
hint unless a status message is holding the line.

**"Nothing to undo" can never fire, and this is why.** The engine
refuses an Undo when the turn count is one, the phase is asking and
no cards are picked. `paintStage` dims the button and sets its taps
dead on those same three conditions. Both roads that empty the
picks — unpicking a card in the asker's column, and taking a pick
back while a shower is sought — report a turn change, which runs
`paintStage` again. So the button is dead in exactly the moment the
sentence would be spoken.

## P. Boot

The foot of the file, in the order it runs:

- Connect the seven hooks.
- `Engine.boot()` — the saved game comes back, if there is one.
- `renderSetup()` — the Setup screen is painted either way.
- Wire Next ▶ to `Engine.nextTap`, and Undo to its two-tap.
- Build the grid and show the Game screen if a game was in
  progress; otherwise show Setup.
- Apply the saved theme, defaulting to dark.

**The theme is applied last on purpose,** the body carrying the
dark class from the markup so the page is never briefly unpainted.

---

## Things that hold across the whole page

- **The page never decides.** Every rule, refusal and mark belongs
  to the engine; this file draws what it is told and opens the
  windows the engine's roads name.
- **Every two-tap confirm belongs to a button here.** The engine
  sees only the confirmed tap.
- **Nothing lands until a confirm,** and closing a window without
  one needs no engine call.
- **The page saves only its own three keys.** The engine saves
  itself, so no painter ever has to remember to.
- **Every color is a named variable** from the two palette blocks;
  nothing is hard-coded outside them.
- **One owner per line in the grid.** Every cell draws only its own
  right and bottom line and the table does not collapse, so no two
  cells share a line for a dense screen to round two different
  ways. The stage bar owns the top edge, the card column closes the
  left, and the category banners draw the line beneath themselves.
  Adding a border back to a cell whose neighbour already draws that
  line is what doubles it on the phone.
- **A refusal leaves its window standing.** Every window closes on
  the engine's yes and stays open on its no, so the refusal is read
  where it happened.
- **The Guide's words are the one body of text on this page that
  has not been through a wording pass** (Y-12), and they have
  drifted from the app in several places.
