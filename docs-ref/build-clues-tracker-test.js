const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        WidthType, AlignmentType, ShadingType } = require('docx');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const COLS = [650, 650, 3710, 3710, 1360];
const HDRS = ['Step', '√/X', 'Do as directed below:', 'Make sure:', 'Notes'];
const OUT = path.join(__dirname, 'clues-tracker-master-test.docx');

// Each section: { title, start?, steps: [ [do, makeSure], ... ] }
// Step numbers come from the script at build time — never typed into text.
// Wording for §§1–2 is Patrick’s, from his Word edits in CTS-12.
const sections = [
  { title: '1 — Initial Screen Check',
    start: 'Start: open the page for the first time in this sitting — no game started yet.', steps: [
    ['Open CluesTrackerSheet.html in a browser.',
     'This test procedure is written assuming the Dark/Light theme is Dark.'],
    ['Tap ☀ in the header to toggle it once, and then again. Leave it in Dark.',
     'It changes from dark brown/black to goldish, then back again.'],
    ['',
     'The page heading reads "Clues Tracker Sheet" with "Ver. 1.0" beside it.'],
    ['',
     'Page header shows "📖 Guide", "?" (Deductions), and "☀" (Theme) on the left; "New Game" and "▶ Start Game" on the right.'],
    ['',
     'The phase bar shows "⚙️ Setup" and "— Change card names, enter players, choose Me, then start the game."'],
    ['',
     'The "↩ Undo Typing" and "↩ Undo" buttons are on the right of the phase bar, muted and disabled.'],
    ['',
     'The Game Deck bar is visible below the phase bar. It shows "📦 Game Deck:", "💾 Save Current", "📥 Import…", the four saved deck slots, and the hint "← right-click Export/Delete".'],
    ['',
     'To the right of the Game Deck bar sits the tall "Next →" button, muted and disabled.'],
    ['',
     'The grid is below the Game Deck bar on the left. The top row of column headers reads: Card, ∑, 🏠, then six player columns whose placeholders are "Player 1" through "Player 6". Each player heading has a palm "✋" on the left of the name, and a card-count field showing "(  ?  )".'],
    ['',
     'Three category banners sit the length of the grid with the name in the Card column: Suspects (six cards), Weapons (six cards), and Rooms (nine cards). The Classic card names show under each banner.'],
    ['',
     'Deductions / Log / Guide share the right side panel one at a time on the right of the grid under Next.'],
    ['',
     'The Deductions is the first in the panel at a fresh open. Its header reads "? Deductions" with a "Close" button on the far right. The body shows the optional helpers.'],
    ['Tap the Close button.',
     'The Log will be displayed in the panel now. Its header reads "📋 Game Log". The body shows muted italic "No turns yet...".'],
    ['Tap the "Guide" button in the Page header.',
     'The Guide will be displayed in the panel now. Its header reads "📖 User’s Guide" with a "Close" button on the far right. The body shows its text.'],
    ['Tap the Close button. Leave it this way for the bulk of this procedure.',
     'The Log will be displayed in the panel again.'],
  ]},

  { title: '2 — Card Names in Setup',
    start: 'Start: continues from 1.15 — Log showing, Dark theme, Classic deck, no game started.', steps: [
    ['',
     'The deck is fixed: three categories and 21 cards.'],
    ['Click the category name "Suspects" in the Card column.',
     'The name does not become editable. Category names stay as they are.'],
    ['Click the card name "Mr. Green".',
     'The cell is an editable input. The text "Mr. Green" is selected or ready to replace.'],
    ['Type "Crook" and press Enter.',
     'That row’s card name reads "Crook". "↩ Undo Typing" is unmuted / enabled.'],
    ['Press Tab.',
     'The "Crook" card is selected and highlighted.'],
    ['Press Tab again.',
     'The "Col Mustard" card is selected and highlighted.'],
    ['Tap "↩ Undo Typing".',
     'The name is "Mr. Green" again. "↩ Undo Typing" is muted / disabled.'],
    ['Click "Mr. Green" again. Type more than 24 characters.',
     'The input stops at 24 characters.'],
    ['Clear the field so it is empty, then press Enter.',
     'The name returns to "Mr. Green". An empty name does not stick.'],
    ['Clear the field so it is empty, then click away.',
     'The name returns to "Mr. Green". An empty name does not stick.'],
    ['Leave every card on its Classic name for the rest of this procedure.',
     'Suspects, Weapons, and Rooms show the Classic names again.'],
  ]},
];

/** Read existing ✓ / other marks from the current docx, keyed by step id (e.g. "1.3"). */
function readExistingMarks(docxPath) {
  const marks = Object.create(null);
  if (!fs.existsSync(docxPath)) return marks;
  const py = `
import zipfile, xml.etree.ElementTree as ET, json, sys
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
path = sys.argv[1]
marks = {}
with zipfile.ZipFile(path) as z:
    root = ET.fromstring(z.read('word/document.xml'))
def text(el):
    return ''.join(t.text or '' for t in el.findall('.//' + W + 't'))
for tr in root.findall('.//' + W + 'tr'):
    cells = tr.findall(W + 'tc')
    if len(cells) < 2: continue
    step = text(cells[0]).strip()
    mark = text(cells[1]).strip()
    if step and mark:
        marks[step] = mark
print(json.dumps(marks))
`;
  try {
    const out = execFileSync('python3', ['-c', py, docxPath], { encoding: 'utf8' });
    return JSON.parse(out);
  } catch (e) {
    console.warn('Could not read existing marks; leaving √/X blank.', e.message);
    return marks;
  }
}

const existingMarks = readExistingMarks(OUT);

const cell = (text, opts = {}) => new TableCell({
  width: { size: opts.width, type: WidthType.DXA },
  columnSpan: opts.span,
  shading: opts.shade ? { type: ShadingType.CLEAR, fill: opts.shade } : undefined,
  margins: opts.pad ? { top: 60, bottom: 60, left: 80, right: 80 } : undefined,
  children: [new Paragraph({
    alignment: opts.align,
    children: [new TextRun({ text, bold: !!opts.bold, size: 20 })],
  })],
});

const rows = [
  new TableRow({ tableHeader: true, children: HDRS.map((h, i) =>
    cell(h, {
      width: COLS[i],
      bold: true,
      shade: 'D9D9D9',
      align: i === 1 ? AlignmentType.CENTER : undefined,
    })) }),
];
for (const s of sections) {
  rows.push(new TableRow({ children: [cell(s.title, {
    width: 10080, span: 5, bold: true, shade: 'EFE9DC', align: AlignmentType.CENTER,
  })] }));
  if (s.start) rows.push(new TableRow({ children: [cell(s.start, {
    width: 10080, span: 5, shade: 'EFE9DC', align: AlignmentType.CENTER,
  })] }));
  const num = s.title.split(' ')[0];
  s.steps.forEach(([doTxt, mkTxt], i) => {
    const stepId = `${num}.${i + 1}`;
    const mark = existingMarks[stepId] || '';
    rows.push(new TableRow({ children: [
      cell(stepId, { width: COLS[0], bold: true }),
      cell(mark, { width: COLS[1], align: AlignmentType.CENTER }),
      cell(doTxt, { width: COLS[2], pad: true }),
      cell(mkTxt, { width: COLS[3], pad: true }),
      cell('', { width: COLS[4], pad: true }),
    ]}));
  });
}

const stepCount = sections.reduce((n, s) => n + s.steps.length, 0);

const indexParas = [
  new Paragraph({ children: [new TextRun({ text: 'Index', bold: true, size: 26 })] }),
  ...sections.map(s => {
    const n = s.steps.length;
    return new Paragraph({ children: [new TextRun({ text: `${s.title}, Steps 1–${n}`, size: 20 })] });
  }),
];

const doc = new Document({
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 },
      margin: { top: 1440, bottom: 1440, left: 1080, right: 1080 } } },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: 'Clues Tracker Sheet — Master Test Document', bold: true, size: 32 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: `Single-pass procedure. Step count: ${stepCount}.`, italics: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: 'Not affiliated with or endorsed by any board-game publisher or game.', italics: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: '⚠ Read each step’s "Make sure" BEFORE performing its "Do" — some responses it describes stay on screen only a few seconds. Know what to watch for before you tap.', bold: true })] }),
      new Paragraph({ children: [] }),
      ...indexParas,
      new Paragraph({ children: [] }),
      new Table({ columnWidths: COLS, width: { size: 10080, type: WidthType.DXA }, rows }),
    ],
  }],
});

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync('/tmp/clues-tracker-master-test.docx', b);
  fs.writeFileSync(OUT, b);
  const kept = Object.keys(existingMarks).filter(k => existingMarks[k]).length;
  console.log(`Wrote ${stepCount} steps to ${OUT} (carried forward ${kept} marks; √/X centered)`);
});
