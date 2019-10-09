import elementPosition from './element-position';

/**
 *
 *
 * @export
 * @param {*} [to=0] | Destination of the scroll, default is 0
 * @param {number} [duration=800] | Duration on the scroll, default is 800ms
 * @description | Animates the window scroll to specified destination
 */
export function windowScrollDestination(to: number = 0, duration: number = 800): void {
  const element = document.scrollingElement || document.documentElement;
  const start = element.scrollTop;
  const change = to - start;
  const startDate = +new Date();
  function easeInOutQuad(currentTime, startValue, changeValue, durationEase): string {
    let t = currentTime;
    const b = startValue;
    const c = changeValue;
    const d = durationEase;

    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t -= 1;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  function animateScroll(): void {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  }
  animateScroll();
}

/**
 * Scrolls to an elemnt
 * @param element | HTMLElement
 * @param [offset] | Offset the scroll to positon
 * @param [duration] | Animation duration
 */
export function scrollToElement(element: Element, offset: number = 0, duration: number = 800): void {
  let destination;
  if (element) {
    const targetElmentTopToPageBottom = document.documentElement.scrollHeight - elementPosition(element).y;
    const difference = targetElmentTopToPageBottom - window.innerHeight;
    destination = difference > 0 && element ? elementPosition(element).y + offset : document.documentElement.scrollHeight - window.innerHeight;
  } else {
    destination = 0;
  }

  windowScrollDestination(destination, duration);
}

export function scrollToAnchor(event, offset: number = 0, duration: number = 800): void {
  // disabled by default
  if (event.preventDefault) {
    event.preventDefault();
  }

  const element = event.currentTarget as HTMLElement;
  const href = element.getAttribute('href').replace('#', '');

  let destinationList;
  if (href) {
    if (document.querySelectorAll(`[id="${href}"]`)) {
      destinationList = document.querySelectorAll(`[id="${href}"]`);
    } else if (document.querySelectorAll(`[name="${href}"]`)) {
      destinationList = document.querySelectorAll(`[name="${href}"]`);
    }
  }

  // Get scroll to anchor
  const anchorElement: Element | undefined = destinationList ? destinationList[0] : undefined;
  // Get scroll to anchor destination
  let destination;
  if (anchorElement) {
    const targetElmentTopToPageBottom = document.documentElement.scrollHeight - elementPosition(anchorElement).y;
    const difference = targetElmentTopToPageBottom - window.innerHeight;
    destination = difference > 0 && anchorElement ? elementPosition(anchorElement).y + offset : document.documentElement.scrollHeight - window.innerHeight;
  } else {
    destination = 0;
  }
  windowScrollDestination(destination, duration);
}

/**
 * Adds animated 'scroll to anchor' click event to an element
 * @param element
 * @param [offset] | Offset the scroll to positon
 * @param [duration] | Animation duration
 */
export function scrollToAnchorElement(): void {
  window.addEventListener('click', (event): void => scrollToAnchor(event));
}
