import { WordShaper } from '../src';

test('Return initial, medial, and final versions of a letter written 3x', () => {
  let val = WordShaper("\u062C\u062C\u062C");
  expect(val).toEqual("\uFE9F\uFEA0\uFE9E");
});

test('Return isolated version of a letter written 1x', () => {
  let val = WordShaper("\u062C");
  expect(val).toEqual("\uFE9D");
});

test('LA by itself', () => {
  let val = WordShaper("لا");
  expect(val).toEqual("\uFEFB");
});

test('LA at start of word', () => {
  let val = WordShaper("لاو");
  expect(val).toEqual("\uFEFB\uFEED");
});

test('LA at end of word', () => {
  let val = WordShaper("آهنغركلا");
  expect(val[val.length - 1]).toEqual("\uFEFC")
});
