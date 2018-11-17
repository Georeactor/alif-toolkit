import { GlyphSplitter } from '../src';

test('Split not-Arabic chars', () => {
  let val = GlyphSplitter('abc');
  expect(val).toEqual(['a', 'b', 'c']);
});

test('Split a word into letters', () => {
  let val = GlyphSplitter('كرة بلوخ');
  expect(val).toEqual(['ك','ر','ة',' ','ب','ل','و','خ']);
});

test('Split a word into letters, with their tashkeel', () => {
  let val = GlyphSplitter('العَرَبِيَّة');
  expect(val).toEqual(['ا','ل','عَ','رَ','بِ','يَّ','ة']);
});

test('Split a word into letters, not breaking any LA form', () => {
  let val = GlyphSplitter('abc');
  expect(val).toEqual(['a', 'b', 'c']);
});

test('Split a word into letters, keeping presentation forms', () => {
  let val = GlyphSplitter('abc');
  expect(val).toEqual(['a', 'b', 'c']);
});
