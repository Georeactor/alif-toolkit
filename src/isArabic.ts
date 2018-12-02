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

export function isArabic (char : string) {
  if (char.length > 2) {
    // allow the newer numerals which appear to have length=2
    throw new Error('isArabic works on only one-character strings');
  }
  let code = char.charCodeAt(0);
  for (let i = 0; i < arabicBlocks.length; i++) {
    let block = arabicBlocks[i];
    if (code >= block[0] && code <= block[1]) {
      return true;
    }
  }
  return false;
}
