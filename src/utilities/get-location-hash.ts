/**
 *
 *
 * @export
 * @returns {string} Returns the window's location hash without the #'
 */
export function getLocationHash(): string {
  return window.location.hash.replace(/^#/, '');
}
