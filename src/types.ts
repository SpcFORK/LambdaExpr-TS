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

export interface ChurchNumeral {
  type: 'churchNumeral';
  value: number;
}

export interface ChurchBoolean {
  type: 'churchBoolean';
  value: boolean;
}

export interface Operator {
  type: 'operator';
  value: string;
}

export type LambdaExpression = Variable | Abstraction | Application | ChurchNumeral | ChurchBoolean | Operator;

export function isVariable(expr: LambdaExpression): expr is Variable {
  return typeof expr === 'string';
}

export function isAbstraction(expr: LambdaExpression): expr is Abstraction {
  return typeof expr === 'object' && expr.type === 'abstraction';
}

export function isApplication(expr: LambdaExpression): expr is Application {
  return typeof expr === 'object' && expr.type === 'application';
}

export function isChurchNumeral(expr: LambdaExpression): expr is ChurchNumeral {
  return typeof expr === 'object' && expr.type === 'churchNumeral';
}

export function isChurchBoolean(expr: LambdaExpression): expr is ChurchBoolean {
  return typeof expr === 'object' && expr.type === 'churchBoolean';
}

export function isOperator(expr: LambdaExpression): expr is Operator {
  return typeof expr === 'object' && expr.type === 'operator';
}
