/**
 *
 *
 * @export
 * @param {string} string
 * @returns {string} Returns a string as camel case
 */
export function toCamelCase(string: string): string {
  return string
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, ($1) => $1.toUpperCase())
    .replace(/ /g, '');
}
