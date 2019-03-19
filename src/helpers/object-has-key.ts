/**
 *
 *
 * @export
 * @param {*} object
 * @param {*} key
 * @returns {boolean} Returns true if the object has the key
 */
export function ObjectHasKey(object, key): boolean {
  return Object.keys(object).indexOf(key) !== -1;
}
