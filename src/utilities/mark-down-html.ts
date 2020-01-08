/**
 * A Preact/React replacement for using innerHTML in the browser DOM.
 * Return a dangerouslySetInnerHTML object.
 */
export default function markDownHTML(string: string): { dangerouslySetInnerHTML: { __html } } {
  return {
    dangerouslySetInnerHTML: {
      __html: string
    }
  };
}
