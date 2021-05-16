function changeQuotes(text) {
  const regex = /(^|\W)'|'(\W|$)/g;
  return text.replace(regex, `$1"$2`);
}

console.log(changeQuotes("'I'm the cook,' he said, 'it's my job.'"));
