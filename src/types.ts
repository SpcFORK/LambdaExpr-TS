export type Variable = string;

export interface Abstraction {
  type: 'abstraction';
  parameter: Variable;
  body: LambdaExpression;
}

export interface Application {
  type: 'application';
  left: LambdaExpression;
  right: LambdaExpression;
}

export type LambdaExpression = Variable | Abstraction | Application;

export function isVariable(expr: LambdaExpression): expr is Variable {
  return typeof expr === 'string';
}

export function isAbstraction(expr: LambdaExpression): expr is Abstraction {
  return typeof expr === 'object' && expr.type === 'abstraction';
}

export function isApplication(expr: LambdaExpression): expr is Application {
  return typeof expr === 'object' && expr.type === 'application';
}
