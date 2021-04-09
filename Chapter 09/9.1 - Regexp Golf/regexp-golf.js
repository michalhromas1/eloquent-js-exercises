/*
1. car and cat
2. pop and prop
3. ferret, ferry and ferrari
4. any word ending in ious
5. a whitespace character followed by a period, comma, colon, or semicolon
6. a word longer than six letters
7. a word without the letter e (or E)
*/

function verifyMultiple(type, values) {
  const results = [];

  for (const val of values) {
    const res = verify(type, val);
    results.push([val, res]);
  }

  return results;
}

function verify(type, value) {
  const regex = getRegex(type);
  return regex.test(value);
}

function getRegex(type) {
  switch (type) {
    case 1: {
      return /ca[rt]/;
    }

    case 2: {
      return /pr?op/;
    }

    case 3: {
      return /ferr(y|et|ari)/;
    }

    case 4: {
      return /.*ious\b/;
    }

    case 5: {
      return /\s[.,:;]/;
    }

    case 6: {
      return /\w{6,}/;
    }

    case 7: {
      return /\b[^eE\s]+\b/;
    }

    default: {
      return /\s|./;
    }
  }
}

console.log(verifyMultiple(1, ['my car', 'bad cats', 'camper', 'high art']));
console.log(verifyMultiple(2, ['pop culture', 'mad props', 'plop', 'prrrop']));
console.log(verifyMultiple(3, ['ferret', 'ferry', 'ferrari', 'ferrum', 'transfer A']));
console.log(verifyMultiple(4, ['how delicious', 'spacious room', 'ruinous', 'consciousness']));
console.log(verifyMultiple(5, ['bad punctuation .', 'escape the period']));
console.log(
  verifyMultiple(6, ['Siebentausenddreihundertzweiundzwanzig', 'no', 'three small words'])
);
console.log(
  verifyMultiple(7, ['red platypus', 'wobbling nest', 'earth bed', 'learning ape', 'BEET'])
);
