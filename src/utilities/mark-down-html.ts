/**
 *
 * Preact/React replacement for using innerHTML in the browser DOM
 * @export
 * @param {string} string
 * @returns {{ dangerouslySetInnerHTML: { __html } }}
 */
export default function markDownHTML(string: string): { dangerouslySetInnerHTML: { __html } } {
  return {
    dangerouslySetInnerHTML: {
      __html: string
    }
  };
}
