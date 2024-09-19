import { parse } from '../src/interpreter/parser';
import { LambdaExpression } from '../src/types';

describe('Lambda Calculus Parser', () => {
  test('parses a variable', () => {
    const result = parse('x');
    expect(result).toBe('x');
  });

  test('parses an abstraction with parentheses', () => {
    const result = parse('(λx.x)');
    expect(result).toEqual({
      type: 'abstraction',
      parameter: 'x',
      body: 'x',
    });
  });

  test('parses an abstraction without parentheses', () => {
    const result = parse('λx.x');
    expect(result).toEqual({
      type: 'abstraction',
      parameter: 'x',
      body: 'x',
    });
  });

  test('parses an application with parentheses', () => {
    const result = parse('((x) (y))');
    expect(result).toEqual({
      type: 'application',
      left: 'x',
      right: 'y',
    });
  });

  test('parses an application without parentheses', () => {
    const result = parse('x y');
    expect(result).toEqual({
      type: 'application',
      left: 'x',
      right: 'y',
    });
  });

  test('parses a complex expression with nested abstractions', () => {
    const result = parse('λx.λy.x y');
    const expected: LambdaExpression = {
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
    };
    expect(result).toEqual(expected);
  });

  test('parses a complex expression with nested applications', () => {
    const result = parse('((λx.x) y) z');
    const expected: LambdaExpression = {
      type: 'application',
      left: {
        type: 'application',
        left: {
          type: 'abstraction',
          parameter: 'x',
          body: 'x',
        },
        right: 'y',
      },
      right: 'z',
    };
    expect(result).toEqual(expected);
  });

  test('throws error on invalid input', () => {
    expect(() => parse('')).toThrow('Unexpected end of input');
    expect(() => parse('(x')).toThrow('Missing closing parenthesis');
    expect(() => parse('λx')).toThrow('Invalid abstraction syntax');
    expect(() => parse('λ.x')).toThrow('Invalid abstraction syntax');
    expect(() => parse('x y)')).toThrow('Unexpected tokens: )');
  });
});
