import {
  interpret,
  parse,
  prettyPrint,
  Numeral,
  Add,
  Mult,
  Pred,
  Sub,
  True,
  False,
  And,
  Or,
  Not,
  ToNumber,
  ToBool,
} from "../src/interpreter";

describe("Church Encodings", () => {
  test("Church Numerals", () => {
    let result = interpret(Numeral(0));
    expect(ToNumber(result)).toBe(0);
    result = interpret(Numeral(1));
    expect(ToNumber(result)).toBe(1);
    result = interpret(Numeral(5));
    expect(ToNumber(result)).toBe(5);
    const prettyResult = interpret(Numeral(3));
    expect(prettyPrint(prettyResult)).toBe("(λf.λx.f(f(f(x))))");
  });

  test("Church addition", () => {
    const expression = `(${Add} ${Numeral(2)} ${Numeral(3)})`;
    let result = interpret(expression);
    expect(ToNumber(result)).toBe(5);
    expect(prettyPrint(result)).toBe("(λf.λx.f(f(f(f(f(x))))))");
  });

  test("Church Multiplication", () => {
    const expression = `(${Mult} ${Numeral(2)} ${Numeral(3)})`;
    let result = interpret(expression);
    expect(ToNumber(result)).toBe(6);
    expect(prettyPrint(result)).toBe("(λf.λx.f(f(f(f(f(f(x)))))))");
  });

  test("Church Predecessor", () => {
    const expression = `(${Pred} ${Numeral(3)})`;
    let result = interpret(expression);
    expect(ToNumber(result)).toBe(2);
    expect(prettyPrint(result)).toBe("(λf.λx.f(f(x)))");
  });

  test("Church Subtraction", () => {
    const expression = `(${Sub} ${Numeral(5)} ${Numeral(3)})`;
    let result = interpret(expression);
    expect(ToNumber(result)).toBe(2);
    expect(prettyPrint(result)).toBe("(λf.λx.f(f(x)))");
  });

  test("Church Booleans", () => {
    const trueExpr = interpret(True);
    const falseExpr = interpret(False);
    expect(ToBool(trueExpr)).toBe(true);
    expect(ToBool(falseExpr)).toBe(false);
    expect(prettyPrint(trueExpr)).toBe("(λx.λy.x)");
    expect(prettyPrint(falseExpr)).toBe("(λx.λy.y)");
  });

  test("Church AND operation", () => {
    let expression = `(${And} ${True} ${True})`;
    let result = interpret(expression);
    expect(ToBool(result)).toBe(true);

    expression = `(${And} ${True} ${False})`;
    result = interpret(expression);
    expect(ToBool(result)).toBe(false);

    expression = `(${And} ${False} ${True})`;
    result = interpret(expression);
    expect(ToBool(result)).toBe(false);

    expression = `(${And} ${False} ${False})`;
    result = interpret(expression);
    expect(ToBool(result)).toBe(false);
  });

  test("Church OR operation", () => {
    let expression = `(${Or} ${True} ${True})`;
    let result = interpret(expression);
    expect(ToBool(result)).toBe(true);

    expression = `(${Or} ${True} ${False})`;
    result = interpret(expression);
    expect(ToBool(result)).toBe(true);

    expression = `(${Or} ${False} ${True})`;
    result = interpret(expression);
    expect(ToBool(result)).toBe(true);

    expression = `(${Or} ${False} ${False})`;
    result = interpret(expression);
    expect(ToBool(result)).toBe(false);
  });

  test("Church NOT operation", () => {
    let expression = `(${Not} ${True})`;
    let result = interpret(expression);
    expect(ToBool(result)).toBe(false);

    expression = `(${Not} ${False})`;
    result = interpret(expression);
    expect(ToBool(result)).toBe(true);
  });
});
