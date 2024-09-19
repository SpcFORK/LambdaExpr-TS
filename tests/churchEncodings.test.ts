import {
  interpret,
  prettyPrint,
  churchNumeral,
  churchAdd,
  churchMult,
  churchPred,
  churchSub,
  churchToNumber,
  churchTrue,
  churchFalse,
  churchAnd,
  churchOr,
  churchNot,
  churchToBool
} from '../src/interpreter';

describe('Church Encodings', () => {
  test('Church numerals', () => {
    expect(churchToNumber(interpret(churchNumeral(0)))).toBe(0);
    expect(churchToNumber(interpret(churchNumeral(1)))).toBe(1);
    expect(churchToNumber(interpret(churchNumeral(5)))).toBe(5);
  });

  test('Church addition', () => {
    const result = interpret(`(${churchAdd} ${churchNumeral(2)} ${churchNumeral(3)})`);
    expect(churchToNumber(result)).toBe(5);
  });

  test('Church multiplication', () => {
    const result = interpret(`(${churchMult} ${churchNumeral(2)} ${churchNumeral(3)})`);
    expect(churchToNumber(result)).toBe(6);
  });

  test('Church predecessor', () => {
    const result = interpret(`(${churchPred} ${churchNumeral(3)})`);
    expect(churchToNumber(result)).toBe(2);
  });

  test('Church subtraction', () => {
    const result = interpret(`(${churchSub} ${churchNumeral(5)} ${churchNumeral(3)})`);
    expect(churchToNumber(result)).toBe(2);
  });

  test('Church booleans', () => {
    expect(churchToBool(interpret(churchTrue))).toBe(true);
    expect(churchToBool(interpret(churchFalse))).toBe(false);
  });

  test('Church AND operation', () => {
    expect(churchToBool(interpret(`(${churchAnd} ${churchTrue} ${churchTrue})`))).toBe(true);
    expect(churchToBool(interpret(`(${churchAnd} ${churchTrue} ${churchFalse})`))).toBe(false);
    expect(churchToBool(interpret(`(${churchAnd} ${churchFalse} ${churchTrue})`))).toBe(false);
    expect(churchToBool(interpret(`(${churchAnd} ${churchFalse} ${churchFalse})`))).toBe(false);
  });

  test('Church OR operation', () => {
    expect(churchToBool(interpret(`(${churchOr} ${churchTrue} ${churchTrue})`))).toBe(true);
    expect(churchToBool(interpret(`(${churchOr} ${churchTrue} ${churchFalse})`))).toBe(true);
    expect(churchToBool(interpret(`(${churchOr} ${churchFalse} ${churchTrue})`))).toBe(true);
    expect(churchToBool(interpret(`(${churchOr} ${churchFalse} ${churchFalse})`))).toBe(false);
  });

  test('Church NOT operation', () => {
    expect(churchToBool(interpret(`(${churchNot} ${churchTrue})`))).toBe(false);
    expect(churchToBool(interpret(`(${churchNot} ${churchFalse})`))).toBe(true);
  });
});
