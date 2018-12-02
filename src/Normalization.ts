import arabicReference from './unicode-arabic';
import ligatureReference from './unicode-ligatures';

import { isArabic } from './isArabic';
import { letterList, ligatureList, ligatureWordList } from './reference';

export function Normal (word: string, breakPresentationForm?: boolean) {
  // default is to turn initial/isolated/medial/final presentation form to generic
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
              // console.log('embedded match');
              if (form === letter) {
                // match exact
                if (breakPresentationForm && localVersion['normal'] && ['isolated', 'initial', 'medial', 'final'].indexOf(embeddedForms[ef]) > -1) {
                  // replace presentation form
                  // console.log('keeping normal form of the letter');
                  if (typeof localVersion['normal'] === 'object') {
                    returnable += localVersion['normal'][0];
                  } else {
                    returnable += localVersion['normal'];
                  }
                  return;
                }
                // console.log('keeping this letter');
                returnable += letter;
                return;
              } else if (typeof form === 'object' && form.indexOf && form.indexOf(letter) > -1) {
                // match
                returnable += form[0];
                // console.log('added the first letter from the same array');
                return;
              }
            }
          }
        } else if (localVersion === letter) {
          // match exact
          if (breakPresentationForm && letterForms['normal'] && ['isolated', 'initial', 'medial', 'final'].indexOf(versions[v]) > -1) {
            // replace presentation form
            // console.log('keeping normal form of the letter');
            if (typeof letterForms['normal'] === 'object') {
              returnable += letterForms['normal'][0];
            } else {
              returnable += letterForms['normal'];
            }
            return;
          }
          // console.log('keeping this letter');
          returnable += letter;
          return;
        } else if (typeof localVersion === 'object' && localVersion.indexOf && localVersion.indexOf(letter) > -1) {
          // match
          returnable += localVersion[0];
          // console.log('added the first letter from the same array');
          return;
        }
      }
    }
    // try ligatures
    for (let v2 = 0; v2 < ligatureList.length; v2++) {
      let normalForm = ligatureList[v2];

      if (normalForm !== 'words') {
        let ligForms = Object.keys(ligatureReference[normalForm]);
        for (let f = 0; f < ligForms.length; f++) {
          if (ligatureReference[normalForm][ligForms[f]] === letter) {
            returnable += normalForm;
            return;
          }
        }
      }
    }
    // try words ligatures
    for (let v3 = 0; v3 < ligatureWordList.length; v3++) {
      let normalForm = ligatureWordList[v3];
      if (ligatureReference.words[normalForm] === letter) {
        returnable += normalForm;
        return;
      }
    }

    returnable += letter;
    // console.log('kept the letter')
  });
  return returnable;
}
