import { isArabic } from './isArabic';
import { tashkeel, lineBreakers } from './reference';
import { CharShaper } from './CharShaper';

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
