/**
 * Calculates the x and y position of the element within the page.
 * @param element 
 * @returns {x:number, y:number} Position of the element within the page.
 */
export function elementPosition(element) {
	return element
		? {
				x: Math.round(
					element.getBoundingClientRect().left +
						(document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft)
				),
				y: Math.round(
					element.getBoundingClientRect().top + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
				)
		  }
		: { x: undefined, y: undefined };
}
