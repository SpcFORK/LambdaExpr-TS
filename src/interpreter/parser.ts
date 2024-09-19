import { LambdaExpression, Variable, Abstraction, Application, ChurchNumeral, ChurchBoolean, Operator } from '../types';

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
    .replace(/\$/g, ' $ ')
    .replace(/\+/g, ' + ')
    .replace(/\*/g, ' * ')
    .replace(/-/g, ' - ')
    .replace(/=/g, ' = ')
    .replace(/</g, ' < ')
    .replace(/>/g, ' > ')
    .split(/\s+/)
    .filter(token => token.length > 0);
}

function parseExpression(tokens: string[]): [LambdaExpression, string[]] {
  return parseApplication(tokens);
}

function parseApplication(tokens: string[]): [LambdaExpression, string[]] {
  let [left, remaining] = parseAtom(tokens);
  while (remaining.length > 0 && remaining[0] !== ')') {
    const [right, newRemaining] = parseAtom(remaining);
    left = { type: 'application', left, right };
    remaining = newRemaining;
  }
  return [left, remaining];
}

function parseAtom(tokens: string[]): [LambdaExpression, string[]] {
  if (tokens.length === 0) {
    throw new Error('Unexpected end of input');
  }
  
  if (tokens[0] === '(') {
    const [expr, remaining] = parseExpression(tokens.slice(1));
    if (remaining.length === 0 || remaining[0] !== ')') {
      throw new Error('Missing closing parenthesis');
    }
    return [expr, remaining.slice(1)];
  }
  
  if (tokens[0] === 'λ' || tokens[0] === '\\' || tokens[0] === '$') {
    return parseAbstraction(tokens);
  }
  
  if (tokens[0].match(/^[a-z]$/)) {
    return [tokens[0] as Variable, tokens.slice(1)];
  }
  
  if (tokens[0].match(/^\d+$/)) {
    return [{ type: 'churchNumeral', value: parseInt(tokens[0], 10) } as ChurchNumeral, tokens.slice(1)];
  }
  
  if (['true', 'false'].includes(tokens[0].toLowerCase())) {
    return [{ type: 'churchBoolean', value: tokens[0].toLowerCase() === 'true' } as ChurchBoolean, tokens.slice(1)];
  }
  
  if (['+', '*', '-', '=', '<', '>', 'True', 'False', 'And', 'Or', 'Not', 'pred', 'succ', 'toNumber', 'toBool', 'churchAdd', 'churchMult', 'churchPred', 'churchSub', 'churchTrue', 'churchFalse', 'churchAnd', 'churchOr', 'churchNot', 'churchLessThan', 'churchEquals', 'churchSucc', 'f', 'x', 'p', 'q', 'm', 'n', 'g', 'h', 'u'].includes(tokens[0])) {
    return [{ type: 'operator', value: tokens[0] } as Operator, tokens.slice(1)];
  }
  
  throw new Error(`Unexpected token: ${tokens[0]}`);
}

function parseAbstraction(tokens: string[]): [Abstraction, string[]] {
  if (tokens.length < 3) {
    throw new Error('Invalid abstraction syntax');
  }
  
  const parameter = tokens[1];
  
  if (tokens[2] !== '.') {
    throw new Error('Invalid abstraction syntax: missing dot');
  }
  
  const [body, remaining] = parseExpression(tokens.slice(3));
  
  return [{
    type: 'abstraction',
    parameter,
    body,
  }, remaining];
}
