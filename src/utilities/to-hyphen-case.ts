/**
 *
 *
 * @export
 * @param {string} string
 * @returns {string} Returns a string as hyphen case
 */
export function toHyphenCase(string: string): string {
  return string
    .replace(/[^\w\s]/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/(^[A-Z])/, (first) => first.toLowerCase())
    .replace(/([A-Z])/g, (letter) => `-${letter.toLowerCase()}`)
    .replace(/ /g, '');
}
