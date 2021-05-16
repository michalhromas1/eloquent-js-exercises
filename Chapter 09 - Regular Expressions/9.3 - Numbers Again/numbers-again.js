function verifyMultiple(values) {
  const results = [];

  for (const val of values) {
    const res = verify(val);
    results.push([val, res]);
  }

  return results;
}

function verify(value) {
  const regex = /^[+\-]?(\d+\.?\d*|\d*\.?\d+)(e[+\-]?\d+)?$/i;
  return regex.test(value);
}

console.log(
  'should be valid: ',
  verifyMultiple(['1', '-1', '+15', '1.55', '.5', '5.', '1.3e2', '1E-4', '1e+12'])
);

console.log(
  'should be invalid: ',
  verifyMultiple(['1a', '+-1', '1.2.3', '1+1', '1e4.5', '.5.', '1f5', '.'])
);
