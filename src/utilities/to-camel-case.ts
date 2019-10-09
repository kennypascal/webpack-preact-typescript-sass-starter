/**
 *
 *
 * @export
 * @param {string} string
 * @returns {string} Returns a string as camel case
 */
function toCamelCase(string: string): string {
  return string
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, ($1): string => $1.toUpperCase())
    .replace(/ /g, '');
}

export default toCamelCase;
