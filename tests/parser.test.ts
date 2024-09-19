import { parse } from '../src/interpreter/parser';
import { LambdaExpression } from '../src/types';

describe('Lambda Calculus Parser', () => {
  test('parses a variable', () => {
    const result = parse('x');
    expect(result).toBe('x');
  });

  test('parses an abstraction', () => {
    const result = parse('(λx.x)');
    expect(result).toEqual({
      type: 'abstraction',
      parameter: 'x',
      body: 'x',
    });
  });

  test('parses an application', () => {
    const result = parse('(x y)');
    expect(result).toEqual({
      type: 'application',
      left: 'x',
      right: 'y',
    });
  });

  test('parses a complex expression', () => {
    const result = parse('((λx.(λy.(x y))) z)');
    const expected: LambdaExpression = {
      type: 'application',
      left: {
        type: 'abstraction',
        parameter: 'x',
        body: {
          type: 'abstraction',
          parameter: 'y',
          body: {
            type: 'application',
            left: 'x',
            right: 'y',
          },
        },
      },
      right: 'z',
    };
    expect(result).toEqual(expected);
  });

  test('throws error on invalid input', () => {
    expect(() => parse('')).toThrow('Empty input');
    expect(() => parse('(x')).toThrow('Mismatched parentheses');
    expect(() => parse('λx.x')).toThrow('Invalid lambda expression');
  });
});
