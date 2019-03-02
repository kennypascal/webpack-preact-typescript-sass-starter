import { toCamelCase } from './to-camel-case';

export function toHyphenCase(string: string): string {
  return toCamelCase(string)
    .replace(/(^[A-Z])/, (first) => first.toLowerCase())
    .replace(/([A-Z])/g, (letter) => `-${letter.toLowerCase()}`);
}
