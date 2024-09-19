import { betaReduction } from '../src/interpreter/betaReduction';
import { parse } from '../src/interpreter/parser';
import { Abstraction, LambdaExpression } from '../src/types';

describe('Beta Reduction', () => {
  test('performs beta reduction on simple application', () => {
    const abstraction = parse('(λx.x)') as Abstraction;
    const argument = parse('y');
    const result = betaReduction(abstraction, argument);
    expect(result).toBe('y');
  });

  test('performs beta reduction with nested abstraction', () => {
    const abstraction = parse('(λx.(λy.x))') as Abstraction;
    const argument = parse('z');
    const result = betaReduction(abstraction, argument);
    expect(result).toEqual({
      type: 'abstraction',
      parameter: 'y',
      body: 'z',
    });
  });

  test('performs beta reduction with complex expression', () => {
    const abstraction = parse('(λx.(x (λy.y)))') as Abstraction;
    const argument = parse('(λz.z)');
    const result = betaReduction(abstraction, argument);
    expect(result).toEqual({
      type: 'application',
      left: {
        type: 'abstraction',
        parameter: 'z',
        body: 'z',
      },
      right: {
        type: 'abstraction',
        parameter: 'y',
        body: 'y',
      },
    });
  });
});
