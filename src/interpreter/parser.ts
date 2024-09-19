import { LambdaExpression, Variable, Abstraction, Application } from '../types';

export function parse(input: string): LambdaExpression {
  const tokens = tokenize(input);
  const [result, remaining] = parseExpression(tokens);
  
  if (remaining.length > 0) {
    throw new Error(`Unexpected tokens: ${remaining.join(' ')}`);
  }
  
  return result;
}

function tokenize(input: string): string[] {
  return input.replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .replace(/\./g, ' . ')
    .replace(/λ/g, ' λ ')
    .split(/\s+/)
    .filter(token => token.length > 0);
}

function parseExpression(tokens: string[]): [LambdaExpression, string[]] {
  if (tokens.length === 0) {
    throw new Error('Unexpected end of input');
  }
  
  if (tokens[0] === '(') {
    return parseParenthesizedExpression(tokens.slice(1));
  }
  
  if (tokens[0] === 'λ' || tokens[0] === '\\') {
    return parseAbstraction(tokens.slice(1));
  }
  
  return parseApplication(tokens);
}

function parseParenthesizedExpression(tokens: string[]): [LambdaExpression, string[]] {
  const [expr, remaining] = parseExpression(tokens);
  
  if (remaining.length === 0 || remaining[0] !== ')') {
    throw new Error('Missing closing parenthesis');
  }
  
  return [expr, remaining.slice(1)];
}

function parseAbstraction(tokens: string[]): [Abstraction, string[]] {
  if (tokens.length < 3) {
    throw new Error('Invalid abstraction syntax');
  }
  
  const parameter = tokens[0];
  
  if (tokens[1] !== '.') {
    throw new Error('Invalid abstraction syntax: missing dot');
  }
  
  const [body, remaining] = parseExpression(tokens.slice(2));
  
  return [{
    type: 'abstraction',
    parameter,
    body,
  }, remaining];
}

function parseApplication(tokens: string[]): [LambdaExpression, string[]] {
  let [left, remaining] = parseAtom(tokens);
  
  while (remaining.length > 0 && remaining[0] !== ')') {
    const [right, newRemaining] = parseAtom(remaining);
    left = {
      type: 'application',
      left,
      right,
    };
    remaining = newRemaining;
  }
  
  return [left, remaining];
}

function parseAtom(tokens: string[]): [LambdaExpression, string[]] {
  if (tokens.length === 0) {
    throw new Error('Unexpected end of input');
  }
  
  if (tokens[0] === '(') {
    return parseParenthesizedExpression(tokens.slice(1));
  }
  
  if (tokens[0] === 'λ' || tokens[0] === '\\') {
    return parseAbstraction(tokens.slice(1));
  }
  
  if (tokens[0].match(/^[a-z]$/)) {
    return [tokens[0] as Variable, tokens.slice(1)];
  }
  
  throw new Error(`Unexpected token: ${tokens[0]}`);
}
