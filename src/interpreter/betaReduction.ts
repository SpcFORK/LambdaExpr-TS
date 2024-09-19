import { LambdaExpression, Abstraction, Application, Variable } from '../types';

export function betaReduction(abstraction: Abstraction, argument: LambdaExpression): LambdaExpression {
  return substitute(abstraction.body, abstraction.parameter, argument);
}

function substitute(expr: LambdaExpression, variable: Variable, replacement: LambdaExpression): LambdaExpression {
  switch (expr.type) {
    case 'abstraction':
      return expr.parameter === variable
        ? expr
        : {
            type: 'abstraction',
            parameter: expr.parameter,
            body: substitute(expr.body, variable, replacement),
          };
    case 'application':
      return {
        type: 'application',
        left: substitute(expr.left, variable, replacement),
        right: substitute(expr.right, variable, replacement),
      };
    default:
      return expr === variable ? replacement : expr;
  }
}
