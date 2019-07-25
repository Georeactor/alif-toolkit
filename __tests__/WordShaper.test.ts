import { WordShaper } from '../src';

test('Return initial, medial, and final versions of a letter written 3x', () => {
  let val = WordShaper("\u062C\u062C\u062C");
  expect(val).toEqual("\uFE9F\uFEA0\uFE9E");
});

test('Return isolated version of a letter written 1x', () => {
  let val = WordShaper("\u062C");
  expect(val).toEqual("\uFE9D");
});

test('Shaped does not come back undefined', () => {
  // one was caused by a letter marked "inital" and not "initial"
  // other by hamza-alone
  // other by embedded letter
  let val = WordShaper("اوبروکرزه"),
      val2 = WordShaper("البؤساء"),
      val3 = WordShaper("فیء");

  expect(val.indexOf("undefined")).toEqual(-1);
  expect(val2.indexOf("undefined")).toEqual(-1);
  expect(val3.indexOf("undefined")).toEqual(-1);
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

test('road label with unusual char', () => {
  let val = WordShaper("حەیدەری");
  expect(val).toEqual("ﺣﻪﯾﺪەﺭﯼ");
});

test('Arabic digits', () => {
  let val = WordShaper("\u0661\u0662\u0663");
  expect(val).toEqual("١٢٣");
});

test('Arabic text and digits', () => {
  let val = WordShaper('خیابان ارمغان ۳');
  expect(val).toEqual('ﺧﯿﺎﺑﺎﻥ ﺍﺭﻣﻐﺎﻥ ۳');
});
