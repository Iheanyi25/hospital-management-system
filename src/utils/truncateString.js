export function truncateString(str, length) {
  if (typeof str !== "string" || typeof length !== "number" || length < 0) {
    throw new Error("Invalid input: Expecting a string and a positive number for length.");
  }

  if (str.length <= length) {
    return str;
  }

  return str.substring(0, length) + "...";
}