import { alphaConversion } from '../src/interpreter/alphaConversion';
import { parse } from '../src/interpreter/parser';
import { Abstraction } from '../src/types';

describe('Alpha Conversion', () => {
  test('performs alpha conversion on simple abstraction', () => {
    const expr = parse('(λx.x)') as Abstraction;
    const result = alphaConversion(expr);
    expect(result.parameter).not.toBe('x');
    expect(result.body).toBe(result.parameter);
  });

  test('performs alpha conversion on nested abstraction', () => {
    const expr = parse('(λx.(λy.x))') as Abstraction;
    const result = alphaConversion(expr);
    expect(result.parameter).not.toBe('x');
    expect((result.body as Abstraction).body).toBe(result.parameter);
  });

  test('does not modify unrelated variables', () => {
    const expr = parse('(λx.(y z))') as Abstraction;
    const result = alphaConversion(expr);
    expect(result.parameter).not.toBe('x');
    expect(result.body).toEqual({
      type: 'application',
      left: 'y',
      right: 'z',
    });
  });
});
