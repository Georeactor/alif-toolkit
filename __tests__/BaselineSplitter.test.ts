import { BaselineSplitter } from '../src';

test('Split a word into baseline sections', () => {
  let val = BaselineSplitter('كرة');
  expect(val).toEqual(['كر','ة']);
});

test('Split a word into baseline sections including spaces', () => {
  let val = BaselineSplitter('كرة بلوخ');
  expect(val).toEqual(['كر','ة',' ','بلو','خ']);
});

test('Split a word into baseline sections, including tashkeel', () => {
  let val = BaselineSplitter('العَرَبِيَّة');
  expect(val).toEqual(['ا','لعَرَ','بِيَّة']);
});
