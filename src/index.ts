import arabicReference from './unicode-arabic';
import ligatureReference from './unicode-ligatures';

const letterList = Object.keys(arabicReference);

const arabicBlocks = [
  [0x0600, 0x06FF], // Arabic https://www.unicode.org/charts/PDF/U0600.pdf
  [0x0750, 0x077F], // supplement https://www.unicode.org/charts/PDF/U0750.pdf
  [0x08A0, 0x08FF], // Extended-A https://www.unicode.org/charts/PDF/U08A0.pdf
  [0xFB50, 0xFDFF], // Presentation Forms-A https://www.unicode.org/charts/PDF/UFB50.pdf
  [0xFE70, 0xFEFF], // Presentation Forms-B https://www.unicode.org/charts/PDF/UFE70.pdf
  [0x10E60, 0x10E7F], // Rumi numerals https://www.unicode.org/charts/PDF/U10E60.pdf
  [0x1EC70, 0x1ECBF], // Indic Siyaq numerals https://www.unicode.org/charts/PDF/U1EC70.pdf
  [0x1EE00, 0x1EEFF] // Mathematical Alphabetic symbols https://www.unicode.org/charts/PDF/U1EE00.pdf
];

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

const isArabic = function (char : string) {
  let code = char.charCodeAt(0);
  for (let i = 0; i < arabicBlocks.length; i++) {
    let block = arabicBlocks[i];
    if (code >= block[0] && code <= block[1]) {
      return true;
    }
  }
  return false;
}

export function GlyphSplitter (word : string) {
  let letters : Array<string> = [];
  let lastLetter = '';
  word.split('').forEach((letter) => {
    if (isArabic(letter)) {
      if (tashkeel.indexOf(letter) > -1) {
        letters[letters.length - 1] += letter;
      } else if (lastLetter.length && ((lams.indexOf(lastLetter) === 0 && alefs.indexOf(letter) > -1) || (lams.indexOf(lastLetter) > 0 && alefs.indexOf(letter) === 0))) {
        // valid LA forms
        letters[letters.length - 1] += letter;
      } else {
        letters.push(letter);
      }
    } else {
      letters.push(letter);
    }
    if (tashkeel.indexOf(letter) === -1) {
      lastLetter = letter;
    }
  });
  return letters;
}

export function BaselineSplitter (word : string) {
  let letters : Array<string> = [];
  let lastLetter = '';

  word.split('').forEach((letter) => {
    if (isArabic(letter) && isArabic(lastLetter)) {
      if (lastLetter.length && tashkeel.indexOf(letter) > -1) {
        letters[letters.length - 1] += letter;
      } else if (lineBreakers.indexOf(lastLetter) > -1) {
        letters.push(letter);
      } else {
        letters[letters.length - 1] += letter;
      }
    } else {
      letters.push(letter);
    }

    if (tashkeel.indexOf(letter) === -1) {
      // don't allow tashkeel to hide line break
      lastLetter = letter;
    }
  });
  return letters;
}

export function Normal (word: string, breakPresentationForm?: boolean) {
  if (typeof breakPresentationForm === 'undefined') {
    breakPresentationForm = true;
  }

  let returnable = '';
  word.split('').forEach((letter) => {
    if (!isArabic(letter)) {
      returnable += letter;
      return;
    }

    for (let w = 0; w < letterList.length; w++) {
      // ok so we are checking this potential lettertron
      let letterForms = arabicReference[letterList[w]];
      let versions = Object.keys(letterForms);
      for (let v = 0; v < versions.length; v++) {
        let localVersion = letterForms[versions[v]];
        if (typeof localVersion === 'object' && typeof localVersion.indexOf === 'undefined') {
          // look at this embedded object
          let embeddedForms = Object.keys(localVersion);
          for (let ef = 0; ef < embeddedForms.length; ef++) {
            let form = localVersion[embeddedForms[ef]];
            if (form === letter || (typeof form === 'object' && form.indexOf && form.indexOf(letter) > -1)) {
              // match
              console.log('embedded match');
              if (form === letter) {
                // match exact
                if (breakPresentationForm && localVersion['normal'] && ['isolated', 'initial', 'medial', 'final'].indexOf(embeddedForms[ef]) > -1) {
                  // replace presentation form
                  console.log('keeping normal form of the letter');
                  if (typeof localVersion['normal'] === 'object') {
                    returnable += localVersion['normal'][0];
                  } else {
                    returnable += localVersion['normal'];
                  }
                  return;
                }
                console.log('keeping this letter');
                returnable += letter;
                return;
              } else if (typeof form === 'object' && form.indexOf && form.indexOf(letter) > -1) {
                // match
                returnable += form[0];
                console.log('added the first letter from the same array');
                return;
              }
            }
          }
        } else if (localVersion === letter) {
          // match exact
          if (breakPresentationForm && letterForms['normal'] && ['isolated', 'initial', 'medial', 'final'].indexOf(versions[v]) > -1) {
            // replace presentation form
            console.log('keeping normal form of the letter');
            if (typeof letterForms['normal'] === 'object') {
              returnable += letterForms['normal'][0];
            } else {
              returnable += letterForms['normal'];
            }
            return;
          }
          console.log('keeping this letter');
          returnable += letter;
          return;
        } else if (typeof localVersion === 'object' && localVersion.indexOf && localVersion.indexOf(letter) > -1) {
          // match
          returnable += localVersion[0];
          console.log('added the first letter from the same array');
          return;
        }
      }
    }
    returnable += letter;
    console.log('kept the letter')
  });
  return returnable;
}

export function CharShaper (letter: string, form: string) {
  if (!isArabic(letter)) {
    // fail not Arabic
    throw new Error('Not Arabic');
  }

  for (let w = 0; w < letterList.length; w++) {
    // ok so we are checking this potential lettertron
    let letterForms = arabicReference[letterList[w]];
    let versions = Object.keys(letterForms);

    for (let v = 0; v < versions.length; v++) {
      let localVersion = letterForms[versions[v]];
      if (localVersion === letter || (typeof localVersion === 'object' && localVersion.indexOf && localVersion.indexOf(letter) > -1)) {
        if (versions.indexOf(form) > -1) {
          return letterForms[form];
        }
      }
    }
  }
}

export function WordShaper (word: string) {
  let state = 'initial';
  let output = '';
  for (let w = 0; w < word.length; w++) {
    if (!isArabic(word[w])) {
      // space or other non-Arabic
      output += word[w];
      state = 'initial';
    } else if (tashkeel.indexOf(word[w]) > -1) {
      // tashkeel - add without changing state
      output += word[w];
    } else if ((w === word.length - 1) // last letter
      || (w < word.length - 1 && !isArabic(word[w + 1])) // next letter is space or other non-Arabic
      || (lineBreakers.indexOf(word[w]) > -1)) { // this letter is known to break lines

      output += CharShaper(word[w], state === 'initial' ? 'isolated' : 'final');
      state = 'initial';
    } else {
      output += CharShaper(word[w], state);
      state = 'medial';
    }
  }
  return output;
}

export function ParentLetter (word: string) {
  let returnable = '';
  word.split('').forEach((letter) => {
    if (!isArabic(letter)) {
      returnable += letter;
      return;
    }

    for (let w = 0; w < letterList.length; w++) {
      // ok so we are checking this potential lettertron
      let letterForms = arabicReference[letterList[w]];
      let versions = Object.keys(letterForms);
      for (let v = 0; v < versions.length; v++) {
        let localVersion = letterForms[versions[v]];
        if (typeof localVersion === 'object' && typeof localVersion.indexOf === 'undefined') {
          // look at this embedded object
          let embeddedForms = Object.keys(localVersion);
          for (let ef = 0; ef < embeddedForms.length; ef++) {
            let form = localVersion[embeddedForms[ef]];
            if (form === letter || (typeof form === 'object' && form.indexOf && form.indexOf(letter) > -1)) {
              // match
              console.log('embedded match');
              if (localVersion['normal']) {
                if (typeof localVersion['normal'] === 'object') {
                  returnable += localVersion['normal'][0];
                  console.log('added the first normal letter from embed')
                  return;
                } else if (localVersion['normal'].length) {
                  returnable += localVersion['normal'];
                  console.log('added the only normal letter from embed')
                  return;
                }
              } else {
                console.log('kept the letter based on no change in embed');
                returnable += letter;
                return;
              }
            }
          }
        } else if (localVersion === letter || (typeof localVersion === 'object' && localVersion.indexOf && localVersion.indexOf(letter) > -1)) {
          // match
          if (letterForms['normal']) {
            if (typeof letterForms['normal'] === 'object') {
              returnable += letterForms['normal'][0];
              console.log('added the first normal letter')
              return;
            } else if (letterForms['normal'].length) {
              returnable += letterForms['normal'];
              console.log('added the only normal letter')
              return;
            }
          } else {
            console.log('kept the letter');
            returnable += letter;
            return;
          }
        }
      }
    }
    returnable += letter;
    console.log('kept the letter')
  });
  return returnable;
}
