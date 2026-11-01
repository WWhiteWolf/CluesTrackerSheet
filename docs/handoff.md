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

The chain is CTS. Patrick named it on 2026-10-13. Nothing here
is a Y-session. Those stay with the original.

**CTS-12 (2026-10-24 through 2026-10-26) stopped here.** Two threads
ran in this sitting: the CTS Test Spec, and locking elyfont.com apps
behind Cloudflare Access.

### Test Spec (in progress)

The home is `docs-ref/build-clues-tracker-test.js`, which generates
`docs-ref/clues-tracker-master-test.docx`. Do not hand-edit the docx
as the lasting source; the script carries wording forward. Rebuilds
carry Patrick’s ✓ marks by step number and keep the √/X column
centered.

Section 1 (Initial Screen Check) and Section 2 (Card Names in Setup)
are settled in his Word file and synced into the script. He edits the
Word file himself, runs the steps as they are written, and proves the
spec and the page together. Do not explain what used to be and is
gone. Do not erase his check marks. Do not change right-click until
he says which account stands.

Section 3 is not started.

### elyfont.com and Cloudflare (in progress / blocked on Active)

The live site is GitHub Pages from public repo `WWhiteWolf/mystery-tracker`
(`www` → `wwhitewolf.github.io`). DNS is now on Cloudflare nameservers
`aurora.ns.cloudflare.com` and `santino.ns.cloudflare.com`. Traffic was
already serving through Cloudflare (`server: cloudflare`) while the
zone Overview still said pending nameserver propagation.

He cancelled Network Solutions **Starter Hosting** and both **Secure
Xpress** lines; he kept the domain (and privacy). He set a Daily
Reminders reminder to check the next invoice. Domain Privacy and
registration may still bill; hosting should not.

Goal for Access: App Store privacy/support pages stay open; each web
app gets its own login. Selling apps needs real protection, not a
password in the HTML.

**Thread A — Identity provider (blocked / unclear in UI).** On
Cloudflare One → Access → Add an IdP, the provider list did **not**
show **One-time PIN**. There is **no** custom shared passcode IdP.
Docs still describe One-time PIN under Zero Trust → Integrations →
Identity providers → Add new identity provider → One-time PIN. New
orgs default to the **Cloudflare** identity provider. Simplest free
paths: use the built-in Cloudflare login, or find One-time PIN if the
UI shows it.

**Thread B — Add application hostname (blocked on zone Active).** On
Cloudflare One → Access controls → Applications → Add an application →
Self-hosted → Application details, the **Domain and path** field for
`elyfont.com` would not accept typing. Docs: that control is a
**dropdown** of domains that belong to an **active** zone; pending
zones are not enough. Documented alternate label: **Switch to custom
input** (mainly for Cloudflare for SaaS custom hostnames). He asked
to switch to custom input; that step was not finished in this sitting.

**Next session should do first:** open Cloudflare dashboard for
`elyfont.com` → Overview. If status is still Pending, use Check
nameservers until **Active**. Then resume Access: pick `elyfont.com`
from the Domain dropdown, set Path per app (e.g.
`CluesTrackerSheet.html`, `MysteryTracker.html`), leave privacy/support
paths unprotected, and settle login (Cloudflare IdP or One-time PIN).
After that, or if he prefers, continue Test Spec section 3.

## Standing product facts (unchanged)

The turn runs on the engine from the phone, in
`CluesTrackerSheet.html`. Do not take clicks off the engine. Rules is
gone. Decisions are in `docs/Design-decisions.md`. Read that before
asking him to decide again.

The page keeps the old layout. The grid, the movable columns, and the
empty columns stay. Next and Undo ask the engine. Right-click on a
player’s cell: four characters; sheet does not use them.

The seven deduction helpers stay behind ?. Quit and a wrong accusation
are not in this app.

The working file for the page is `CluesTrackerSheet.html`.
The working files for the Test Spec are
`docs-ref/build-clues-tracker-test.js` and
`docs-ref/clues-tracker-master-test.docx`.

**Patrick's plain-language list is `docs/pending.md`.** The Word
copy is made from it when he asks.
