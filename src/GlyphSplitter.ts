import { isArabic } from './isArabic';
import { tashkeel, lams, alefs } from './reference';

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
