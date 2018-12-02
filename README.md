# alif-toolkit

[![Greenkeeper badge](https://badges.greenkeeper.io/Georeactor/alif-toolkit.svg)](https://greenkeeper.io/)

## Origin

When I made <a href="https://github.com/mapmeld/crossword-unicode">crossword-unicode</a>
 and <a href="https://github.com/mapmeld/wiki-crossword">wiki-crossword</a>
(which generates crossword puzzles from scraping random Wikipedia articles),
Arabic script posed some interesting challenges. I open sourced my work, but
it started me thinking about more general data and tools to make it easier to
build language games for Arabic-script languages.

This module contains normalization and text-shaping options, for the
first time in MIT-licensed JavaScript / TypeScript.

## Setup

- npm install alif-toolkit

## Usage

```javascript
import {
  isArabic,
  BaselineSplitter,
  GlyphSplitter,
  Normal,
  CharShaper,
  WordShaper,
  ParentLetter,
  GrandparentLetter
} from 'alif-toolkit';

// splitters
let val = BaselineSplitter('كرة');
expect(val).toEqual(['كر','ة']);

let val2 = GlyphSplitter('كرة بلوخ');
expect(val2).toEqual(['ك','ر','ة',' ','ب','ل','و','خ']);

// normalization

// this is an alif + accent which can be split into two more common chars
let val3 = Normal("\u0673");
expect(val3).toEqual("\u0627\u065F");

// this is a presentation form (isolated, initial, medial, final)
// by default it is replaced by the standard typed letter
let val4 = Normal("\uFE9F");
expect(val4).toEqual("\u062C");

// you can tell Normal not to change any presentation forms
let val5 = Normal("\uFE9F", false);
expect(val5).toEqual("\uFE9F");


// text-shaping - individual characters
let val6 = CharShaper("\u062C", "initial");
expect(val6).toEqual("\uFE9F");

// text-shaping - words with context
let val7 = WordShaper("\u062C\u062C\u062C");
expect(val7).toEqual("\uFE9F\uFEA0\uFE9E");

// char in any Arabic Unicode range? (normal, extended, presentation forms)
if (isArabic(myChar)) { }
word.forEach((letter) => {
  if (!isArabic(letter)) {
    // not all Arabic in this string
  }
});

// parent / grandparent entry in the Unicode JSON reference
let alif = "\u0627",
    alifOptions = ParentLetter(alif);
console.log(alif["final"]);
console.log(alif["wavy_hamza_above"]);

let alif_hamza_below_isolated = "\uFE87",
    alif_hamza_below = ParentLetter(alif_hamza_below_isolated),
    alif = GrandparentLetter(alif_hamza_below_isolated);
```

### Examples

TODO: alif-word-bank
- Fill-in-the-blanks example
- Animals crossword example

## License

Content / data largely CC-BY-SA Wikipedia, Wiktionary, and Kiwix

Code open sourced under an MIT license
