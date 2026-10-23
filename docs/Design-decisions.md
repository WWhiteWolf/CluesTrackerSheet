# Design decisions

These are the decisions for the Clues Tracker Sheet page. A later session follows them and does not ask them again.

The setup decisions already written under “Decided for this rebuild” in `docs/ClueTrackerSheet-spec.md` still stand. Where this file and an older note disagree, this file wins for the points it states. The sentence in that spec which says the gameplay changes have not been named yet is out of date. The ones named here are named.

## Where the work lives

The work is in the Clues Tracker Sheet folder. The original Mystery Tracker page stays as it was, in the Mystery Tracker folder.

The working page was copied from MysteryTracker.html. He renamed it to CluesTrackerSheet.html. A missing s in that name was a typo, not a second rename. He added the s. On disk the working file is CluesTrackerSheet.html.

## What the engine is for

The engine from the phone runs the turn and the deductions. Once a game is going, a click on a card, a click on a name, and the marks in the cells go through the engine, so the engine knows what to do. Next and Undo ask the engine. The highlighted column follows the engine. He does not want the old page’s logic patched in beside that. He played eight turns and it ran the way he wanted.

Taking those clicks off the engine is the wrong reading. It was tried in CTS-6 and he rejected it. The paths were put back.

The page keeps the old page’s layout, with things in the same place, and it keeps how the marks look. The logic is the engine’s. The grid, the movable columns, and the empty columns stay.

## The page

The page has the same shape in Setup and in play. That shape is the older web page.

There is one deck size. The grid does not need to change shape for a different deck.

The grid fills the space beside the log. When the browser’s viewing percentage changes, the page and the grid change together, including the text. Growing a little, so it is easier to see, is fine.

The column headers stay the height of their own words. They do not stretch tall with the card rows. The grid sits inside its space and does not bring up scroll bars.

The card column is only as wide as the card names need. A player’s name stays inside that player’s own column and does not run into the column on the right.

Columns with no name stay on the page, looking as they do before a name is entered. They are left out of play and out of the turn order.

Changes already made to the grid, to moving columns, and to leaving empty columns on the page stay. They are not taken out.

The name in the title and in the heading is Clues Tracker Sheet. The version beside the heading is Ver. 1.0.

Rules is not kept. The Rules button and the rules panel at the side are gone. He has seen both gone. Guide and the ? button stay.

The game row and the turn row show messages and notes. He has seen the messages.

A tap at the wrong point puts a hint or a warning on the game row, so he can see what is wrong. The page writes those words. They are not part of the engine, and they show whether or not the engine is running the turn. The turn line leaves the warning there until it clears. The highlighted name still shows whose turn it is. He has seen the warnings showing.

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

During a game the cells are drawn from what the engine returns. The page’s own drawer, used outside that, shows an ordinary check and the word Me.

A card seen on the board is marked by hand in the House column. One tap keeps the mark. A second tap clears it. The page shows that check. When the check settles, which is when the pointer leaves the cell, the page tells the engine. The engine writes the log line then, and it crosses that card off the other players. He has seen the log line work. The only time he can mark a board card is on his own turn, when he is in a room that has a card, after he has asked his three cards and nobody can show. There is no other way to see that card.

Up to four small characters can be typed in a player’s cell during a game. A right-click opens the box. They are characters. They are shown in the corner of the cell. The sheet does not use them to decide anything. Taking a turn back does not remove them. They are not written in the log. An empty column does not open the box. He tried it and said that works.

## The log

The engine decides what the log says and when a line is written. The log on the page shows those lines. While a game is going, the page does not keep a second play log of its own. He has seen the log working, including a House check after nobody showed.

## A refresh

A refresh in the middle of a game brings back the engine’s turn. The marks, the log, the highlighted column, and Next and Undo come from the engine. The summary marks stay with the page. When no game is going, setup stays as it was. New Game clears the engine’s save, so that game does not come back. He has seen this work.

## Deduction helpers

The seven helpers behind the ? button stay on this page. They are not on the phone. That was already decided.

They start off. A tick turns one on. They only color cells, or post a note in the panel. They never write a mark. The engine keeps writing the marks.

During a game they read the engine’s marks, the house checks, and the shows the engine has written. An undone show is left out. He looked at them and said they are working now.

## Still to do

One major piece is left. The User Guide. It waits for a new session. The name in the Guide that still says Mystery Tracker is changed when the Guide is done.

## Not settled

A wrong accusation was not settled in this work. Do not ask about it unless two writings still disagree and this file has not settled it.
