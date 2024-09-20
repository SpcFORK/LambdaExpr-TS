export type VaugeArr = {
  [k: number]: Data;
  [k: string]: any;
};
export type Variable = string;
export type Data = number | boolean | VaugeArr;
export type Primitive = Variable | Data;
export type ChurchPrimitive = ChurchNumeral | ChurchBoolean;

export class Abstraction {
  static type = "abstraction";
  type = Abstraction.type;
  constructor(
    public parameter: Variable,
    public body: LambdaExpression,
  ) {}
}

export class Application {
  static type = "application";
  type = Application.type;
  constructor(
    public left: LambdaExpression,
    public right: LambdaExpression,
  ) {}
}

export class ChurchNumeral {
  static type = "churchNumeral";
  type = ChurchNumeral.type;
  constructor(public value: number) {}
}

export class ChurchBoolean {
  static type = "churchBoolean";
  type = ChurchBoolean.type;
  constructor(public value: boolean) {}
}

export class ResultVec {
  static type = "resultVec";
  type = ResultVec.type;
  constructor(public values: Primitive[]) {}
}

export class Operator {
  static type = "operator";
  type = Operator.type;
  constructor(public value: LambdaExpression) {}
}

export type LambdaExpression =
  | Variable
  | Primitive
  | ResultVec
  | Abstraction
  | Application
  | ChurchPrimitive
  | Operator;

export function isVariable(expr: LambdaExpression): expr is Variable {
  return isJSString(expr);
}

export function isAbstraction(expr: LambdaExpression): expr is Abstraction {
  return typeof expr === "object" && expr.type === "abstraction";
}

export function isApplication(expr: LambdaExpression): expr is Application {
  return typeof expr === "object" && expr.type === "application";
}

export function isChurchNumeral(expr: LambdaExpression): expr is ChurchNumeral {
  return typeof expr === "object" && expr.type === "churchNumeral";
}

export function isChurchBoolean(expr: LambdaExpression): expr is ChurchBoolean {
  return typeof expr === "object" && expr.type === "churchBoolean";
}

export function isPrimitive(expr: LambdaExpression): expr is ChurchPrimitive {
  return isChurchNumeral(expr) || isChurchBoolean(expr);
}

export function isJSString(expr: LambdaExpression): expr is string {
  return typeof expr === "string";
}

export function isJSBoolean(expr: LambdaExpression): expr is boolean {
  return typeof expr === "boolean";
}

export function isJSNumber(expr: LambdaExpression): expr is number {
  return typeof expr === "number";
}

export function isJSArray(expr: LambdaExpression): expr is VaugeArr {
  return Array.isArray(expr);
}

export function isJSPrimitive(expr: LambdaExpression): expr is Primitive {
  return (
    isJSNumber(expr) || isJSBoolean(expr) || isJSString(expr) || isJSArray(expr)
  );
}

export function isResult(expr: LambdaExpression): expr is ResultVec {
  return typeof expr === "object" && expr.type === "resultVec";
}

export function isOperator(expr: LambdaExpression): expr is Operator {
  return typeof expr === "object" && expr.type === "operator";
}

export const operators = [
  "+",
  "*",
  "-",
  "=",
  "<",
  ">",
  "And",
  "Or",
  "Not",
  "Pred",
  "Succ",
  "Add",
  "ToNumber",
  "ToBool",
  "Mult",
  "Pred",
  "Sub",
  "Equals",
  "NotEquals",
  "LessThan",
  "GreaterThan",
];

export const lower_ops = operators.map((op) => op.toLowerCase());
