import { LambdaExpression, Abstraction, Variable } from '../types';

let uniqueCounter = 0;

export function alphaConversion(expr: Abstraction): Abstraction {
  const newParam = generateUniqueVariable(expr.parameter);
  return {
    type: 'abstraction',
    parameter: newParam,
    body: replaceVariable(expr.body, expr.parameter, newParam),
  };
}

function generateUniqueVariable(base: string): string {
  return `${base}_${uniqueCounter++}`;
}

function replaceVariable(expr: LambdaExpression, oldVar: Variable, newVar: Variable): LambdaExpression {
  switch (expr.type) {
    case 'abstraction':
      return expr.parameter === oldVar
        ? expr
        : {
            type: 'abstraction',
            parameter: expr.parameter,
            body: replaceVariable(expr.body, oldVar, newVar),
          };
    case 'application':
      return {
        type: 'application',
        left: replaceVariable(expr.left, oldVar, newVar),
        right: replaceVariable(expr.right, oldVar, newVar),
      };
    default:
      return expr === oldVar ? newVar : expr;
  }
}
