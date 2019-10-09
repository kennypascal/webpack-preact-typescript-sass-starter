/**
 *
 *
 * @export
 * @returns {string} Returns the window location hash without #'
 */
function getLocationHash(): string {
  return window.location.hash.replace(/^#/, '');
}

export default getLocationHash;
