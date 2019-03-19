// React replacement for using innerHTML in the browser DOM.

export function markDownHTML(string) {
  return {
    dangerouslySetInnerHTML: {
      __html: string
    }
  };
}
