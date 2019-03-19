/**
 *
 *
 * @export
 * @param {*} value
 * @returns {Array} Returns the value as an array if it is not already an array
 */
export function toArray(value: any): Array<any> {
  return Array.isArray(value) ? value : [value];
}
