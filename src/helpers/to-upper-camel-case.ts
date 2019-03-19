import { toCamelCase } from './to-camel-case';
import { toLatin } from './to-latin';

/**
 *
 *
 * @export
 * @param {string} string
 * @returns {string} A string as upper camel case (pascal case)
 */
export function toUpperCamelCase(string: string): string {
  return (
    toLatin(string)
      .charAt(0)
      .toUpperCase() + toCamelCase(string).slice(1)
  );
}
