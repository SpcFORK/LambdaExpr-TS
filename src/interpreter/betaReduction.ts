import { LambdaExpression, Abstraction, Application, Variable, isVariable, isAbstraction, isApplication } from '../types';

export function betaReduction(abstraction: Abstraction, argument: LambdaExpression): LambdaExpression {
  return substitute(abstraction.body, abstraction.parameter, argument);
}

function substitute(expr: LambdaExpression, variable: Variable, replacement: LambdaExpression): LambdaExpression {
  if (isVariable(expr)) {
    return expr === variable ? replacement : expr;
  } else if (isAbstraction(expr)) {
    return expr.parameter === variable
      ? expr
      : {
          type: 'abstraction',
          parameter: expr.parameter,
          body: substitute(expr.body, variable, replacement),
        };
  } else if (isApplication(expr)) {
    return {
      type: 'application',
      left: substitute(expr.left, variable, replacement),
      right: substitute(expr.right, variable, replacement),
    };
  }
  throw new Error('Invalid LambdaExpression');
}
