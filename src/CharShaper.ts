import arabicReference from './unicode-arabic';
import { isArabic } from './isArabic';
import { letterList } from './reference';

export function CharShaper (letter: string, form: string) {
  if (!isArabic(letter)) {
    // fail not Arabic
    throw new Error('Not Arabic');
  }

  if (letter === "\u0621") {
    // hamza alone
    return "\u0621";
  }
  
  for (let w = 0; w < letterList.length; w++) {
    // ok so we are checking this potential lettertron
    let letterForms = arabicReference[letterList[w]];
    let versions = Object.keys(letterForms);

    for (let v = 0; v < versions.length; v++) {
      let localVersion = letterForms[versions[v]];
      if ((localVersion === letter) ||
          (typeof localVersion === 'object' && localVersion.indexOf && localVersion.indexOf(letter) > -1)) {
        if (versions.indexOf(form) > -1) {
          return letterForms[form];
        }
      } else if (typeof localVersion === 'object' && typeof localVersion.indexOf === 'undefined') {
        // check embedded
        let embeddedVersions = Object.keys(localVersion);
        for (let ev = 0; ev < embeddedVersions.length; ev++) {
          if ((localVersion[embeddedVersions[ev]] === letter) ||
              (typeof localVersion[embeddedVersions[ev]] === 'object' && localVersion[embeddedVersions[ev]].indexOf && localVersion[embeddedVersions[ev]].indexOf(letter) > -1)) {
            if (embeddedVersions.indexOf(form) > -1) {
              return localVersion[form];
            }
          }
        }
      }
    }
  }
}
