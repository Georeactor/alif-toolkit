import arabicReference from './unicode-arabic';
import { isArabic } from './isArabic';
import { letterList } from './reference';

export function ParentLetter (letter: string) {
  if (!isArabic(letter)) {
    throw new Error('Not an Arabic letter');
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
            return localVersion;
          }
        }
      } else if (localVersion === letter || (typeof localVersion === 'object' && localVersion.indexOf && localVersion.indexOf(letter) > -1)) {
        // match
        return letterForms;
      }
    }
    return null;
  }
}

export function GrandparentLetter (letter: string) {
  if (!isArabic(letter)) {
    throw new Error('Not an Arabic letter');
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
            return letterForms;
          }
        }
      } else if (localVersion === letter || (typeof localVersion === 'object' && localVersion.indexOf && localVersion.indexOf(letter) > -1)) {
        // match
        return letterForms;
      }
    }
    return null;
  }
}
