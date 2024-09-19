import { interpret, prettyPrint } from '../src/interpreter';

describe('Lambda Calculus Interpreter', () => {
  test('interprets identity function', () => {
    const result = interpret('((λx.x) y)');
    expect(prettyPrint(result)).toBe('y');
  });

  test('interprets nested abstractions', () => {
    const result = interpret('((λx.(λy.x)) a) b');
    expect(prettyPrint(result)).toBe('a');
  });

  test('interprets complex expression', () => {
    const result = interpret('((λx.(λy.(x y))) (λz.z)) w');
    expect(prettyPrint(result)).toBe('w');
  });

  test('handles free variables', () => {
    const result = interpret('(x y)');
    expect(prettyPrint(result)).toBe('(x y)');
  });

  test('pretty prints expressions correctly', () => {
    const expr1 = interpret('(λx.(x y))');
    expect(prettyPrint(expr1)).toBe('(λx.(x y))');

    const expr2 = interpret('((λx.(λy.(x y))) z)');
    expect(prettyPrint(expr2)).toBe('(λy.(z y))');
  });
});
