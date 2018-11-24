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

test('Return simplified characters of a ligature', () => {

});

/*
 now do parent letter with the broken code from before
*/
