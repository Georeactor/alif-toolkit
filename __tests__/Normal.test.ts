import { Normal } from '../src';

test('Return simplified characters of a letter', () => {
  let val = Normal("\u0673");
  expect(val).toEqual("\u0627\u065F");
});

test('Return simplified characters of a letter (using nested objects)', () => {
  let val = Normal("\u0622");
  expect(val).toEqual("\u0627\u0653");
});

test('Return standard version of an initial / final / medial form', () => {
  // default is to break initial / final / medial / isolated presentation form
  let val = Normal("\uFE9F");
  expect(val).toEqual("\u062C");

  val = Normal("\uFE9F", true);
  expect(val).toEqual("\u062C");

  val = Normal("\uFE9F", false);
  expect(val).toEqual("\uFE9F");
});

test('Keep Latin alphabet and tashkeel marks unchanged', () => {
  let val = Normal("\u062C\u0605");
  expect(val).toEqual("\u062C\u0605");

  val = Normal("hello world");
  expect(val).toEqual("hello world");
});

test('Return simplified characters of a text-shapeable ligature', () => {
  let val = Normal("\uFBEB");
  expect(val).toEqual("\u0626\u0627");
});

test('Return simplified characters of a full word ligature', () => {
  let val = Normal("\uFDF0");
  expect(val).toEqual("\u0635\u0644\u06D2");
});

/*
 now do parent/base letter with the broken code from before
*/
