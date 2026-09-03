const fs = require('fs');
const goodLines = fs.readFileSync('c:/Users/t.schueler/Desktop/ap2-tracker-main/ap2-tracker-main/simulation/recovered_code.js', 'utf8').split('\n').slice(0, 604);
const brokenLines = fs.readFileSync('c:/Users/t.schueler/Desktop/ap2-tracker-main/ap2-tracker-main/exam_2023_1_GA2.js', 'utf8').split('\n').slice(604);
const fixedBrokenLines = brokenLines.map(line => line.split('\\\\').join('\'));
let finalLines = goodLines.concat(fixedBrokenLines);
// Now we replace '\\\\n' with '\\n' in the WHOLE file, so that the UI shows real line breaks.
// Wait! If we replace '\\\\n' with '\\n', it replaces all 'two backslashes + n' with 'one backslash + n'.
const finalStr = finalLines.join('\n').split('\\\\n').join('\\n');
fs.writeFileSync('c:/Users/t.schueler/Desktop/ap2-tracker-main/ap2-tracker-main/simulation/exam_2023_1_GA2.js', finalStr, 'utf8');
