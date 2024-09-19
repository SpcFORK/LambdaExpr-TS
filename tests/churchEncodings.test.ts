import {
  interpret,
  prettyPrint,
  numeral,
  add,
  mult,
  pred,
  sub,
  toNumber,
  True,
  False,
  And,
  Or,
  Not,
  toBool
} from '../src/interpreter';

describe('Church Encodings', () => {
  test('Church numerals', () => {
    expect(toNumber(interpret(numeral(0)))).toBe(0);
    expect(toNumber(interpret(numeral(1)))).toBe(1);
    expect(toNumber(interpret(numeral(5)))).toBe(5);
  });

  test('Church addition', () => {
    const result = interpret(`(${add} ${numeral(2)} ${numeral(3)})`);
    expect(toNumber(result)).toBe(5);
  });

  test('Church multiplication', () => {
    const result = interpret(`(${mult} ${numeral(2)} ${numeral(3)})`);
    expect(toNumber(result)).toBe(6);
  });

  test('Church predecessor', () => {
    const result = interpret(`(${pred} ${numeral(3)})`);
    expect(toNumber(result)).toBe(2);
  });

  test('Church subtraction', () => {
    const result = interpret(`(${sub} ${numeral(5)} ${numeral(3)})`);
    expect(toNumber(result)).toBe(2);
  });

  test('Church booleans', () => {
    expect(toBool(interpret(True))).toBe(true);
    expect(toBool(interpret(False))).toBe(false);
  });

  test('Church AND operation', () => {
    expect(toBool(interpret(`(${And} ${True} ${True})`))).toBe(true);
    expect(toBool(interpret(`(${And} ${True} ${False})`))).toBe(false);
    expect(toBool(interpret(`(${And} ${False} ${True})`))).toBe(false);
    expect(toBool(interpret(`(${And} ${False} ${False})`))).toBe(false);
  });

  test('Church OR operation', () => {
    expect(toBool(interpret(`(${Or} ${True} ${True})`))).toBe(true);
    expect(toBool(interpret(`(${Or} ${True} ${False})`))).toBe(true);
    expect(toBool(interpret(`(${Or} ${False} ${True})`))).toBe(true);
    expect(toBool(interpret(`(${Or} ${False} ${False})`))).toBe(false);
  });

  test('Church NOT operation', () => {
    expect(toBool(interpret(`(${Not} ${True})`))).toBe(false);
    expect(toBool(interpret(`(${Not} ${False})`))).toBe(true);
  });
});
