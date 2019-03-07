import { CharShaper } from '../src';

test('Return isolated, initial, medial, and final forms of normal letter', () => {
  let val = CharShaper('\u0628', 'isolated');
  expect(val).toEqual("\uFE8F");

  val = CharShaper('\u0628', 'initial');
  expect(val).toEqual("\uFE91");

  val = CharShaper('\u0628', 'medial');
  expect(val).toEqual("\uFE92");

  val = CharShaper('\u0628', 'final');
  expect(val).toEqual("\uFE90");
});

test('Return final version of ە', () => {
  let val = CharShaper('\u06D5', 'final');
  expect(val).toEqual('\uFEEA');
});

//
// test('Return isolated, initial, medial, and final forms of not-normal letter', () => {
//   let val = CharShaper('', 'isolated');
//   expect(val).toEqual("\u0627");
//
//   val = CharShaper('', 'initial');
//   expect(val).toEqual("\u0627");
//
//   val = CharShaper('', 'medial');
//   expect(val).toEqual("\u0627");
//
//   val = CharShaper('', 'final');
//   expect(val).toEqual("\u0627");
// });
//
// test('Respond to missing forms of a letter', () => {
//   val = CharShaper('', 'medial');
//   expect(val).toEqual("\u0627");
//
//   val = CharShaper('', 'final');
//   expect(val).toEqual("\u0627");
// });
