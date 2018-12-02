import { ParentLetter, GrandparentLetter } from '../src';

test('Return parent entry of a normal letter', () => {
  let val = ParentLetter("\u0627");
  expect(val["normal"][0]).toEqual("\u0627");
});

test('Return parent entry of a letter with built-in accent', () => {
  let val = ParentLetter("\u0622");
  expect(val["normal"][0]).toEqual("\u0627\u0653");
});

test('Return grandparent entry of a letter with built-in accent', () => {
  let val = GrandparentLetter("\u0622");
  expect(val["normal"][0]).toEqual("\u0627");
});
