import { evaluate } from '../src/interpreter/evaluator';
import { parse } from '../src/interpreter/parser';
import { LambdaExpression } from '../src/types';

describe('Lambda Calculus Evaluator', () => {
  test('evaluates identity function', () => {
    const expr = parse('((λx.x) y)');
    const result = evaluate(expr);
    expect(result).toBe('y');
  });

  test('evaluates nested abstractions', () => {
    const expr = parse('((λx.(λy.x)) a) b');
    const result = evaluate(expr);
    expect(result).toBe('a');
  });

  test('evaluates complex expression', () => {
    const expr = parse('((λx.(λy.(x y))) (λz.z)) w');
    const result = evaluate(expr);
    expect(result).toBe('w');
  });

  test('handles free variables', () => {
    const expr = parse('(x y)');
    const result = evaluate(expr);
    expect(result).toEqual({
      type: 'application',
      left: 'x',
      right: 'y',
    });
  });
});
