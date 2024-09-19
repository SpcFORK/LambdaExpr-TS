import { LambdaExpression, Variable, Abstraction, Application, isVariable } from '../types';

export function parse(input: string): LambdaExpression {
  input = input.trim();

  if (input.length === 0) {
    throw new Error('Empty input');
  }

  if (input.match(/^[a-z]$/)) {
    return input as Variable;
  }

  if (input.startsWith('(λ') || input.startsWith('(\\')) {
    const closingParenIndex = findMatchingClosingParen(input);
    if (closingParenIndex !== input.length - 1) {
      throw new Error('Invalid abstraction syntax');
    }

    const body = input.slice(1, -1);
    const dotIndex = body.indexOf('.');
    if (dotIndex === -1) {
      throw new Error('Invalid abstraction syntax: missing dot');
    }

    const parameter = body.slice(1, dotIndex).trim();
    const expression = body.slice(dotIndex + 1).trim();

    return {
      type: 'abstraction',
      parameter,
      body: parse(expression),
    } as Abstraction;
  }

  if (input.startsWith('(')) {
    const closingParenIndex = findMatchingClosingParen(input);
    if (closingParenIndex === input.length - 1) {
      return parse(input.slice(1, -1));
    }

    const left = input.slice(0, closingParenIndex + 1);
    const right = input.slice(closingParenIndex + 1);

    return {
      type: 'application',
      left: parse(left),
      right: parse(right),
    } as Application;
  }

  throw new Error('Invalid lambda expression');
}

function findMatchingClosingParen(input: string): number {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') count++;
    if (input[i] === ')') count--;
    if (count === 0) return i;
  }
  throw new Error('Mismatched parentheses');
}
