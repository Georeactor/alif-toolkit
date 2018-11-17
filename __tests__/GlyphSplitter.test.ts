import { GlyphSplitter } from '../src';

test('Split not-Arabic chars', () => {
  let val = GlyphSplitter('abc');
  expect(val).toEqual(['a', 'b', 'c']);
});

test('Split a word into letters', () => {
  let val = GlyphSplitter('كرة بلوخ');
  expect(val).toEqual(['ك','ر','ة',' ','ب','ل','و','خ']);
});

test('Split a word and numbers into glyphs', () => {
  let val = GlyphSplitter('ك١');
  expect(val).toEqual(['ك','١']);

  let val2 = GlyphSplitter('ك');
  expect(val2).toEqual(['ك','']);
});

test('Split a word into letters, with their tashkeel', () => {
  let val = GlyphSplitter('العَرَبِيَّة');
  expect(val).toEqual(['ا','ل','عَ','رَ','بِ','يَّ','ة']);
});

test('Split a word into letters, not breaking any LA form', () => {
  expect(GlyphSplitter('لا').length).toBe(1);
  expect(GlyphSplitter('لا').length).toBe(1);
  expect(GlyphSplitter('ل\u0622').length).toBe(1);
  expect(GlyphSplitter('ل\u0623').length).toBe(1);
  expect(GlyphSplitter('ل\u0625').length).toBe(1);
  expect(GlyphSplitter('ل\u0671').length).toBe(1);
  expect(GlyphSplitter('ل\u0672').length).toBe(1);
  expect(GlyphSplitter('ل\u0673').length).toBe(1);
  expect(GlyphSplitter('ل\u0675').length).toBe(1);
  expect(GlyphSplitter('ل\u0773').length).toBe(1);
  expect(GlyphSplitter('ل\u0774').length).toBe(1);
});

// presentation forms?
