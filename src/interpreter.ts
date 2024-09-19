import { LambdaExpression } from './types';
import { parse } from './interpreter/parser';
import { evaluate } from './interpreter/evaluator';

export function interpret(input: string): LambdaExpression {
  const parsed = parse(input);
  return evaluate(parsed);
}

export function prettyPrint(expr: LambdaExpression): string {
  switch (expr.type) {
    case 'abstraction':
      return `(λ${expr.parameter}.${prettyPrint(expr.body)})`;
    case 'application':
      return `(${prettyPrint(expr.left)} ${prettyPrint(expr.right)})`;
    default:
      return expr;
  }
}
