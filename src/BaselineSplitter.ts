import { isArabic } from './isArabic';
import { tashkeel, lineBreakers } from './reference';

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
