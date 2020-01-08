/**
 * Returns a string as upper camel case.
 * 
 * The first letter is uppercase.
 * One or more letters in that word are also capitalised.
 * The word does not end on a capitalized letter: CamelCasE
 * No two capitalised letters shall follow directly each other: CamelCAse
 * No number in that word at any place: CamelCase1more
 * No dot(.), under_score or dash (-) within the word, only letters: Camel_Case
 * No ‘foreign’ letters in it like äöüß or accentuated like áéí. CämélCáße
 */
export default function toUpperCamelCase(string: string): string {
  return string
  .toLowerCase()
  .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
  .replace(/[\d-_]/g, '') // remove numbers & special characters
  .replace(/[^\w\s]/g, '') // remove punctuation
  .replace(/^./, ($1): string => $1.toUpperCase()); // uppercase first letter
}
