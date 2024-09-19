import { LambdaExpression, Abstraction, Application } from './types';
import { parse } from './interpreter/parser';
import { evaluate } from './interpreter/evaluator';

export function interpret(input: string): LambdaExpression {
  const parsed = parse(input);
  return evaluate(parsed);
}

export function prettyPrint(expr: LambdaExpression): string {
  if (typeof expr === 'string') {
    return expr;
  } else if (expr.type === 'abstraction') {
    return `(λ${expr.parameter}.${prettyPrint(expr.body)})`;
  } else if (expr.type === 'application') {
    return `(${prettyPrint(expr.left)} ${prettyPrint(expr.right)})`;
  }
  throw new Error('Invalid LambdaExpression');
}
