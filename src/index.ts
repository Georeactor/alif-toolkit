export { isArabic } from './isArabic';
export { GlyphSplitter } from './GlyphSplitter';
export { BaselineSplitter } from './BaselineSplitter';
export { Normal } from './Normalization';
export { CharShaper } from './CharShaper';
export { WordShaper } from './WordShaper';
//
// export function ParentLetter (word: string) {
//   let returnable = '';
//   word.split('').forEach((letter) => {
//     if (!isArabic(letter)) {
//       returnable += letter;
//       return;
//     }
//
//     for (let w = 0; w < letterList.length; w++) {
//       // ok so we are checking this potential lettertron
//       let letterForms = arabicReference[letterList[w]];
//       let versions = Object.keys(letterForms);
//       for (let v = 0; v < versions.length; v++) {
//         let localVersion = letterForms[versions[v]];
//         if (typeof localVersion === 'object' && typeof localVersion.indexOf === 'undefined') {
//           // look at this embedded object
//           let embeddedForms = Object.keys(localVersion);
//           for (let ef = 0; ef < embeddedForms.length; ef++) {
//             let form = localVersion[embeddedForms[ef]];
//             if (form === letter || (typeof form === 'object' && form.indexOf && form.indexOf(letter) > -1)) {
//               // match
//               console.log('embedded match');
//               if (localVersion['normal']) {
//                 if (typeof localVersion['normal'] === 'object') {
//                   returnable += localVersion['normal'][0];
//                   console.log('added the first normal letter from embed')
//                   return;
//                 } else if (localVersion['normal'].length) {
//                   returnable += localVersion['normal'];
//                   console.log('added the only normal letter from embed')
//                   return;
//                 }
//               } else {
//                 console.log('kept the letter based on no change in embed');
//                 returnable += letter;
//                 return;
//               }
//             }
//           }
//         } else if (localVersion === letter || (typeof localVersion === 'object' && localVersion.indexOf && localVersion.indexOf(letter) > -1)) {
//           // match
//           if (letterForms['normal']) {
//             if (typeof letterForms['normal'] === 'object') {
//               returnable += letterForms['normal'][0];
//               console.log('added the first normal letter')
//               return;
//             } else if (letterForms['normal'].length) {
//               returnable += letterForms['normal'];
//               console.log('added the only normal letter')
//               return;
//             }
//           } else {
//             console.log('kept the letter');
//             returnable += letter;
//             return;
//           }
//         }
//       }
//     }
//     returnable += letter;
//     // console.log('kept the letter')
//   });
//   return returnable;
// }
