import { LambdaExpression, Abstraction, Variable, isVariable, isAbstraction, isApplication, isChurchNumeral, isChurchBoolean, isOperator } from '../types';

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
  if (isVariable(expr)) {
    return expr === oldVar ? newVar : expr;
  } else if (isAbstraction(expr)) {
    return expr.parameter === oldVar
      ? expr
      : {
          type: 'abstraction',
          parameter: expr.parameter,
          body: replaceVariable(expr.body, oldVar, newVar),
        };
  } else if (isApplication(expr)) {
    return {
      type: 'application',
      left: replaceVariable(expr.left, oldVar, newVar),
      right: replaceVariable(expr.right, oldVar, newVar),
    };
  } else if (isChurchNumeral(expr) || isChurchBoolean(expr) || isOperator(expr)) {
    return expr; // These types don't contain variables, so we return them as-is
  }
  throw new Error(`Invalid LambdaExpression in alphaConversion: ${JSON.stringify(expr)}`);
}
