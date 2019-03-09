import { isArabic, isMath } from './isArabic';
import { tashkeel, lineBreakers, lams, alefs } from './reference';
import { CharShaper } from './CharShaper';
import ligatureReference from './unicode-ligatures';

export function WordShaper (word: string) {
  let state = 'initial';
  let output = '';
  for (let w = 0; w < word.length; w++) {
    let nextLetter = ' ';
    for (let nxw = w + 1; nxw < word.length; nxw++) {
      if (!isArabic(word[nxw])) {
        break;
      }
      if (tashkeel.indexOf(word[nxw]) === -1) {
        nextLetter = word[nxw];
        break;
      }
    }

    if (!isArabic(word[w]) || isMath(word[w])) {
      // space or other non-Arabic
      output += word[w];
      state = 'initial';
    } else if (tashkeel.indexOf(word[w]) > -1) {
      // tashkeel - add without changing state
      output += word[w];
    } else if ((nextLetter === ' ') // last Arabic letter in this word
      || (lineBreakers.indexOf(word[w]) > -1)) { // the current letter is known to break lines

      output += CharShaper(word[w], state === 'initial' ? 'isolated' : 'final');
      state = 'initial';
    } else if (lams.indexOf(word[w]) > -1 && alefs.indexOf(nextLetter) > -1) {
      // LA letters - advance an additional letter after this
      output += ligatureReference[word[w] + nextLetter][(state === 'initial' ? 'isolated' : 'final')];
      while (word[w] !== nextLetter) {
        w++;
      }
      state = 'initial';
    } else {
      output += CharShaper(word[w], state);
      state = 'medial';
    }
  }
  return output;
}
