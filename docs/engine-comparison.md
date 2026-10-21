# Engine comparison — Mystery Tracker and this project

Written CTS-3, 2026-10-21. Mystery Tracker's rules live in
`Projects/MysteryTracker/MysteryTracker.html`. This project's rules
live in `clues-tracker-engine.js`. This file records how a game
differs between them. It is the record of that reading, not a
decision about which behavior this project will keep.

## The deck

Mystery Tracker always has four categories and thirty cards, and
unused rows are switched off. A new deck starts as nine, nine,
nine, and three, with the fourth category and its three cards
switched off.

This engine lets categories and cards be added and deleted, up to
four categories and thirty cards, and every row stays in play. A
new deck starts as three categories of nine cards.

## The marks

Mystery Tracker draws six marks. They are a check, a cross, a
question, a show, a shown-to-you mark drawn as ✓*, and an I-showed
mark drawn as ←Me.

This engine draws five. A card shown to you is a plain check, and
a card you showed is marked Me.

When a check or a cross covers a show, both keep the ! stored and
drop it out of sight, and both leave the question mark visible.

## Marks placed by hand

Mystery Tracker lets a right-click walk one cell through blank,
cross, and check. The row updates when the pointer leaves the
cell.

This engine has no door for that. Something known by hand goes
through the Summary column.

## The Summary column

Mystery Tracker's Summary cell cycles when clicked: blank, then
✕, then ✓ for the envelope.

This engine offers a choice: ✕ has the card, ⭐ might be the
solution, or clear. It warns before a second star in the same
category.

## A card seen on the board

Both can mark a card seen on the board, and both leave your own
column alone when they cross the other players.

Mystery Tracker commits that mark when the pointer leaves the
cell. This engine does it in one tap and writes it in the log.

## Me

Mystery Tracker turns the typed name into the word Me. This
engine clears the name and keeps that seat as Me.

## Counts and starting play

Mystery Tracker takes each player's card count in the column
header. Setup is five steps on the same page. Play starts once
Me is chosen, two names are in, and the hand matches the count.
With no count typed, two cards in the hand are enough.

This engine sets the envelope aside first, one card for each
category, then House and the players have to account for every
card that is left. Play also waits for two categories, three
cards in each, twelve cards in the deck, and that counts step.

## Leaving the game

Mystery Tracker has one Mark Out door, and it offers quit or a
wrong accusation.

This engine's quit is its own door. A wrong accusation happens
only by making the accusation.

## Cell notes

Mystery Tracker took the short notes out of the cells. This
engine keeps a note of up to four characters. A turn's undo does
not remove it, and it is not written in the log.

## Deductions and saved decks

Mystery Tracker has a deductions panel and a rules box saved with
each deck. A deck can be brought in from a file. A saved deck
keeps the categories and cards, the player names, the counts, and
which rows are switched off.

This engine has no deductions and no rules box, and it does not
bring a deck in from a file. It keeps up to four decks, by a name
of up to six characters, and a deck is only the categories and
the cards. Counts are entered fresh each game.

Both keep four decks, and both cap a deck name at six characters.
