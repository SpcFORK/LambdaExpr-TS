import { LambdaExpression, Abstraction, Application, isVariable, isAbstraction, isApplication } from '../types';
import { alphaConversion } from './alphaConversion';
import { betaReduction } from './betaReduction';

export function evaluate(expr: LambdaExpression): LambdaExpression {
  if (isVariable(expr)) {
    return expr;
  } else if (isAbstraction(expr)) {
    return {
      ...expr,
      body: evaluate(expr.body),
    };
  } else if (isApplication(expr)) {
    const evaledLeft = evaluate(expr.left);
    const evaledRight = evaluate(expr.right);
    
    if (isAbstraction(evaledLeft)) {
      const alphaConverted = alphaConversion(evaledLeft);
      return evaluate(betaReduction(alphaConverted, evaledRight));
    }
    
    return {
      type: 'application',
      left: evaledLeft,
      right: evaledRight,
    };
  }
  throw new Error('Invalid LambdaExpression');
}
