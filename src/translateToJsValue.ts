import {
  LambdaExpression,
  Abstraction,
  isPrimitive,
  isAbstraction,
  isApplication,
  isJSPrimitive,
  Application,
  ResultVec,
  isResult,
  ChurchPrimitive,
  Operator,
  VaugeArr,
  Primitive,
  isOperator,
  isJSString,
} from "./types";

import * as C from "./interpreter/churchEncodings";
import { prettyPrint } from "./pretty";
import { evaluate, interpret } from "./interpreter";

export type TranslateResult = LambdaExpression | Primitive[];

/**
 * Translates an abstraction into its JavaScript equivalent.
 * @param {Abstraction} result - The abstraction to translate.
 * @returns {Abstraction} - The translated abstraction.
 */
export function translateAbs(result: Abstraction): Abstraction {
  const { parameter } = result;
  const body = translateToJsValue(result.body);
  return new Abstraction(parameter, <LambdaExpression>body);
}

/**
 * Performs the conversion of the left and right lambda expressions.
 * @param {LambdaExpression} left - The left lambda expression.
 * @param {LambdaExpression} right - The right lambda expression.
 * @param {any[]} res - The result array to hold intermediate values.
 * @returns {ResultVec | Application} - The result vector or application.
 */
function doConvert(
  left: LambdaExpression,
  right: LambdaExpression,
  res: any[],
): ResultVec | Application {
  const compileBucket = (bucket: ResultVec["values"]): any => {
    // console.debug(bucket, evaluate(interpret(bucket.join(" "))));
    return bucket
  };

  switch (true) {
    case isResult(left):
      res = res.concat(left.values);
      res.push(right);
      return new ResultVec(compileBucket(res));

    case isResult(right):
      res = res.concat(right.values);
      res.push(left);
      return new ResultVec(compileBucket(res));

    case isPrimitive(left):
    case isPrimitive(right):
    case isJSPrimitive(left):
    case isJSPrimitive(right):
      return new ResultVec(compileBucket(<Primitive[]>[left, right]));

    default:
      return new Application(left, right);
  }
}

/**
 * Translates an application into its JavaScript equivalent.
 * @param {Application} result - The application to translate.
 * @returns {LambdaExpression} - The translated application.
 */
export function translateApp(result: Application): LambdaExpression {
  const left = translateToJsValue(result.left);
  const right = translateToJsValue(result.right);

  let res: ResultVec["values"] = [];

  return translateToJsValue(
    doConvert(<LambdaExpression>left, <LambdaExpression>right, res),
  );
}

/**
 * Translates an operator into its JavaScript equivalent.
 * @param {Operator} value - The operator to translate.
 * @returns {LambdaExpression} - The translated operator.
 **/
export function translateOp(value: Operator): LambdaExpression {
  return translateToJsValue(value.value);
}

/**
 * Translates a lambda expression into its JavaScript equivalent.
 * @param {LambdaExpression} value - The lambda expression to translate.
 * @returns {LambdaExpression | Primitive[]} - The translated value.
 */
export function translateToJsValue(value: LambdaExpression): LambdaExpression {
  switch (true) {
    case isAbstraction(value):
      return translateAbs(value);

    case isApplication(value):
      return translateApp(value);

    case isOperator(value):
      return translateOp(value);

    case isPrimitive(value):
      return value.value;

    default:
    case isJSPrimitive(value):
      return value;
  }
}
