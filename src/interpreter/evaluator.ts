import { LambdaExpression, Abstraction, Application } from '../types';
import { alphaConversion } from './alphaConversion';
import { betaReduction } from './betaReduction';

export function evaluate(expr: LambdaExpression): LambdaExpression {
  switch (expr.type) {
    case 'abstraction':
      return {
        ...expr,
        body: evaluate(expr.body),
      };
    case 'application':
      const evaledLeft = evaluate(expr.left);
      const evaledRight = evaluate(expr.right);
      
      if (evaledLeft.type === 'abstraction') {
        const alphaConverted = alphaConversion(evaledLeft);
        return evaluate(betaReduction(alphaConverted, evaledRight));
      }
      
      return {
        type: 'application',
        left: evaledLeft,
        right: evaledRight,
      };
    default:
      return expr;
  }
}
