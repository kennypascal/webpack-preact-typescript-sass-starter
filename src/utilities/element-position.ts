/**
 *
 *
 * @export
 * @param {*} element
 * @returns {{ x: number; y: number }} Returns the position of the element within the page.
 */
function elementPosition(element: Element): { x: number; y: number } {
  return element
    ? {
        x: Math.round(
          element.getBoundingClientRect().left + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft),
        ),
        y: Math.round(
          element.getBoundingClientRect().top + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop),
        ),
      }
    : { x: undefined, y: undefined };
}

export default elementPosition;
