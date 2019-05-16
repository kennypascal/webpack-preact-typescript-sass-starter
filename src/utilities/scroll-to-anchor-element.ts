import { elementPosition } from './element-position';

/**
 *
 *
 * @export
 * @param {*} [to=0] | Destination of the scroll, default is 0
 * @param {number} [duration=800] | Duration on the scroll, default is 800ms
 * @description | Animates the window scroll to specified destination
 */
export function windowScrollDestination(to: number = 0, duration: number = 800) {
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = function() {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
  animateScroll();
}

/**
 * Scrolls to an elemnt
 * @param element | HTMLElement
 * @param [offset] | Offset the scroll to positon
 * @param [duration] | Animation duration
 */
export function scrollToElement(element: Element, offset: number = 0, duration: number = 800) {
  let destination;
  if (element) {
    let targetElmentTopToPageBottom = document.documentElement.scrollHeight - elementPosition(element).y;
    let difference = targetElmentTopToPageBottom - window.innerHeight;
    destination = difference > 0 && element ? elementPosition(element).y + offset : document.documentElement.scrollHeight - window.innerHeight;
  } else {
    destination = 0;
  }

  windowScrollDestination(destination, duration);
}

export function scrollToAnchor(event: MouseEvent | any, offset: number = 0, duration: number = 800) {
  // disabled by default
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
  let element = event.currentTarget as HTMLElement;
  let href = element.getAttribute('href').replace('#', '');
  let destinationList = href
    ? document.querySelectorAll('[id="' + href + '"]')
      ? document.querySelectorAll('[id="' + href + '"]')
      : document.querySelectorAll('[name="' + href + '"]')
    : undefined;

  // Get scroll to anchor
  let anchorElement: Element | undefined = destinationList ? destinationList[0] : undefined;
  // Get scroll to anchor destination
  let destination;
  if (anchorElement) {
    let targetElmentTopToPageBottom = document.documentElement.scrollHeight - elementPosition(anchorElement).y;
    let difference = targetElmentTopToPageBottom - window.innerHeight;
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
export function scrollToAnchorElement(element: HTMLElement) {
  window.addEventListener('click', (event) => scrollToAnchor(event));
}
