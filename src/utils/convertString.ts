/**
 * Converts a space-separated string to kebab case.
 *
 * @param {string} inputString - The input string to be converted.
 * @returns {string} The kebab case representation of the input string.
 */
const toKebabCase = (inputString: string): string => {
  /**
   * Split the input string into an array of words.
   */
  const words: string[] = inputString.toLowerCase().split(' ');

  /**
   * Join the words into a single string separated by dashes.
   */
  const kebabCasedString: string = words.join('-');

  return kebabCasedString;
};

/**
 * Convert a kebab-case string to Kebab Case.
 * @param {string} kebabCaseStr - The input string in kebab-case.
 * @returns {string} The converted string in Kebab Case.
 */
const convertToKebabCase = (kebabCaseStr: string): string => {
  // Split the string by '-' and capitalize each word
  const words = kebabCaseStr
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words with a space in between
  const kebabCaseResult = words.join(' ');

  return kebabCaseResult;
};

export { toKebabCase, convertToKebabCase };
