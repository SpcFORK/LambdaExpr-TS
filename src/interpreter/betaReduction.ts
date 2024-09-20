import {
  LambdaExpression,
  Abstraction,
  Application,
  Variable,
  isVariable,
  isAbstraction,
  isApplication,
} from "../types";

import { substitute } from "./substitute";

export function betaReduction(
  abstraction: Abstraction,
  argument: LambdaExpression,
): LambdaExpression {
  return substitute(abstraction.body, abstraction.parameter, argument);
}
