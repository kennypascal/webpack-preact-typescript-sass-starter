/**
 * To camel case
 * @param string
 * @returns  A string as camel case
 */
export function toCamelCase(string: string): string {
	return string
		.toLowerCase()
		.replace(/[-_]+/g, ' ')
		.replace(/[^\w\s]/g, '')
		.replace(/ (.)/g, function($1) {
			return $1.toUpperCase();
		})
		.replace(/ /g, '');
}
