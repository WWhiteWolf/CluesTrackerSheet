# Message map — every sentence the app says to the player

Every sentence the app says, the place it lives, and one sentence
saying what puts it on screen.

**It carries no line numbers, on purpose (Patrick, Y-27).** A number is
a position rather than a name, so it shifts the moment anything above
it is edited. This map was rebuilt at Y-30 around names instead: each
entry points at the function that speaks the sentence, or — where the
words sit in markup rather than in code — at the window or screen box
they sit in. Every name here also appears in `docs-ref/function-map.md`,
which says what each one does.

**The names were found by reading, not by guessing.** A script located
every message in both files and named the function enclosing it, so no
pointer in this map rests on an assumption.

## How to read a pointer

- **engine — `saveDeck`** means the sentence is spoken by that function
  in `mystery-engine.js`.
- **phone page — `openCounts`** means the sentence is spoken by that
  function in `mystery-phone.html`.
- **phone page — `modalCounts`** means the words sit in the markup,
  inside that window box. The five screen boxes and the thirteen window
  boxes are listed in Part Two of the function map.

**Two things to know before reading.**

The engine never draws. It hands its words to the page through the
`status` hook, wired to `showStatus` at the foot of the page, and the
page paints them. A **warning** paints in the alert color; a
**direction** paints in the ordinary one. Both go to the same place —
on the Game screen that is the stage bar's hint line, and on Setup and
the side pages it is that screen's own status strip. An open window
also gets the message on its own reserved line.

Some sentences exist **twice**, once in the page and once in the
engine, because the page refuses a wrong move at the front door and the
engine refuses it again at the back. Those pairs are marked **[PAIR]**,
each half naming its own function, and they have to be changed
together.

**The Player Guide is deliberately not in this map.** It is the
`screenGuide` box, markup only, and it is its own session (Y-12).

## What a message is for (Patrick, Y-26)

A message earns its place one of two ways. It tells you at a glance
where the game stands when you look up — after stepping away, or after
breaking off to check something else. Or it tells you why something you
just tried was refused.

The division is by **when** a message speaks, not by what it says. A
line that sits waiting on the stage bar — the three resting directions
in section 5 — is doing the at-a-glance job even though it reads like
an instruction. Patrick's own experience of running three- and
four-hundred-step test procedures is that those are exactly what let
him find his place again. A line that fires *after* a move has been
made, to restate a rule the player has already followed, is the
repetitive kind. That is what the Undo line was, and why it went.

The two kinds are easiest to tell apart side by side, both firing after
the player acts. **`Select 3 cards in Ann's column first`** — engine
`headerTap` — earns its place: you tapped a player's header, nothing
happened, and this is why. **"∑ and Player Out marks not undone."** —
the removed line in `undoTap` — did not: the Undo worked exactly as
asked, and the line only restated a rule the player had already
followed. Wording that looks like an instruction is not the test.
Whether the player is owed an answer is.

Teaching how to play is not a message's job. A player either knows, or
reads the Player Guide.

**None of this is carved in stone** (Patrick, Y-26). It is a standard
to judge by, applied with flexibility and common sense — not a rule to
be followed off a cliff.

---

## 1. The Setup screen

**"At least one category is needed"** — engine — `deleteCategory`,
warning.
Tapping the ✕ beside a category name when only one category is left.

**"Maximum 30 cards total — the deck is full"** — engine —
`editCategory`, warning.
Tapping Save in the Edit Cards window when the deck would end up over
thirty cards.

**`Duplicate card name: "Rope"`** — engine — `editCategory`, warning.
Tapping Save in the Edit Cards window with a card name already used
anywhere else in the deck.

**"Fill the seats first"** — phone page — `openCounts`, warning.
Tapping "Where are the cards?" before any seat is named or marked Me.

### Fixed text on the Setup screen

- **"STEP 1 - PLAYERS"** and **"STEP 2 - CARDS"** — phone page — `screenSetup`, the two section labels.
- **"Seat 1"** … **"Seat 6"** — phone page — `renderSeats`, the small label on each seat.
- **"Me"**, or the player's name, or **"—"** for an empty seat — phone page — `renderSeats`, the large line on each seat.
- **"— Category 1 (9) —"** — phone page — `renderCardPicker`, each category's banner in the card picker, with its card count.
- **"Rename → Edit"** — phone page — `renderCardPicker`, the button on each category banner.
- **"＋ Add Category (up to 4)"** — phone page — `renderCardPicker`, below the last category, hidden once four exist.
- **"💾 Save Card Deck"** and **"Where are the cards?"** — phone page — `screenSetup`, the two Setup buttons.
- **"▶ Play"** — phone page — the app header, which sits outside every screen box; `showScreen` shows it on Setup alone and `refreshPlay` dims and brightens it. It never speaks for itself.

---

## 2. The Play gate

All seven sentences are worded in one place, engine — `setupUnmet`.
Only the first unmet one is ever spoken, and engine — `play` emits it
as a warning when ▶ Play is tapped while Setup is incomplete. The page
calls the same function to dim the button, silently, in
`refreshPlay`.

All seven were reworded at Y-26. They formerly began **"Play needs:"**
and read as a checklist; they now begin **"You need to"** and speak to
the player.

- **"You need to mark one of the seats as Me before you can play"** — no seat is marked Me.
- **"You need to have at least two players, counting yourself"** — fewer than two seats are filled.
- **"You need to have at least two categories with cards in them"** — fewer than two categories hold any cards.
- **`You need to have at least three cards in Weapons`** — some category with cards holds fewer than three.
- **"You need to have at least twelve cards in your deck"** — the whole deck is under twelve cards.
- **`You need to enter the card counts — tap "Where are the cards?"`** — the counts window has never been finished with Done.
- **`You need to tap 3 cards as yours — you have tapped 2`** — the number of cards tapped as yours does not match the number entered for your seat. It formerly trailed off into a parenthesis, `(2 of 3)`, and now names both numbers in the sentence; note that the two numbers changed places with the rewording.

---

## 3. The counts window — "Where are the cards?"

**"The number of cards entered does not equal the number of cards in
your deck"** — engine — `setCounts`, warning. Tapping Done when the
House number and the players' numbers do not add up exactly to the deck
minus the solution envelope. Reworded at Y-26; it formerly counted the
number live and read `All 18 cards outside the envelope are not
entered.`

### Fixed text in the window

- **"Where are the cards?"** — phone page — `modalCounts`, the window's title.
- **"Envelope"** — phone page — `renderCountRows`, the first row, a stated fact with its steppers hidden.
- **"House"** — phone page — `renderCountRows`, the second row.
- **"Me"**, or each player's name — phone page — `renderCountRows`, one row per seated player.
- **"Cancel"** and **"Done"** — phone page — `modalCounts`.

---

## 4. Saved decks

**"Enter a deck name first"** — engine — `saveDeck`, warning.
Tapping Save in the Save Card Deck window with the name box empty.

**"Maximum 4 saved decks — delete one first"** — engine — `saveDeck`,
warning.
Tapping Save when four decks are already stored.

**"That name is already used"** — engine — `saveDeck`, warning.
Tapping Save with a name another saved deck already carries.

**`Deck "Cluedo" saved`** — engine — `saveDeck`, direction.
A deck saves successfully.

**`Loaded "Cluedo"`** — engine — `loadDeck`, direction.
A saved deck is loaded through the Load button's second tap.

**`Deck "Cluedo" deleted`** — engine — `deleteDeck`, direction.
A saved deck is deleted through the Delete button's second tap.

### Fixed text

- **"💾 Save Card Deck"** — phone page — `modalSaveDeck`, the save window's title.
- **"Saved Deck"** — phone page — `modalDeckAction`, the chip-tap window's title, with the deck's name in quotes below it, filled by `openDeckAction`.
- **"Delete"** and **"Load"** — phone page — `modalDeckAction`, both two-tap buttons, armed by `openDeckAction`.

---

## 5. Playing a turn — the stage bar

The hint line rests on one of three standing directions and borrows its
slot to any message, returning to the resting one when the message
clears.

### The three resting directions

All three are worded in one place, phone page — `restingHint`, and put
on the line by `paintStage`.

**`Select 3 cards in Ann's column`**
Rests through the whole asking phase.

**"Tap the name of who showed — or Next ▶"**
Rests once all the asked cards are picked and a shower is being waited
for.

**"Tap Next ▶ to continue"**
Rests after a show has landed, waiting for Next. **[PAIR]** — the
engine says the same words in `headerTap`.

### The countdown

**`1/3 — need: Weapons, Rooms`** — engine — `askProgressStatus`,
direction.
Naming each category still missing a card while the ask is incomplete.

**It is one sentence in one place, reached down two roads.** `askingTap`
calls it after every card tap in the asker's column, and `takeBack`
calls it when a pick is taken back during the showing phase. The
earlier map recorded it twice, at two line numbers, which made one
sentence look like two.

### The refusals

**"Select all or none of the cards in your column first"** / **`Select all or none of the cards in Ann's column first`** — engine — `nextTap`, warning.
Tapping Next ▶ during the asking phase with at least one card picked
and the ask unfinished. With no cards picked, Next passes the turn
silently instead. Reworded at Y-26; it formerly named the number and
read `Select 3 or 0 cards in Ann's column first`.

**`Select 3 cards in Ann's column first`** — engine — `headerTap`,
warning.
Tapping any player's column header during the asking phase, whatever is
or is not picked.

**`Kate has quit — they can't show`** — engine — `headerTap`, warning.
Tapping the header of a player who has left the game.

**"You are asking — you cannot also show"** / **`Kate is asking — cannot also show`** — engine — `headerTap`, warning.
Tapping the asker's own header as though they could show.

**`You have ❌ on all 3 asked cards — you cannot show`** / **`Kate has ❌ on all 3 asked cards — cannot show`** — engine — `headerTap`, warning.
Tapping the header of a player already crossed off every asked card.

**"You must show first — you have a confirmed card"** / **`Kate must show first — they have a confirmed card`** — engine — `mustShowFirstLine`, warning.
Tapping a header that sits later in the ring than someone who is known
to hold one of the asked cards. The same refusal fires again when
Next ▶ is used to say nobody showed while that same player is known to
hold one.

**The sentence lives in one place now** (Patrick, Y-27). It used to be
typed out twice, once in `headerTap` for the header tap and again in
`nobodyShowed` for Next ▶, so a later rewording could have changed one
and missed the other. Both doors now call `mustShowFirstLine(col)`,
which sits beside `mustShowOn` — the test they already shared. The
words did not change; nothing on screen moved.

### After a show

**`Rope — shown by Kate`** — engine — `confirmShownMe`, direction.
Confirming, in the "shows you…" window, which card you were shown.
Reworded at Y-27 (Patrick): it used to read **`Rope — shown`** and
never named who showed it, while its opposite number below always named
who received it. The shower's name was there for the taking all along.

**`Rope — shown to Kate`** — engine — `confirmIShowed`, direction.
Confirming, in the "You show…" window, which card you handed over.

**"Select a card"** — engine — `confirmShownMe` and `confirmIShowed`,
warning.
Tapping Confirm in either show window with nothing picked. The same
four words in two homes, one per picker.

**`Kate's show taken back`** — engine — `correctShower`, direction.
Tapping the shower's own header again and confirming, to undo a
mis-tapped show.

**"No player showed — those cards are ❌-ed out for them"** — engine —
`nobodyShowed`, direction.
Tapping Next ▶ with the ask complete and no shower named. Reworded at
Y-27 (Patrick): it used to read **"Nobody showed — cards are ❌-ed
out"**. "Those cards" points at the ones just asked about, and "for
them" says the part the old line left out — the crossing lands in the
other players' columns and not the asker's. The Turn Log's own line for
the same event still reads **"Nobody showed."** in `wordEntry`, and
Patrick ruled that the two are fine differing: one is a passing
message, the other a permanent record.

### Undo

**"Nothing to undo"** — engine — `undoTap`, warning.
Confirming Undo at turn 1 with nothing yet done.

**It cannot be reached from the phone page** (Y-29). `paintStage` dims
the Undo button and takes its taps away on exactly the three conditions
the engine refuses on. The guard stays anyway, by Patrick's ruling: the
reason it cannot fire belongs to the page, and the heart never relies
on a packaging to protect it.

**A successful Undo now says nothing on the Game screen.** Removed at
Y-26 (Patrick): `undoTap` used to speak **"∑ and Player Out marks not
undone."** as a warning after every Undo, whatever it removed, and
repeating it every time was ruled not worth saying. The Undo is still
recorded in the Turn Log. The ∑ and Player Out marks are still left
standing by an Undo — the app simply no longer says so.

### The turn bar

**`Turn 4 — You are thinking 🤔`** — phone page — `paintTurnBar`, built
from the stage words in the same function. The stage is **"are thinking
🤔"** or **"is thinking 🤔"** while the asker picks, **"are waiting
⏳"** or **"is waiting ⏳"** while a shower is sought, and **"showed
✓"** once one is named.

**"⭐ Accuse"** — phone page — `screenGame`, always present at the
bar's right.

**"↩ Undo"** and **"Next ▶"** — phone page — `screenGame`.

---

## 6. The ∑ and 🏠 columns

**`More than one ⭐ in Weapons`** — worded in engine —
`sumStarWarning`. It is spoken as a warning by engine — `sumCommit`
when a second star is committed in one category, and spoken again by
phone page — `sumStarTap` as the "Sure?" tap is armed, so the second
tap is made knowing what it means.

**`Rope is on the board`** — engine — `houseTap`, direction.
Tapping an empty 🏠 cell. Reworded at Y-27 (Patrick): it used to read
**`Rope seen on the board`**. "Is on the board" states the card's
condition rather than how you came to know it.

**`Rope board mark cleared`** — engine — `houseTap`, direction.
Tapping a 🏠 cell that already carries a ✓. Reworded at Y-27
(Patrick): it used to read **`Rope — board mark cleared`**, and only
the dash went. The mirror-image wording `Rope is off the board` was
weighed and refused, because clearing the cell is often the undoing of
a mis-tap and the app should not declare a fact about the board that
the player never meant to state. Neither of the two lines mentions the
❌s that the mark scatters and the clearing removes; Patrick left that
as it stood.

**The Turn Log was brought into line** at Y-27 — engine — `wordEntry`
now titles a board mark **`Turn 4 — 🏠 Rope is on the board`**,
matching the status line.

### Fixed text in the ∑ window

- **`∑ — Rope`** — phone page — `openSum`, the window's title.
- **"✕ Has card"**, **"⭐ Solution?"** and **"Clear"** — phone page — `modalSum`.

### The cell note window

- **"📝 Cell Note"** — phone page — `modalNote`, the title.
- **`Rope — Kate's column`** — phone page — `openNote`, naming the cell.
- **"Cancel"** and **"Save"** — phone page — `modalNote`.

---

## 7. The accusation

**"Select who is accusing first"** — phone page — `accuseVerdict`,
warning.
Tapping Yes or No before an accuser is picked. **[PAIR]** — engine —
`accuse` says the same words if anything reaches the engine that way.

**`Select the 3 cards accused first`** — phone page — `accuseVerdict`,
warning.
Tapping Yes or No before one card from every category is picked.
**[PAIR]** — engine — `accuse`.

**`Kate is already out on a wrong accusation`** — phone page —
`openAccuse`, warning. Tapping a 😢 player in the accuser list.
**[PAIR]** — engine — `accuse`.

**`Kate's accusation was wrong — game over, you won`** — engine —
`accuse`, direction. A wrong verdict against the last live opponent.

**`Kate's accusation was wrong`** — engine — `accuse`, direction.
A wrong verdict with other opponents still playing.

### Fixed text in the window

- **"⭐ Accusation"** — phone page — `modalAccuse`, the title.
- **"Select Who Is Accusing"** — phone page — `modalAccuse`.
- **`Select the 3 cards accused`** — phone page — `modalAccuse` for the standing direction above the card list, with the number filled in by `buildAccuseCards`.
- **"Are you right?"** / **"Are they right?"** — phone page — `openAccuse`, the verdict question, chosen by whether the accuser is you.
- **"Yes"**, **"No"** and **"Cancel"** — phone page — `modalAccuse`. Yes and No each ask **"Sure?"** first, through `accuseVerdict`.

---

## 8. Player Out

**"Select a player first"** — phone page — `quitShowTap` and
`outRemoveTap`, warning.
Tapping 👋 Quits, or Remove Player, before a player is picked.
**[PAIR]** — engine — `playerOut`.

**"No other active players."** — phone page — `openPlayerOut`.
Opening the window when nobody but you is left in the game.

**`Rope — held by Kate`** — phone page — `quitShowTap`.
Each card in the quit picker that is already confirmed in someone
else's hand; it is faded and cannot be tapped. The holder's name comes
from engine — `playerOutCards`.

**`Kate has left the game`** — engine — `playerOut`, direction.
A quit lands with other players still in the game.

**`Kate has left the game — game over, you won`** — engine —
`playerOut`, direction. A quit lands that empties the table. Reworded
at Y-26 from **`Kate has left the game — game over, you are the only
one left`**, so that all three accounts of this ending — this line, the
turn bar and the Log's Now line — call it a win. The phrase "the only
one left" no longer appears anywhere in the app.

### Fixed text in the window

- **"Player Out"** — phone page — `modalPlayerOut`, the title.
- **"Who is leaving the game?"** — phone page — `modalPlayerOut`.
- **"👋 Quits — cards shown to everyone"** — phone page — `modalPlayerOut`.
- **"Tap Cards They Held"** — phone page — `modalPlayerOut`.
- **"Cancel"** and **"Remove Player"** — phone page — `modalPlayerOut`; Remove Player asks **"Sure?"** first, through `outRemoveTap`.

---

## 9. The game's end, and New Game

**"Game over — tap New to start a new game"** — phone page —
`endedGuard`, warning. Opening the ⭐ Accuse or Out window after the
game has ended. **[PAIR]** — engine — `gameOverGuard`, which says the
same words for any tap that reaches the engine after the ending.

### What the turn bar says at each ending

All four are in phone page — `paintTurnBar`.

- **"⭐ You Won!"** — in the larger letters with the breathing glow. Your own right accusation. Reworded at Y-26 from **"⭐ Game over — you won!"**, and it is now the only place in the app where a ⭐ marks an ending.
- **"Game over — you lost"** — your own wrong accusation.
- **`Game over — Kate won`** — an opponent's right accusation.
- **"Game over — you won"** — every other ending, in practice everyone else having left the table.

### Fixed text in the New Game window

- **"New Game"** — phone page — `modalNewGame`, the title.
- **"Select how you want the Setup to start in the new game."** and
  **"The results of this game will be erased and forgotten. Your notes
  will be kept."** — phone page — `modalNewGame`, two paragraphs styled
  alike. Reworded at Y-27 (Patrick): the window used to open with the
  single line **"Start a new game? All turn data will be cleared."**
  That line taught the app rather than orienting the player — "turn
  data" was a developer's word, "Start a new game?" repeated the
  window's own title, and "all will be cleared" stood directly above
  two choices whose purpose is to keep things. The new pair says where
  you are headed, which is Setup, and what the New Game costs. The
  Notes sentence is there because Notes genuinely survive: engine —
  `newGame` rebuilds the state, while the Notes page is stored under
  its own key by the page and is never touched. Saved decks and the
  dragged column order survive too, and are not mentioned.
- **"Players:"** and **"Deck:"** — phone page — `modalNewGame`.
- **"Same Players"**, **"New Players"**, **"Same Deck"**, **"New Deck"** — phone page — `modalNewGame`.
- **"Cancel"** and **"Start New Game"** — phone page — `modalNewGame`; Start asks **"Sure?"** first, through `ngStartTap`.

---

## 10. The Turn Log

Every line here is worded by the engine and painted by the page. The
law written above it: players by name, and the person playing is
**"you,"** never **"Me"**. Three engine functions do all of the
wording — `wordEntry` for the entries, `nowLine` for the live line at
the top, and `logView` for the empty-state sentence. The page's
`renderLogPage` only draws.

### The live "Now" line, at the top

All of it is engine — `nowLine`.

**The ⭐ was taken off all four at Y-26.** Patrick's ruling: the star
belongs to the glowing turn-bar win alone, and nowhere else.

- **"Game over — you won!"**
- **"Game over — you lost."**
- **`Game over — Kate won.`**
- **"Game over — you won"** — reworded at Y-26; it formerly read **"Game over — you are the only one left."**, which disagreed with the turn bar calling the same ending a win. The reason is not spelled out here because the Log's own entries already carry it — a quit writes its own **`Turn 4 — 👋 Kate quit`** line just below.
- **`Now — Kate showed — tap Next ▶`** — during the waiting phase.
- **"Now — waiting for someone to show"** — during the showing phase.
- **"Now — your turn to ask"** — when the turn is yours.
- **`Now — Kate's turn to ask`** — when it is someone else's.

**"No turns logged yet."** — engine — `logView`, in place of the
entries when the log is empty.

### The entries

All seven kinds are worded in engine — `wordEntry`.

**An asked turn**

- Title: **`Turn 4 — You asked`**.
- First line: the asked cards, comma-separated.
- Second line: **"Nobody showed."** — or **`Kate showed Rope`**, with the card named only when it is known.

**A passed turn**

- Title: **`Turn 4 — Kate didn't get a chance to ask`**. No detail lines.

**An accusation**

- Title: **`Turn 4 — ⭐ Kate accused`**.
- First line: the accused cards, comma-separated.
- Second line, one of four:
  **"Right — you won the game."**,
  **"Wrong — you lost the game."**,
  **`Right — Kate won the game.`**,
  and
  **`Wrong — Kate is out on a wrong accusation. 😢`**

**A ∑ change**

- Title: **`Turn 4 — ∑ changed`**.
- One line per card: **`Rope — ✕ Has card`**, **`Rope — ⭐ Solution?`** or **`Rope — Cleared`**.

**A board mark**

- Title: **`Turn 4 — 🏠 Rope is on the board`**. No detail lines.
  Reworded at Y-27 (Patrick) from **`Turn 4 — 🏠 Rope seen on the
  board`**, so the Turn Log agrees with the status line.

**A player leaving**

- Title: **`Turn 4 — 👋 Kate quit`**.
- One line: **`Showed on the way out: Rope, Study`** — or **"Showed no cards."**

**An undo**

- Title: **`Turn 4 — ↩ Undo — turn restarted`**.
- First line: **`All Turn 4 marks removed.`**
- Then one highlighted line for each hidden mark brought back: **`The hidden ! on Rope in Kate's column is back.`**

### The Log page's own text

- **"📋 Turn Log"** — phone page — `screenLog`, the page's head, with a **"Copy"** button beside it.
- **"Log copied!"** — phone page — `copyLog`, direction, after Copy succeeds. It is said down two roads, the wrapper's native clipboard and the browser's modern one.
- **"Nothing to copy"** — phone page — `copyLog`, warning, tapping Copy with an empty log.

---

## 11. The Notepad

- **"📝 Notepad"** — phone page — `screenNotes`, the page's head.
- **"Clear"** — phone page — `screenNotes`, a two-tap button asking **"Clear?"** first, through `twoTap`.

---

## 12. The Feedback window

Behind the Guide's **"💬 Suggest an improvement"** button, which sits
in the `screenGuide` box. Every line below is phone page —
`modalFeedback` unless another name is given.

- **"💬 Feedback"** — the title.
- **"Do you have an idea, or did something not work right? I'd love to hear it."**
- **"Did the tracker work correctly?"** — answered by **"✅ Yes"**, **"⚠️ Mostly"** or **"❌ No"**, recorded by `setFeedback`.
- **"Do you find anything confusing or hard to use?"**
- **"Are there any features you would like it to have?"**
- **"Do you have any other comments or suggestions?"**
- **"How would you rate this app?"** — above a slider running from **"I don't like it"** to **"I really like it"**.
- **"THANK YOU VERY MUCH"** and **"I appreciate your feedback 😊"**
- **"Cancel"** and **"Send Feedback"**

**The window's numbering was removed at Y-27 (Patrick).** The first
four questions used to be headed **"1."** through **"4."** and the
rating line carried no number at all, so the window read one, two,
three, four and then a stray — while the email leaving
`submitFeedback` numbered the rating **"5. Rating"** regardless.
Patrick ruled that numbers are not needed in a form this short: they
suit long surveys, where a number is something to refer back to. All
four numbers came off, and the rating line's full stop became a
question mark to match the other four. **The email was deliberately
left numbered** — it is written for Patrick to read, and five answers
in a fixed order are easier to read numbered.

**The email itself** — phone page — `submitFeedback`. Its subject is
*Mystery✓ Clues Track Sheet Feedback* and its body repeats the four
questions above each answer, filling **"(not answered)"** or
**"(none)"** where the player left a box empty, and ending
**`5. Rating: 50%`**.

---

## 13. Text that belongs to no one screen

**"Tap again to confirm"** — phone page — `twoTap`, shown by every
two-tap button on its first tap, while the button itself changes to
**"Sure?"** — or to **"Delete?"**, **"Clear?"** or **"Load?"** where
that button asks its own way.

**The app's title** — **"Mystery✓ Clues Track Sheet"**, phone page —
the app header, outside every screen box. The ✓ is drawn as inline
artwork rather than typed, because neither bundled font carries the
glyph.

**The footer buttons**, on every screen — **"← Log"**, **"📖 Guide"**,
**"Notes →"**, **"← Setup"** and **"Game →"** — phone page, each
screen's own footer inside its box: `screenSetup`, `screenGame`,
`screenLog`, `screenNotes` and `screenGuide`. Which return is awake is
settled by `refreshPanelFoot`.

**The header buttons** — **"New"** and **"Out"**, phone page — the app
header, shown and hidden by `showScreen`; and the theme button, which
shows **☀** in the dark theme and **🌙** in the light one, set by
`applyTheme`.

**The grid's own labels** — **"CARDS"** at the top-left corner and
**"∑"** and **"🏠"** as column headings, phone page — `buildGrid`; a
player's name or **"Me"** or **"—"** on each column, with **"👋 "** or
**"😢 "** in front of it once they are out, phone page —
`paintHeaders`.

**The marks drawn in the cells** — **✓**, **✗**, **?**, **!** and
**"Me"** — phone page — `SYM`, the one table naming all five.

**The seat and deck windows' fixed text** — **"This is Me"** in
`modalSeat`; **"Category name"** and **"＋ Add Card"** in
`modalEditCards`; **"New card name"** as an empty card box's
placeholder, from `makeCardRow`; and **`Edit Weapons`** as the edit
window's title, from `openEditCards`.

**The show pickers' titles** — **`Kate shows you…`** from
`openShownMe` and **`You show Kate…`** from `openIShowed`.

---

## Index — who says what

The map read the other way round: from a piece of code to the sentences
belonging to it. Section numbers point back into the map above.

### The engine's speaking functions

| Function | Says | Section |
| --- | --- | --- |
| `gameOverGuard` | the game-over freeze line | 9 |
| `deleteCategory` | the last-category refusal | 1 |
| `editCategory` | the deck-full and duplicate-name refusals | 1 |
| `setCounts` | the counts-do-not-add-up refusal | 3 |
| `setupUnmet` | all seven Play-gate sentences, worded | 2 |
| `play` | speaks whichever one `setupUnmet` names | 2 |
| `saveDeck` | the three save refusals, and the saved confirmation | 4 |
| `loadDeck` | the loaded confirmation | 4 |
| `deleteDeck` | the deleted confirmation | 4 |
| `askProgressStatus` | the ask countdown | 5 |
| `nextTap` | the half-made-ask refusal | 5 |
| `undoTap` | "Nothing to undo" — unreachable from this page | 5 |
| `headerTap` | five header refusals, and the waiting-phase direction | 5 |
| `mustShowFirstLine` | the must-show-first refusal, for two doors | 5 |
| `confirmShownMe` | "Select a card", and the shown-by confirmation | 5 |
| `confirmIShowed` | "Select a card", and the shown-to confirmation | 5 |
| `correctShower` | the show-taken-back confirmation | 5 |
| `nobodyShowed` | the nobody-showed line, and the must-show refusal | 5 |
| `sumStarWarning` | the crowded-⭐ warning, worded | 6 |
| `sumCommit` | speaks that warning as the star lands | 6 |
| `houseTap` | both board-mark lines | 6 |
| `accuse` | three refusals, and the two wrong-accusation endings | 7 |
| `playerOut` | the player-first refusal, and both quit endings | 8 |
| `playerOutCards` | names the holder of a card already ✓-held | 8 |
| `nowLine` | all nine live "Now" lines | 10 |
| `wordEntry` | every Turn Log entry, all seven kinds | 10 |
| `logView` | the empty-log sentence | 10 |

### The page's speaking functions

| Function | Says | Section |
| --- | --- | --- |
| `openCounts` | "Fill the seats first" | 1 |
| `restingHint` | the three resting directions | 5 |
| `paintTurnBar` | the turn line, its three stages, and all four endings | 5, 9 |
| `sumStarTap` | speaks the engine's ⭐ warning as it arms the "Sure?" | 6 |
| `openAccuse` | the already-out refusal, and the verdict question | 7 |
| `accuseVerdict` | the two dim-button refusals | 7 |
| `openPlayerOut` | "No other active players." | 8 |
| `quitShowTap` | "Select a player first", and each held card's holder | 8 |
| `outRemoveTap` | "Select a player first" | 8 |
| `endedGuard` | the game-over freeze line, at the window's door | 9 |
| `copyLog` | "Log copied!" and "Nothing to copy" | 10 |
| `submitFeedback` | the feedback email, which stays numbered | 12 |
| `twoTap` | "Tap again to confirm" | 13 |

### The page's painting functions, for fixed and built text

| Function | Draws | Section |
| --- | --- | --- |
| `renderSeats` | the six seat labels and their large lines | 1 |
| `renderCardPicker` | the category banners, and ＋ Add Category | 1 |
| `renderCountRows` | the Envelope, House and player rows | 3 |
| `openDeckAction` | the saved deck's name, and its two buttons | 4 |
| `openSum` | the ∑ window's title | 6 |
| `openNote` | the cell note window's naming of the cell | 6 |
| `buildAccuseCards` | the number of cards wanted | 7 |
| `buildGrid` | CARDS, ∑ and 🏠 in the grid's head | 13 |
| `paintHeaders` | each column's name, with 👋 or 😢 | 13 |
| `SYM` | the five marks drawn in the cells | 13 |
| `applyTheme` | the theme button's ☀ or 🌙 | 13 |
| `showScreen` | shows and hides ▶ Play, New and Out | 13 |
| `refreshPanelFoot` | which of a side page's two returns is awake | 13 |
| `openEditCards` | the edit window's title | 13 |
| `makeCardRow` | the empty card box's placeholder | 13 |
| `openShownMe`, `openIShowed` | the two show pickers' titles | 13 |

### The markup boxes that carry words of their own

| Box | Carries | Section |
| --- | --- | --- |
| the app header | the app's title, New, Out, ▶ Play, the theme button | 1, 13 |
| `screenSetup` | the two step labels, the two Setup buttons, its footer | 1, 13 |
| `screenGame` | ⭐ Accuse, ↩ Undo, Next ▶, its footer | 5, 13 |
| `screenLog` | 📋 Turn Log, Copy, its footer | 10, 13 |
| `screenNotes` | 📝 Notepad, Clear, its footer | 11, 13 |
| `screenGuide` | the Player Guide, deliberately outside this map | — |
| `modalSeat` | "This is Me" | 13 |
| `modalEditCards` | "Category name", ＋ Add Card | 13 |
| `modalSaveDeck` | the save window's title | 4 |
| `modalDeckAction` | "Saved Deck", Delete, Load | 4 |
| `modalCounts` | the window's title, Cancel, Done | 3 |
| `modalShownMe`, `modalIShowed` | Cancel and Confirm at both pickers | 5 |
| `modalSum` | ✕ Has card, ⭐ Solution?, Clear | 6 |
| `modalNote` | 📝 Cell Note, Cancel, Save | 6 |
| `modalAccuse` | the title, the accuser heading, the card direction, Yes, No, Cancel | 7 |
| `modalPlayerOut` | the title and every line in both steps | 8 |
| `modalNewGame` | the title, both paragraphs, both choices, both buttons | 9 |
| `modalFeedback` | the whole form | 12 |
