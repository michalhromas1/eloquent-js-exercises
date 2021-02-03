function countChars(text, letter) {
  let counter = 0;

  for (char of text) {
    char === letter && counter++;
  }

  return counter;
}
