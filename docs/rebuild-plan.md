# Rebuild plan — one heart, two packagings

Written at Y-1 (2026-08-07), condensing three MT-chain files whose
originals stay archived in `MysteryTracker/docs`:
`MT7-rebuild-decisions.md`, `MT12-decision10-findings.md`, and the
retired `MT7-comparison.md`. This file is the build's working
plan. The big shape is settled; the details — rendering above all
— are answered as the build meets them; the mark-shape choices
below were settled early, at Y-2. It retires when the build is done
and tested.

**The plan in brief:** one shared heart (the rules of the game) in
its own engine file, loaded by two packagings — mobile and web.
The whole rebuild lives in this repo. `Projects/MysteryTracker` is
the finished archive of the old web app; the rebuilt mobile app
ships as the same App Store app, upgraded, the shipped 1.0
untouched while the build runs.

## The mark shape — build-time choices

**Direction (MT#8):** one shape, one behavior — marks work
identically in both packagings.

**The fix is done: the ! is preserved.** Mobile used to destroy a
stored ! when an ✗ landed on its cell (three places: `addMark`
line 1063, `autoXPassers` line 2208, and the nobody-showed path
in `nextPlayer` line 2253), so an Undo of the ✗ left the cell
empty. The MT#12 fix (built 2026-08-07, three commented changes
in `mystery-clues-tracker.html`) applies the web's rule to
mobile: an overwritten ! is kept in storage and hidden from
display, so Undo lets it reappear on its own. Verified working in
a VS Code Go Live browser test; the phone test waits on
refreshing the wrappers' embedded copies.

**The two shapes today.** Mobile: a cell is a list of marks, each
with type, turn, and optional quit flag (quit-flagged marks
survive undo); five types (✓ ✗ ? ! Me); ✓/✗ land once ever, the
rest once per turn. Web: the same list plus six quick-lookup
flags plus manual-cycle bookkeeping; six types — ✓* for
shown-to-me, ←Me for I-showed; ✓/✗/! once ever.

**Settled at Y-2 (2026-08-07) — the five mark rules:**

- A ! lands once ever, and only in a cell holding no ✓ and no
  ✗. The ! is engine-placed, never the player's own tap.
- When an ✗ arrives on a cell holding a !, only the ✗ shows;
  the hidden ! is kept in storage so an undo brings it back.
- Shown-to-me is a plain ✓ — being shown is the only way a ✓
  lands; the web's ✓* star goes. The only ✗ the player's own
  hand places goes through the ∑ picker.
- The ? follows the same rule as the !: a ✓ or ✗ arriving on a
  cell holding a ? hides it, kept in storage so an undo brings
  it back.
- The engine's own mark changes are not logged, with one
  exception: when an undo returns a hidden ! or ?, the log
  highlights that return.

## Settled — Part 1, the heart (one rule each)

1. **Deck shape (MT#8):** mobile's flexible model — 1 to 4
   categories, cards added and deleted freely, up to 30; Play
   gate unchanged (12+ cards, 3 per category, 2 categories). The
   web's fixed grid and muting go; its five-step wizard needs
   revisiting (Part 2).
2. **Endings (MT#8):** the heart adopts mobile's full ⭐
   accusation flow unchanged; the web's door is a Part 2 matter.
3. **Wrong-accusation door (MT#8):** accusation only — the sole
   door to the 😢 sideline; the web's Mark Out door goes.
4. **∑ column (MT#8, amended MT#10):** mobile's modal picker is
   the one door on both packagings. Glyphs ✕ "has card" / ⭐
   "solution?"; the two-star warning kept, with "Sure?" arming
   before a second star in a category; logged as the settled
   state at the turn's end.
5. **Card counts (MT#8):** kept, gathered by a required Setup
   step — "Where are the cards?" — House count first, an
   even-deal pre-fill each player accepts or edits. Feeds the
   deductions and the Me-card completeness check. The web's bare
   number entry goes.
6. **Start gate (MT#8):** one gate — mobile's six plain-word
   conditions plus Me's checks matching the counts step. Gate and
   messages live in the heart; the dimmed Play button names the
   first unmet condition, identical wording both packagings.
7. **Manual facts (MT#8):** none in the heart. The web's
   right-click ✓/✗ cycle goes; the ∑ column is the home for
   hand-known facts.
8. **Cell notes (MT#8):** in the heart, both packagings —
   mobile's modal the one door, 4-character notes.
9. **Deductions engine (MT#8):** in the heart, both packagings,
   as a future tiered option — the seven helpers and the "Why?"
   tooltip are the paid tier. Not required in the first build; it
   carries over from the web when its time comes. The hooks it
   feeds on (the card counts) stay in place. A simpler idea,
   noted Y-2, kept beside the helpers for the tier's design:
   when two of the three cards possibly shown at one turn number
   are later ✗ed, highlight it — the third is the shown card.
10. **Mark shape (MT#8, fix built 2026-08-07):** one shape, one
    behavior; an overwritten ! is kept and hidden, not destroyed.
    The five mark rules were settled at Y-2 — see "The mark
    shape" above.
11. **Deck storage (MT#8):** one deck record, mobile's shape —
    categories and cards only, up to 4 saved decks, 6-character
    names. Player reuse is the New Game modal's "same players"
    choice; counts set fresh each game. File export/import goes;
    the per-deck Rules text and the Rules panel go. Future
    paid-tier idea: a deck copied as text, pasted back in.
12. **Undo (MT#8):** the shared turn-tag wipe model stands;
    shower-correction enters the heart — a confirm-tap on the
    same header un-picks a mis-tapped shower, both packagings.
13. **Log vocabulary (MT#8):** one log, identical in both. Entry
    kinds: turns, did-not-reach-a-room, accusations, house marks,
    ∑ changes (turn's-end state), Player Outs (the quit path),
    and Undos as honest history. The accusation-undo kind
    retires. The live "Now" entry stays in both. A turn where no
    one shows writes "Nobody showed."
14. **Input caps (MT#9):** mobile's caps — player names 6,
    category names 13, card names 13; only the web tightens.
    Noted, unverified: mobile's "- NAME -" display decoration
    must not carry into the heart.
15. **Me model (MT#9):** mobile's nameless Me seat — "This is Me"
    clears the typed name. The web's name-overwrite model goes.
16. **Players ceiling (MT#9):** a hard 6; the web's one-knob road
    to 10 (MAX_PLAYERS) goes.
17. **Snapshot schema (MT#9):** one new schema, one new storage
    key, mobile's layout as the start, holding the counts, the ⭐
    mark, and the flexible deck. Old saves from both apps start
    fresh; no migration.

## Settled — Part 2, packaging convergence (MT#10; light theme MT#11)

- **Modals:** all thirteen shared, static blocks in mobile's
  style — welcome and feedback included. Auto-focus shared;
  escape-close, backdrop-close, and hover live only in the web's
  layer. Web placement decided in CSS — that discussion is still
  ahead. The web's showModal engine goes.
- **Two-tap confirm:** mobile's `twoTap()` is the one mechanism,
  belonging to the button; the web's other confirming buttons are
  rewired to it at build time.
- **Status renderer:** the renderer and its one `showStatus()`
  door are shared; the outlets are per-packaging. Routing
  mobile's way: turn state on the Turn bar; directives, causes,
  refusals on the message line (web: the Deck/Message bar).
  Wording law: a known player by name, never a pronoun; the
  person playing is "you," never "Me"; "Me" only when naming the
  actual Me thing.
- **Dark palette:** one shared named-variable block, worn by
  both; any drift reconciled at build time.
- **Log rendering:** one shared renderer — newest-first, one
  styled block per entry kind, decision 13's wording, the shared
  italic empty state. Where the log lives is per-packaging.
- **Four shared pages:** Log, Guide, Notes, Deduction — one
  content in both. Web: one right-side panel, one page at a
  time, a button per page; the Log's default visibility is an
  open build-time choice. Mobile keeps its footer screens. The
  Notepad enters the heart, replacing the removed Rules panel.
  The Deduction page travels only with the tiered package.
- **Grid:** shared skeleton — Card, ∑, 🏠, six player columns
  always shown (empty and out seats faded), a colored band per
  category, a row per card, the name-header row pinned. Cell
  painting shared (the marks await decision 10). Fixed cell and
  row sizes — scroll, never squeeze. No muting anywhere.
  Per-packaging: column widths, finger-versus-arrow sizing, and
  the web's fit-the-window magnification (a view shrink,
  web-only). Web pointer-only comforts held to hover alone;
  anything else pointer-only found at build time is dropped.
- **∑ and 🏠 cells:** shared. ∑ through the picker modal
  (decision 4 as amended); 🏠 keeps the behavior both apps
  already share; painting through named palette variables.
- **Player Out and New Game:** mobile's arrangements, shared
  whole. New Game: the two Same-or-New pick pairs, Start dim
  until both answered, two-tap to fire. Player Out: the
  active-player list, then the 👋 quit road — the shown-cards
  picker, known-elsewhere cards faded and dead, picking none
  legal, two-tap, permanent marks. The 😢 sideline only through
  accusation. The turn-pointer care on a quit rides in the
  heart. The web's arrangements of both popups go.
- **Light theme (MT#11):** both packagings carry both themes — a
  second block of the same named variables, one name two values.
  Switch home per-packaging (web keeps its button; the phone's
  spot picked at build). Choice is saved state; dark is the
  first-launch default. MT#6's unfinished color values stay
  parked behind the plan.
- **Stays per-packaging:** hover, Tab handling, the
  magnification; the portrait lock, PWA manifest and service
  worker, iOS bridges, bundled fonts, footer navigation; setup
  style — mobile's seat grid and the web's wizard each hand the
  same answers to the same heart (the wizard needs revisiting,
  decision 1).

## Settled at Y-3 — the engine build's first choices

Written as the build met them, the Y-2 pattern. The engine lives
in `mystery-engine.js`; its tests in `engine-tests.html`.

- **Asking take-back (Patrick, Y-3):** while the turn waits for
  a shower and no column header has been tapped, a tap on any
  asked cell takes that pick back — and the gate with it —
  returning the turn to the asking phase. Once a shower is
  chosen the moment has passed; Undo is the road back.
- **Shower-correction (decision 12's details):** it covers the
  third-party show only — the two pickers have Cancel before
  the commit and Undo after. Tapping the shower's own header
  again offers the correction; the packaging's confirm-tap
  fires it. A confirmed correction removes the show's marks and
  its log entry whole — a fix in the moment, not an Undo, so it
  leaves no log trace. Its line, open to review: "Ann's show
  taken back."
- **Testing, four layers (Patrick, Y-3):** rule tests built
  beside every engine piece, run by reloading
  engine-tests.html; a guided visual driver later — a script
  that walks the real app into each state and says what to
  check, the eyes doing only what machines cannot; a small
  manual remainder (touch feel, rendering); and the engine's
  trouble record — a few lines about anything impossible it
  notices in real play — offered through the existing Feedback
  door. Nothing sends without the user's own choice: when
  trouble is caught, the app offers to send the report.
- **The log stores facts, not sentences:** each entry keeps the
  asker, the cards, the shower, the shown card, and the result;
  decision 13's shared renderer words them at display time.
- **The snapshot (decision 17, as built):** one key,
  `mctsGame`, schema-numbered, the whole state in one record —
  the log included. Which screen was open is packaging
  business, kept in the packaging's own small record.

## Settled at Y-5 — the Setup side and the two doors

Written at Y-5 (2026-08-08), the Y-2 pattern. The engine now
carries the whole game; what follows here binds the packagings.

- **The counts step (decision 5, design settled with Patrick):**
  the Setup order is counts first, then the Me hand, then Setup
  is done. The one door is a "Where are the cards?" button — on
  the phone beside Save Card Deck, on the web in the Card column
  header during Setup — and the same button reopens the window
  to fix a mistake. Inside the window: the House box first, then
  a pre-filled even split per seated player, the player's own
  row labeled Me. When the deck splits evenly among the players,
  the window opens already filled — House 0, even shares — and
  Done accepts it as it stands; otherwise, and whenever the
  default is not accepted, the House number goes in first and
  the suggestion follows from it. Entry is numbers-only (numeric
  keyboard or in-window picker — picked at build time). A
  mismatched Done keeps the window open with "All [##] cards are
  not entered." (Patrick's line, [##] the deck's total). After
  Done the counts never sit on a screen — the engine remembers;
  they feed the deductions hooks and the gate.
- **The clearing rule (Patrick):** any change to the seats or
  the deck clears the entered counts, and the gate asks for them
  fresh; picking the Me hand never clears them, and an unchanged
  re-save clears nothing.
- **The gate (decision 6 as now amended):** the old three-card
  hand minimum is RETIRED (Patrick, Y-5) — the declared count is
  the truth and the hand must match it; an honest two-card hand
  opens Play. The checks run in the Setup-flow order — seats,
  deck, counts, hand — so the dim Play button names the next
  thing to do. New lines approved: "Play needs: the card
  counts — Where are the cards?" and "Play needs: your hand to
  match your count (3 of 8)".
- **The Setup page slims (phone, Patrick):** every direction
  text goes, and the "N of 30 cards used" counter goes with
  them; the freed spot beside Save Card Deck is the counts
  button's home.
- **Saved decks (decision 11 as built):** up to four, names
  capped at six characters, structure only, stored under their
  own key apart from the game snapshot — New Game never touches
  them. Lines approved: "Enter a deck name first", "That name is
  already used", and the Deck saved / deleted / Loaded trio.
- **∑ and 🏠 (decisions 4 and 13 as built):** the shipped app's
  behavior and wordings carried over, code-verified — the
  two-star warning "More than one ⭐ in [category]" shown before
  the second star lands (the packaging's "Sure?" arming) and
  spoken after; "seen on the board" and "board mark cleared"; a
  cleared 🏠 mark takes back exactly its own flagged crosses and
  its same-turn log entry, an earlier turn's entry staying as
  history. The 🏠 mark crosses every active player EXCEPT Me
  (Patrick, Y-5): the Me column already crossed every unheld
  card at Play. The ∑ log is one entry per turn — the settled
  state at the turn's end, title "Turn N — ∑ changed" (approved),
  a line per card in deck order with the shipped labels — and it
  also flushes just before an accusation or a quit is logged, so
  an ending never swallows the last changes. Cells touched but
  left as the turn found them log nothing. ∑ marks survive Undo,
  as shipped.
- **Seat order is turn order, and Setup owns it (Patrick, Y-5):**
  no reordering in Setup. Where the player columns sit on the
  Game grid is each packaging's display business — rearranged by
  a hard press and drag on the phone, a click-hold and drag on
  the web, each packaging remembering its own arrangement. Born
  of the family habit of offsetting turn numbers so each player
  reads first on their own device. **Widened (Patrick, Y-10):**
  the drag moves the ∑ and 🏠 columns too, not the player
  columns alone; only the Card column keeps its place.
- **The packaging map fills out (Patrick, Y-5):** the Android
  wrapper is a packaging home in its own right — sideloaded,
  live on Patrick's Galaxy — and the light theme is packaging
  work, next up as Y-6.

## Settled at Y-6 — the themes and the area law

- **The area law (Patrick, Y-6):** every area wears one flat
  color — the header, each bar, the column headers, each category
  banner, one color apiece. The grid sits on one ground; anything
  painted onto a piece of it is solid and buries the ground.
  See-through only on purpose: the ✓/✗ washes (anchored to the
  grid ground alone) and the modal backdrop. The old app's
  see-through fades — the quit and empty-seat headers — become
  flat colors of their own. The alternating row stripe is out
  (recorded in upgrade-scope's Decided OUT).
- **Both palettes are settled, area by area, in
  `docs/palettes-tuned.css`** — the ruling record, tuned by
  Patrick's eye in `theme-tuner.html` (the in-house tuner: the
  real engine painting a sample game, one picker per named area).
  `docs-ref/color-law-and-names.md` holds the area law and every
  naming ruling; the names themselves live in the tuner.
  One name, two values; dark stays the first-launch default.
- **The phone's theme-switch homes (Patrick, Y-6):** in Game
  mode, a theme button in the turn bar beside the ⭐ Accuse
  button; in Setup, on the STEP 1 - PLAYERS line. The win-moment
  care is answered (Patrick's test, Y-7): "Game over - you won!"
  takes the place of the "Turn # - [player name]" text, far from
  the square theme button's spot, so the button holds its ground
  during the win moment. The web keeps its existing button, as
  long decided.

## Settled at Y-7 — the phone page begins

Written at Y-7 (2026-08-08), the Y-2 pattern.

- **The page and its name (Patrick, Y-7):** the rebuilt phone
  page is `mystery-phone.html`, project root — one page serving
  both phone wrappers, iOS and Android; the web page will be
  `mystery-web.html` when its turn comes. Before the page began,
  the engine's one gap closed: the cell-note doors (`setCellNote`
  and `cellNote` — 4-character cap, an empty text clears, frozen
  at game over, never logged, turn wipes leave notes standing),
  with seven rule tests — 173 passing.
- **The counts entry (Patrick, Y-7):** no phone keyboard —
  numbers move by − and ＋ stepper taps, one per tap. With
  steppers there is no "empty box," so the window always opens
  pre-filled: House 0 and even shares when the deck splits
  evenly, otherwise the suggestion for House 0; any change to
  the House number re-runs the even-deal suggestion below it.
  Done still refuses a mismatch, the "All [##] cards are not
  entered." line speaking in the window.
- **The theme button (build choice, open to Patrick's eye):**
  square, showing the theme a tap would switch to — ☀ while in
  dark, 🌙 while in light.
- **A new refusal line (Claude, Y-7):** "Fill the seats first"
  answers the counts button when no seats are filled.
- **Left out, awaiting Patrick's ruling:** the shipped edit
  window's Reset-to-default button — the engine has no reset
  door, so the button was not carried over. Add a small engine
  door, or let the button go.
- **Still standing in:** the Guide, Notes, and Log screens'
  ground wears `--footer` until their own palette name is drawn
  when their real content exists (the Y-6 care).

## Settled at Y-8 — the Game screen, and a mark-rule amendment

Written at Y-8 (2026-08-08), the Y-2 pattern.

- **The mark rules amend (Patrick, Y-8):** the ? never hides.
  Y-2's hiding rule now stands for the ! alone: a ✓ or ✗
  arriving on a cell holding a ! keeps it stored and hidden,
  back on undo. The ? always shows beside any mark — hidden, it
  left no trace of where the player had asked once the picked
  wash cleared. Only the ! can therefore return on an undo, and
  only it is highlighted in the log. The engine, its tests
  (still 173 — replaced, not added), and the phone page's
  painting moved together.
- **The Reset-to-default button is dropped (Patrick, Y-8):** the
  shipped edit window's Reset button does not carry into the
  rebuild — starting a new deck covers the need; no engine door.
- **The Game screen's build shape (Y-8):** the grid look is
  carried verbatim from `theme-tuner.html` — the table Patrick's
  eye tuned — and each header cell belongs to its column as one
  unit, so the coming column drag moves the name and its cells
  together; the pinning is up-and-down only. The engine needed
  no new door: the whole screen is painting and wiring on the
  existing doors and hooks.
- **Build choices open to Patrick's eye (Y-8):** the wrong
  accuser's header wears `--quit-header` with 😢, no palette
  name of its own; the stage bar's resting directions and the
  two picker titles are Claude's wording, unreviewed; Undo dims
  only at turn 1's clean start.
- **Found in Patrick's testing, unfixed:** the turn bar ignores
  the phase — the shipped page's stage wording ("is thinking" /
  "is waiting" / "[shower] showed") is to be carried over
  code-verified; and the counts window does not account for the
  envelope's cards — the even-split House-0 default suggests an
  impossible deal. Settled (Y-10): one solution card per category
  sits aside in the envelope first, so the window splits only the
  remaining deck — deck size minus the category count — between
  House and hands.

## Settled at Y-11 — the endings on the phone, and an accuse amendment

Written at Y-11 (2026-08-09), the Y-2 pattern.

- **The turn-holder's wrong accusation passes the turn at once,
  in every state (Patrick's rulings, Y-11).** The engine's old
  rule passed the turn only from a clean not-yet-asked turn. Now:
  a standing ask — partial or full — is abandoned and leaves no
  trace, its picks' ? marks coming off through the take-back's
  own door (ruled after a first look at the marks staying as
  history); a finished show needs no Next. A non-holder's wrong
  accusation still leaves the standing turn alone. One old test
  encoding the narrow rule was replaced; the suite is 177.
- **Being out outranks being the asker (packaging, Y-11):** the
  header painter checks the 👋 and 😢 states before the asker
  color, so a player sidelined while still the recorded asker
  shows the truth.
- **The I-showed picker preselects a lone card (Patrick, Y-11):**
  when only one card can be shown, it arrives selected and
  Confirm alone finishes the show.
- **The win moment on the phone (as built, Y-11):** the shipped
  bar's game-over branch carried over — the win text in the turn
  text's place, your win in bigger letters with the breathing
  glow, an opponent's win the same letters glowless, Undo and
  the hint asleep at every ending. Both looks are drawn from the
  named `--winner` and `--i-won-glow` variables, per the color
  law — the shipped page's hard-coded white and gold do not
  carry.
- **The side pages are direct ports (Patrick, Y-11):** the
  Guide, Notes, and Log screens carry over from the shipped page
  with nothing to redesign; the ground color is the only open
  touch (the Y-6 `--footer` care). And the build order reorders:
  Y-12 opens with the column drag, the side pages after.

## Settled at Y-12 — the column drag, and two side pages

Written at Y-12 (2026-08-09), the Y-2 pattern.

- **The drag as built (phone-verified):** a hard press of about
  half a second on a movable header lifts the column; finger
  drift before the press lands is a scroll and cancels it. The
  held column wears the picked cells' outline color — no new
  palette name — and paints above the columns it slides across;
  neighbors trade seats the moment the finger crosses onto one.
  The order is packaging state under its own storage key. Open
  to Patrick's eye: the hold length and the held column's look.
- **The side pages' footers return only to the active page
  (Patrick, Y-12):** Game while a game runs, Setup otherwise;
  the other return dims. The shipped page's guard, carried over.
- **The Guide is not a pure direct port (Patrick, Y-12):** its
  text needs rewording for the rebuilt app — this narrows the
  Y-11 direct-port ruling to the Log and Notes screens, which
  carried over as ruled.
- **The log entry titles go to the tuner (Patrick, Y-12):** they
  read too light on his first look; to be settled by his eye,
  likely earning a palette name of their own.

## Standing build rules (MT#10)

- **No dead code.** Nothing on the dead list and nothing removed
  by decision carries into the heart, checked as each block comes
  over. Known dead ground: the six unreachable pieces Appendix D
  marks on mobile (among them `clearAllPlayers`,
  `goBackFromPanel`, `pInitial`, and the accusation-undo render
  branch), and everything the settled decisions removed on the
  web.
- **Comments.** Standard best practice, plain and searchable by
  action words. Banner comments naming each section's job; a side
  note for one line; a comment above the block when it runs
  longer. No history anchors, no attributions, no restating what
  the code plainly does, nothing about removed behavior — history
  lives in the docs.
- **Colors.** Every color a named variable in one palette block —
  plain-word names, one item one name, nothing hard-coded outside
  it. Derived looks computed from the named color so they follow
  it.

## Settled — Part 3, structure (MT#11)

- The heart lives in its own engine file, loaded by both apps —
  one code file, two packagings.
- The whole rebuild lives in `Projects/MysteryCluesTracker`: the
  engine, the rebuilt web page, both phone wrappers — one repo,
  one commit routine. The public deploy repo
  (`WWhiteWolf/mystery-tracker`) receives web builds as today, a
  manual upload — now two files, the page and the engine.
- One encompassing test spec covers the heart and both
  packagings. The mobile 424-step Master Test and the web
  266-step procedure serve their shipped apps until replaced,
  then retire to the archives. The new spec must expressly test
  the return of hidden marks after an undo — the ! and the ? —
  coverage the current tests either lack or only gloss over
  (Y-2).
- `Projects/MysteryTracker` is the finished archive of the old
  web app. The App Store app continues as the same product; the
  shipped 1.0 stays untouched while the build runs.

## Sources

The full reasoning — the side-by-side comparison, each decision's
before-state, and the complete findings — is archived untouched in
`MysteryTracker/docs`: `MT7-comparison.md`,
`MT7-rebuild-decisions.md`, `MT12-decision10-findings.md`.
