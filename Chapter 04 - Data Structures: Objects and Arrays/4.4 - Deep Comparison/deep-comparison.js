function deepEqual(a, b) {
  const areObjects = typeof a === 'object' && typeof b === 'object';
  const areAnyNull = a === null || b === null;

  if (!areObjects || areAnyNull) return a === b;
  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (const prop in a) {
    if (!(prop in b) || !deepEqual(a[prop], b[prop])) return false;
  }

  return true;
}

const a = { prop: 'a', a: { a: undefined } };
const b = { prop: 'a', a: { b: undefined } };

console.log(deepEqual(a, b));
