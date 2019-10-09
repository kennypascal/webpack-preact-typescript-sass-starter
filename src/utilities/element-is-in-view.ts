import elementPosition from './element-position';

/**
 *
 *
 * @export
 * @param {Element} element
 * @param {number} [offset=0.5] A percentage of how much the element needs to be in view to be true (1 = 100% of the element in view = true)
 * @returns {boolean} Returns true if the element is in view
 */
function elementIsInView(element: Element, offset: number = 0.5): boolean {
  let status = false;
  if (element) {
    const elementHeight = element.getBoundingClientRect().height;
    const calculatedHeight = (elementHeight > window.innerHeight ? window.innerHeight : elementHeight) * offset;
    if (
      elementPosition(element).y < window.innerHeight + window.pageYOffset - calculatedHeight &&
      elementPosition(element).y + elementHeight - calculatedHeight >= window.pageYOffset
    ) {
      status = true;
    } else if (elementPosition(element).y + (elementHeight - calculatedHeight) >= window.pageYOffset) {
      status = false;
    }
  }
  return status;
}

export default elementIsInView;
