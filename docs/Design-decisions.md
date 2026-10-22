# Design decisions

These are the decisions for the Clues Tracker Sheet page. A later session follows them and does not ask them again.

The setup decisions already written under “Decided for this rebuild” in `docs/ClueTrackerSheet-spec.md` still stand. Where this file and an older note disagree, this file wins for the points it states. The sentence in that spec which says the gameplay changes have not been named yet is out of date. The ones named here are named.

## Where the work lives

The work is in the Clues Tracker Sheet folder. The original Mystery Tracker page stays as it was, in the Mystery Tracker folder.

The working page was copied from MysteryTracker.html. It should be named CluesTrackerSheet.html. That rename has not been done. On disk the working file is still called MysteryTracker.html.

## What the engine is for

The engine runs the turn order and the deductions. That is all it runs.

The page keeps the layout. The page keeps how marks look, a right-click, and the rules that belong to marking. The engine does not take those over.

## The page

The page has the same shape in Setup and in play. That shape is the older web page.

There is one deck size. The grid does not need to change shape for a different deck.

The grid fills the space beside the log. When the browser’s viewing percentage changes, the page and the grid change together, including the text. Growing a little, so it is easier to see, is fine.

The column headers stay the height of their own words. They do not stretch tall with the card rows. The grid sits inside its space and does not bring up scroll bars.

The card column is only as wide as the card names need. A player’s name stays inside that player’s own column and does not run into the column on the right.

Columns with no name stay on the page, looking as they do before a name is entered. They are left out of play and out of the turn order.

Changes already made to the grid, to moving columns, and to leaving empty columns on the page stay. They are not taken out.

## Columns and whose turn it is

Each player column can be moved as a whole during play. Moving it changes only where it sits.

The turn order stays the order the names were typed during Setup. Me’s turn comes in that order, even if Me’s column has been dragged to another place on the page.

The card column, the summary column, and the house column stay where they are.

A turn can be taken back.

## Marks

These are decisions about the sheet. The page owns them. The engine does not draw them and does not replace their rules.

The Summary column stays the old way. Clicks go through three marks and then clear. Nothing marked, then a red cross meaning some player is known to hold that card, then a green check meaning he believes the envelope holds that card. The sheet does not use these marks to decide anything.

When another player shows him a card, that is an ordinary check in that player’s column. There is no star.

When he shows a card, the word Me is written in the asking player’s column. There is no arrow.

A card seen on the board is marked the new way. One tap keeps the mark. A second tap clears it. It is written in the log only when the turn ends. The only time he can mark a board card is on his own turn, when he is in a room that has a card, after he has asked his three cards and nobody can show. There is no other way to see that card.

Up to four small characters can be typed in a grid cell. They are characters, not marks. They are shown in the corner of the cell. The sheet does not use them to decide anything. Taking a turn back does not remove them. They are not written in the log.

## Not settled

On one day he said the right-click cycle, blank then a cross then a check, is not part of the new sheet, and that the Summary column and the cell notes take its place. Later he said the right-click marking was not to be changed. Those two have not been settled between them. Do not change the right-click until he says which one stands.

A wrong accusation was not settled in this work. Do not ask about it unless two writings still disagree and this file has not settled it.
