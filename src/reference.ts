import arabicReference from './unicode-arabic';
import ligatureReference from './unicode-ligatures';

const letterList = Object.keys(arabicReference);
const ligatureList = Object.keys(ligatureReference);
const ligatureWordList = Object.keys(ligatureReference.words);

const lams = '\u0644\u06B5\u06B6\u06B7\u06B8';
const alefs = '\u0627\u0622\u0623\u0625\u0671\u0672\u0673\u0675\u0773\u0774';
// for (var l = 1; l < lams.length; l++) {
//   console.log('-');
//   for (var a = 0; a < alefs.length; a++) {
//     console.log(a + ': ' + lams[l] + alefs[a]);
//   }
// }

let tashkeel = '\u0605\u0640\u0670\u0674\u06DF\u06E7\u06E8';
function addToTashkeel (start: number, finish: number) {
  for (var i = start; i <= finish; i++) {
    tashkeel += String.fromCharCode(i);
  }
}
addToTashkeel(0x0610, 0x061A);
addToTashkeel(0x064B, 0x065F);
addToTashkeel(0x06D6, 0x06DC);
addToTashkeel(0x06E0, 0x06E4);
addToTashkeel(0x06EA, 0x06ED);
addToTashkeel(0x08D3, 0x08E1);
addToTashkeel(0x08E3, 0x08FF);
addToTashkeel(0xFE70, 0xFE7F);

let lineBreakers = '\u0627\u0629\u0648\u06C0\u06CF\u06FD\u06FE\u076B\u076C\u0771\u0773\u0774\u0778\u0779\u08E2\u08B1\u08B2\u08B9';

function addToLineBreakers (start: number, finish: number) {
  for (var i = start; i <= finish; i++) {
    lineBreakers += String.fromCharCode(i);
  }
}
addToLineBreakers(0x0600, 0x061F); // it's OK to include tashkeel in this range as it is ignored
addToLineBreakers(0x0621, 0x0625);
addToLineBreakers(0x062F, 0x0632);
addToLineBreakers(0x0660, 0x066D); // numerals, math
addToLineBreakers(0x0671, 0x0677);
addToLineBreakers(0x0688, 0x0699);
addToLineBreakers(0x06C3, 0x06CB);
addToLineBreakers(0x06D2, 0x06F9);
addToLineBreakers(0x0759, 0x075B);
addToLineBreakers(0x08AA, 0x08AE);
addToLineBreakers(0xFB50, 0xFDFD); // presentation forms look like they could connect, but never do
// Presentation Forms A includes diacritics but they are meant to stand alone
addToLineBreakers(0xFE80, 0xFEFC); // presentation forms look like they could connect, but never do

// numerals, math
addToLineBreakers(0x10E60, 0x10E7F);
addToLineBreakers(0x1EC70, 0x1ECBF);
addToLineBreakers(0x1EE00, 0x1EEFF);

export { tashkeel, lineBreakers, lams, alefs, letterList, ligatureList, ligatureWordList };
