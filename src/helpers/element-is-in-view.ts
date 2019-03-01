import { elementPosition } from './element-position';
/**
 * Determines if the elements is in view
 * @param element
 * @param [offset] | Offset a percentage of the element that needs to be out of view
 * @returns true if the element is in view
 */
export function elementIsInView(element: Element, offset: number = 0.5): boolean {
	let status = false;
	if (element) {
		let elementHeight = element.getBoundingClientRect().height;
		let calculatedHeight = (elementHeight > window.innerHeight ? window.innerHeight : elementHeight) * offset;
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
