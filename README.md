# alif-toolkit

[![Greenkeeper badge](https://badges.greenkeeper.io/Georeactor/alif-toolkit.svg)](https://greenkeeper.io/)

## Origin

When I made <a href="https://github.com/mapmeld/crossword-unicode">crossword-unicode</a>
 and <a href="https://github.com/mapmeld/wiki-crossword">wiki-crossword</a>
(which generates crossword puzzles from scraping random Wikipedia articles),
Arabic script posed some interesting challenges. I open sourced my work, but
it started me thinking about more general data and tools to make it easier to
build language games for Arabic-script languages.

Consider these game ideas:

- Crossword puzzles for younger students with names of animals
- Fill-in-the-blank where the neighboring letters should show connecting forms (for example "العَرَبِ_ة‎" vs "العَرَ بـ_ـة‎")
- A game where you add long vowels or tashkeel marks
- Games which show and hide tashkeel based on skill level
- Games which should support Arabic, Farsi, Urdu, and Pashto words

## Goals

- Open queryable word bank, based on Wikipedia and Wiktionary
- Multiple categories on words (animals / cities / countries)
- Shared word banks (visible to check for inappropriate words)
- Breakdowns of words into individual letters, glyphs (such as LA), text-shaped letters
- Tashkeel options
- English and Chinese translations

## Setup

- Download a Wikipedia no-pictures dataset from Kiwix
- npm install
- npm run import-words
- generate records into MongoDB

## Usage

```javascript
import { BaselineSplitter, GlyphSplitter, Normal } from 'alif-toolkit';

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
```

### Examples

- Fill-in-the-blanks example
- Animals crossword example

## Technology

MongoDB

## License

Content / data largely CC-BY-SA Wikipedia, Wiktionary, and Kiwix

Code open sourced under an MIT license
