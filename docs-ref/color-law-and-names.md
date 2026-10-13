# The color law and the names — every color decision, in one place

Written at Y-21 (2026-08-11) by merging `docs/palette-draft.md`
(the Y-6 area pass) and `docs/color-names-proposed.md` (the Y-15
naming rulings). Both originals are deleted; nothing from them is
lost except what time had already overtaken.

**This file holds no color values and no list of names.** Patrick
ruled at Y-17 that no third list is wanted: the values live in
`docs/palettes-tuned.css`, and the names, their purposes and their
grouping live in `theme-tuner.html`. This file holds the *reasoning* —
the laws and the rulings — which is the one thing neither of those
can carry. Line numbers are deliberately absent for the same reason:
they cannot stay correct.

---

## 1. The area law (Patrick, Y-6)

**Every area wears one flat color.** The header, each bar, the column
headers, each category banner — one color apiece.

The grid sits on **one ground**. Anything painted onto a piece of the
grid is a solid color that fully covers the ground where it lands. The
alternating row stripe is gone — dropped by Patrick in an earlier
session, and again under this law.

**The only see-through colors are see-through on purpose:** the two
washes behind ✓ and ✗, and the dimming behind a modal. Those three
carry a strength slider in the tuner as well as a color picker,
because the see-through amount is part of the tuning.

The washes are **anchored to the grid ground**. They show through to
the grid color alone and never to anything beneath it.

Two consequences of the law that were fixed when it was set: the quit
player's header and the empty seat's header are flat now. The shipped
app faded them see-through, which let the ground bleed in.

---

## 2. The color-naming law (Patrick, Y-14 and Y-15)

The law itself lives in this project's `CLAUDE.md`. In short: a name
is **purposeful** — relatable to the thing it belongs to, and it does
not have to say what it does. Every colored item can be adjusted on
its own unless it falls under a stated exception. Identical color
values in two names are a settled choice, not a mistake. Text and
modals are the stated exception, and that exception **permits**
similarity without demanding it. A one-of-a-kind item stands alone by
its own nature and needs no exception to do so. Governing all of it:
follow the goal of the rule, not its letter.

**Every new name starts holding the color it borrows**, so nothing
looks different the day a name goes in. Tuning comes after. This has
held at every naming pass — Y-19's twenty-six and Y-21's fourteen.

---

## 3. The naming rulings

These are the decisions themselves, with the reasoning that produced
them. They are recorded because the reasoning is what stops the same
argument being had twice.

### The grounds

`--footer` was doing five jobs and now keeps the footer bar alone. The
page's own ground, the notepad, the Log's list and the Guide's text
each took a name. The Log and the Guide share the class `.panel-body`
but each already carried an id, so they took separate grounds with no
change to the markup. Patrick confirmed he wanted them separated.

The portrait-lock overlay **stays on the page ground** and takes no
name of its own (Patrick, Y-14). His iPhone is orientation-locked so
it never fires there, but his Android phone is not, and the overlay
earns its keep on that side.

### The gold knot

`--hint` was doing sixteen jobs. Seven were pulled out as independent
names — the Log's entry titles and its Now line, the Guide's headings
and sub-headings, the side pages' title-bar lettering, the status line
in the Notes header, and the Game screen's italic hint line — all
ruled **independent, nothing tied together**. An eighth was found
late: the ⭐ in the ∑ column, drawn from an inline style, which was
the only mark in the grid without its own name.

**`--log-title` is the one that untied Patrick's Y-12 complaint** that
the Log's entry titles read too light. It could not be fixed before
because the same gold painted the Guide's headings, the Game screen's
hint and six other things.

Three more came off `--faded` rather than the gold and belong with
their screens: the ∑ and 🏠 entries' quieter titles, the Guide's
opening line, and the notepad's placeholder.

What `--hint` kept were the modal jobs — the input focus borders, the
modal message line, the small section labels, the accusation window's
"Are they right?", and the New Game window's "Players:" and "Deck:"
labels. **At Y-21 `--hint` was moved out of the picker group "The two
bars" and into "The modals,"** where all of that lives. It had stopped
being a bars color at Y-19 when `--stage-hint` was created, and the
mis-grouping only became visible when the tuner gained its section
chooser and `--hint` turned up under Game, painting nothing on screen.

### Colors borrowed for jobs they did not belong to

The side pages' title bar was borrowing the stage bar's color, the
status strip over a footer was borrowing the header's, and the focus
outline was borrowing the asker's blue.

**`--focus-outline` is one name, not two.** The first draft proposed
separate names for the picked cell and the dragged column, assuming
two jobs. Patrick's ruling: the outline's intent is *to focus the
user's attention on the piece being acted upon* — one job appearing in
two moments. They move together. The blue only read as "the asker's
color" by accident of which variable was nearest to hand.

### The Log's call-out line

Patrick's ruling, arrived at over three tries: this line's job is **to
call the user's attention to an obscure occurrence** — not to warn,
and not general highlighting. A single mark returning from hiding
after an Undo is the occasion that triggers it today, not the
definition of it, so `--log-notice` stays reserved for the calling-out
and may serve another obscure occurrence later without becoming a
knot.

`--warn` **stays exactly as it is** for its two real warning jobs: the
Game screen's hint line turning red, and a modal's message line
turning red.

### The Guide button

The finding that produced it: **`.foot-btn.bright` is only ever the
Guide button.** It appears in exactly two places on the whole page and
nowhere else. The first draft proposed `--foot-btn-live`, which named
a state rather than a thing. Patrick ruled the word and the box around
it **move together** under the one name.

### The Seat titles

Patrick's eye found this one, not the reading. `.slot-lbl` carries the
"Seat 1" through "Seat 6" titles and was dim only because it shared
the app's quiet color with ten other things. His words: *the Seat
titles have no reason to be dim.* The full word `--seat-label` was
chosen over `--seat-lbl` because `--setup-label` already sat beside it
and the two should read alike.

### The feedback popup

Five names. `--rating-slider` needed no discussion: it is one of a
kind, used nowhere else, so it stands alone by its own nature.

`--feedback-question` was written at Y-14 for four labels. Reading the
shipped popup found a fifth in the same gold — the rating label — and
Patrick ruled it the same kind of thing, so the one name covers all
five.

`--feedback-appreciation` was added at Y-15. The shipped page paints
the two closing lines differently — THANK YOU VERY MUCH in gold and
bold, the line beneath it in the ordinary reading color and italic —
so they are two items, and Patrick ruled the quiet one should be able
to move on its own.

What the popup inherits, and therefore needed nothing built for: the
three text boxes take `.modal-input` (Patrick, Y-15, reversing a Y-14
note that they wanted names of their own — a quiet gain, since the
shipped boxes carried a hard-coded dark background and inheriting puts
them on `--input` so they follow the light theme properly); the Cancel
and Send buttons are `.modal-btn` secondary and primary; and the frame
was already there. The three answer buttons follow the shipped pattern
— `.modal-btn` primary, secondary and danger in a `.modal-btn-row`,
with the picked one shown **by opacity alone**, the same pattern the
New Game window already uses.

---

## 4. The Y-21 split — reversing the Y-15 recommendation

**This section replaces the Y-15 ruling that `--text`, `--faded` and
`--lines` would not be split.**

The Y-15 reasoning was that those three were borrowed very widely as
ordinary text and ordinary structure, that the goal of the naming law
is that a thing you want to move *can* move, and that breaking
`--text` into fourteen knobs would give fourteen chances to drift out
of tune rather than a new power. Patrick accepted it at the time — and
then found the one genuine exception inside it, the Seat titles.

**At Y-21 he overturned it,** on the plain evidence that the tuner
could not do the job. His words on `--lines`: *they should have been
split all along.*

What the count showed, and why the old reasoning did not survive it:

- `--lines` was doing **twenty-five** jobs, and only seven of them
  were the grid. It was also drawing the Setup seat boxes and chips,
  the modal borders and inputs, the side pages' rules and the footer.
  It was never really "the border color."
- `--faded` was doing seven.
- Three of the six colors in the group called "The page" —
  `--page-ground`, `--footer` and `--guide-button` — turned out to
  need no split at all. They were already single-purpose and only
  looked shared by sitting in that group.

**What was ruled.** `--lines` and `--faded` are retired. `--text`
survives only as the page-wide default on `body`. Fourteen names went
in, prefixed by the section that owns them — `grid-`, `setup-`,
`panel-`, `modal-` and `footer-`. Patrick set two constraints of his
own: **grid lines belong to the game page**, and **modals may share
one name among themselves**, so each of the three colors has exactly
one modal name rather than several.

**Two things were flagged to him before he ruled, and he ruled
anyway.** First, that the naming law names text and modals as the
stated exception — the one place sharing is allowed instead of
splitting — so splitting text turns that around; it is his law and he
changed it. Second, that the five `-faded` names describe how a color
looks rather than what it belongs to, which sits less comfortably
under the law than the other ten; he took them as they were.

---

## 5. What has to travel when a color changes

Whatever is built has to reach **four places**, or it will not hold:

- the two embedded palette blocks in `mystery-phone.html`
- the ruling record, `docs/palettes-tuned.css`
- the wrapper's `www` copy
- and `theme-tuner.html`, which must learn every new name or its next
  download will drop them

Two further rules govern the carry, both settled after they were
learned the hard way:

- **The record's line order is the tuner's output order** (Patrick,
  Y-20). The record is the tuner's saved output, so `PALETTE` is the
  one source of order and the record follows it. This is why moving a
  name between groups means regenerating the record and the page's
  blocks.
- **The tuner's embedded defaults must be kept level with the record**
  (Y-21). They had drifted to forty wrong values in light and three in
  dark before anyone noticed, and it only came to light when the tuner
  needed to travel to someone else's machine. A tuner whose defaults
  lag is a tuner that lies to anyone who opens it fresh.

`--winner` and `--i-won-glow` have no pickers, deliberately (Y-6),
since the sample shows no win announcement. They ride into every
download with their fixed values. Retuning them someday means editing
that constant by hand.
