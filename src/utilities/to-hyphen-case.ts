/**
 * Return a string as hyphen case.
 * 
 * All letters are lowercase.
 * All spaces between words are filled with underscores.
 * Remove all punctuation.
 */

export default function toHyphenCase(string: string): string {
  return string && string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(l => l.toLowerCase())
    .join('-');
}
