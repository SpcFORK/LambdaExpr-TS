import { LambdaExpression, Abstraction, Application, isVariable, isAbstraction, isApplication, isChurchNumeral, isChurchBoolean, isOperator } from '../types';
import { alphaConversion } from './alphaConversion';
import { betaReduction } from './betaReduction';

export function evaluate(expr: LambdaExpression): LambdaExpression {
  if (isVariable(expr) || isChurchNumeral(expr) || isChurchBoolean(expr) || isOperator(expr)) {
    return expr;
  } else if (isAbstraction(expr)) {
    return { ...expr, body: evaluate(expr.body) };
  } else if (isApplication(expr)) {
    const evaledLeft = evaluate(expr.left);
    const evaledRight = evaluate(expr.right);
    if (isAbstraction(evaledLeft)) {
      const alphaConverted = alphaConversion(evaledLeft);
      return evaluate(betaReduction(alphaConverted, evaledRight));
    }
    return { type: 'application', left: evaledLeft, right: evaledRight };
  }
  throw new Error('Invalid LambdaExpression');
}

function substitute(expr: LambdaExpression, param: string, replacement: LambdaExpression): LambdaExpression {
  if (isVariable(expr)) {
    return expr === param ? replacement : expr;
  } else if (isAbstraction(expr)) {
    return expr.parameter === param
      ? expr
      : { ...expr, body: substitute(expr.body, param, replacement) };
  } else if (isApplication(expr)) {
    return {
      type: 'application',
      left: substitute(expr.left, param, replacement),
      right: substitute(expr.right, param, replacement),
    };
  } else if (isChurchNumeral(expr) || isChurchBoolean(expr) || isOperator(expr)) {
    return expr;
  }
  throw new Error('Invalid LambdaExpression');
}
