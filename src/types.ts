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
