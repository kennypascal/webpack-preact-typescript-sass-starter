/**
 * Returns the window location hash without #'
 */
export default function getLocationHash(): string {
  return window && window.location && window.location.hash && window.location.hash.replace(/^#/, '');
}
