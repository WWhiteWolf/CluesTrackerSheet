# Handoff history — Clues Tracker Sheet

The session-by-session record of this project. Every section heading
carries the session, the date, and a one-line summary of what
happened, so the list of headings is the index.

**Newest sittings are at the top.** A closing session is written
here, above the rest, never at the bottom.

The chain is CTS, named by Patrick on 2026-10-13.

Everything before this project stays where it already is, in
`Projects/MysteryCluesTracker`, and is opened only when needed.
Nothing from it is copied here.

This file is never read whole.

## CTS-11 — 2026-10-24 — columns move in Setup

Patrick said the previous session’s work was committed.

Player columns move in Setup the same way they move during a game. The same arrangement is shown in both. The turn order is taken once, when Setup ends, from the order the named columns are sitting in. Empty columns stay on the page and stay out of that turn. After that, a drag during the game changes only where a column sits.

A first try left the name field holding the pointer in Setup, so a real drag did not move the column. Setup now takes the pointer the way a game drag does. A press that stays still still edits the name or the card count.

Settling was too jumpy at first. A column now settles into a neighbor when its center enters the middle third of that column. Crossing an edge alone does not move it. He said that is much better.

Each player heading has a palm on the left of the name for starting a drag, with a light outline so it reads against the heading. He said that works very well.

The design decisions and the spec were brought current. The Guide’s Players line and drag line were brought in line with the column move. He read them and said they are excellent. The phone page was not changed, and the engine file was not changed.

The sitting closed here. He will commit, and he will make sure this version is what comes up when the page is loaded from his website.

## CTS-10 — 2026-10-23 — Quit is out, and the House cards count

Patrick said the previous session’s work was committed.

Quit and a wrong accusation came out of the page. A right-click on a column heading during a game does not offer them. The Guide does not describe them. The spec and the design decisions say they are not in this app. The phone page was not changed, and the engine file was not changed. He said the phone is not part of this project.

Taking them out also cut the pieces the page needs to finish setup. Deductions did not open, and the Me menu did not appear. Those pieces were put back. He checked. Deductions opens, and a right-click on a named column in setup offers Me.

The first deduction helper turns a card green only when every player has a ✗ and every House card has been checked. Until then that card can still be an unseen House card. The other helpers treat a House card as a card that player does not hold. Last card standing can still turn green before the House is full. He checked this in the browser and said it looks good. The spec and the Guide’s helper lines say the same.

The page is on elyfont.com. The public repository WWhiteWolf/mystery-tracker holds CluesTrackerSheet.html and clues-tracker-engine.js, and the home page links to the sheet. He saw it there. It opened at 189 percent because the browser remembered that viewing percentage for the site. He set the view back to 100 percent. Someone else opens it from elyfont.com in a browser, on a Mac or a Windows laptop. Nothing is installed.

He said the app is complete for now. Nothing is named for the next sitting.

## CTS-9 — 2026-10-23 — the User Guide

Patrick said the previous session’s work was committed.

The writings that still described a right-click on a player’s cell as a mark cycle were brought in line with the four-character box. That is Page 8 of the spec, the sentences that still pointed at the cycle, and the handoff line that treated every page after Page 3 as the copied page. The page’s right-click was not changed.

The User Guide in `CluesTrackerSheet.html` was rewritten for the page as it plays. He edited the turn sentences himself. He is satisfied with the Guide.

The name in the Guide is Clues Tracker Sheet. Choosing Me stays under setup. Undo says what a tap does once a turn has started, and what a tap does at the start of a turn. Taking back a show between two players, before Next, is its own line. There is no Right-click section. The four characters are under the heading Cell Marks.

He does not want the Quit feature. The Guide does not describe it. The button is still on the page, from a right-click on a column heading during a game. It was not taken out.

## CTS-8 — 2026-10-22 — deduction helpers, then cell characters

Patrick said the previous session’s work was committed.

The deduction options stay off the phone. That was already
decided. On this page the seven helpers behind the ? button were
still reading the page’s old marks, so a tick during a game had
nothing from that game to color.

They now read the engine’s marks, the house checks, and the shows
the engine has written. They still start off. A tick turns one
on. They only color, or post a note. They never write a mark. An
undone show is left out. The phone was not changed.

He looked at them and said they are working now.

A right-click on a player’s cell during a game opens a box for
up to four characters. They show in the corner. The sheet does
not use them. Undo does not remove them, and they are not
written in the log. An empty column does not open the box. The
phone was not changed. He tried it and said that works.

The User Guide waits for a new session.

## CTS-7 — 2026-10-22 — the refresh, the warnings, and the deck note

He took the refresh before the cell characters, so a live game
would not be put back the old way.

On a refresh during a game, the page had been reading its own
save from the moment Start Game was pressed. The engine’s later
turn was written beside that save and was never read back. The
load now reads the engine’s save when the page save says a game
is going. The marks, the log, the highlighted column, and Next
and Undo come from the engine. The summary marks stay with the
page. When no game is going, setup stays as it was. New Game
clears the engine’s save, so that game does not come back.

He tried a refresh in a game and said it was working good.

A tap at the wrong point had stopped putting a warning on the
game row. The highlighted name still turned red. The page writes
those warnings. They are not part of the engine, and they show
whether or not the engine is running the turn. The turn line
leaves the warning there until it clears. He has seen the
warnings showing.

The note shown when a file is not a deck export now says Clues
Tracker Sheet. The index names the working page as
`CluesTrackerSheet.html`.

Cell characters are still the next piece. The name in the Guide
that still says Mystery Tracker is changed when the Guide is
done.

## CTS-6 — 2026-10-22 — the game runs on the phone engine

Patrick said the previous session’s work was committed. He
renamed the page himself, from `MysteryTracker.html` to
`CluesTrackerSheet.html`. A missing s in that name was a typo,
not a second rename. He added the s. On disk the working file is
`CluesTrackerSheet.html`. The title
and the heading were set to Clues Tracker Sheet. The version
beside the heading was set to Ver. 1.0. It had been Ver. 5.0,
and that was the only Ver. 5.0 on the page. He had the page open
and said those changes were in.

He does not want the old page’s logic patched in beside the
engine. The visible page stays the old page, with things in the
same place. The logic is the engine from the phone. Once a game
is going, a click on a card, a click on a name, and the marks in
the cells go through the engine, so the engine knows what to do.
Next and Undo ask the engine. The highlighted column follows the
engine.

A wrong edit took those clicks off the engine and drew the cells
from the page. He stopped it. The paths were put back. He then
played eight turns, and it ran the way he wanted. The grid, the
movable columns, and the empty columns were not taken out.

A card shown to him is an ordinary check. A card he showed is the
word Me. There is no star and no arrow. During a game the cells
are drawn from what the engine returns.

The log was not working. The engine was already writing the
lines. The log on the page was still the page’s own list, so the
lines never arrived. The page’s log was joined to the engine.
The engine decides what is written and when. While a game is
going, the page does not keep a second play log. He said the log
was working and looking good.

One line was missing. After nobody answered his three questions,
he checked Rope in the House column, the card he saw on the
board, and that was not in the log. The House check stays a mark
he enters. The page shows that check. When the check settles,
which is when the pointer leaves the cell, the page tells the
engine. The engine writes the log line then, and it crosses that
card off the other players. He said that works.

He is not keeping Rules. The Rules button and the rules panel at
the side were taken out. Guide and the ? button stay. The guide
sentence that pointed at the Rules button was taken out with
them. A saved deck no longer carries a rules text. He has seen
the button and the panel gone.

He had said the game row and the turn row were not showing
messages or notes. Later he saw the messages there.

He settled the right-click. It is for entering the manual cell
characters only. It is not a mark cycle.

Three major pieces are left. Manual cell characters, deduction
logic, and the User Guide. The name in the Guide that still says
Mystery Tracker is changed when the Guide is done. These also
still need to be done. One sentence still says Mystery Tracker,
the note shown when a file is not a deck export. A refresh in the
middle of a game still brings back the old saved page, not the
engine’s turn.

He also said an edit waits until the plan has been explained and
he has said Go.

CTS-6 stopped here. The next sitting starts with manual cell
characters, one piece. Deduction logic is its own sitting after
that, because what is missing in it was not described here. The
User Guide comes after those two. The note that still says Mystery Tracker
when a file is not a deck export still needs doing. A refresh in
the middle of a game is worth an early sitting of its own,
because it can spoil a game he is in the middle of.

The decisions are in `docs/Design-decisions.md` and at the top of
`docs/ClueTrackerSheet-spec.md`. His plain-language list is
`docs/pending.md`.

## CTS-4 — 2026-10-21 — Setup is in the web version

Patrick has no interest in an iPhone version on the App Store.
He prefers to use the Mac. The iPhone and Android wraps may
never happen. They are a nice-to-have on the pending list, and
the handoff no longer mentions them. The work is the web version.

Setup is in `MysteryTracker.html`. There are no setup steps.
The opening deck is three categories and 21 cards. Nothing is
muted, rows do not move, and category names stay as they are.
Any card name can be changed. Before the game starts, card
names, player names, card counts, and Me can all be changed,
in any order. Start Game closes those edits. New Game opens
them again. Next and Undo run the game.

Start Game also waits until the 18 cards are accounted for.
Three cards are the envelope, so the deck is 21. Counts that
add up to 18 leave the board empty. An even split under 18
leaves the rest on the board. A named player with no count
keeps the game closed, and so does any other split.

The Setup decisions and Page 3 of
`docs/ClueTrackerSheet-spec.md` match the page. The pages after
Page 3 still describe the rest of the page as it stood when it
was copied in. A few of them still mention the old steps.

The next session is the game side. The gameplay changes from
Mystery Clues Track Sheet have not been named. The aim is the
best of Mystery Tracker and Mystery Clues Track Sheet.

## CTS-3 — 2026-10-21 — the web version starts from Mystery Tracker

The web version starts from the older web page, not from the phone
page. `MysteryTracker.html` was copied into this project. The
archive stays as it was. Mystery Tracker is already on elyfont.com.

The design spec was copied from the archive and renamed
`docs/ClueTrackerSheet-spec.md`. Its title is Clues Tracker Sheet.
The Setup decisions are written at the top of that spec. The page
has not been changed.

The page will open on the Clue Classic deck, the deck saved as
Clue C. There is no fourth category and no numbered card names.
Setup is one phase. Play's gate is in the spec. The gameplay
changes from Mystery Clues Track Sheet were not named. They are
the next session.

A comparison of this project's engine and Mystery Tracker's rules
is in `docs/engine-comparison.md`.

## CTS-1 — 2026-10-13 — the repository was started

Clues Tracker Sheet got its own repository. The GitHub repository
is `WWhiteWolf/CluesTrackerSheet`. It is public. It is not a fork
of Mystery Clues Track Sheet. The first commit is `Init CTS`.
`.DS_Store` was left out. The original app's history was not
copied.

The folder had been committed into the Projects repository,
Build-root, during Y-53. `Projects/.gitignore` already listed
`CluesTrackerSheet/`. Commit `2nd try` in Build-root stopped
tracking the folder. The files stayed on the Mac.

The web version for elyfont.com has not been started. The
elyfont.com page is already up. This app is not on it yet.
