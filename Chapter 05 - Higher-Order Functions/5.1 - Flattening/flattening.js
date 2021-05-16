function flatten(array) {
  return array.reduce((a, b) => a.concat(b), []);
}

function flattenRecursive(value, result = []) {
  if (!Array.isArray(value)) {
    result.push(value);
  } else {
    value.forEach((v) => flattenRecursive(v, result));
  }

  return result;
}

const arrayToFlatten = [1, 2, [1, 2, 3], [2, [3], 4], [3, 2, 5]];

console.log(flatten(arrayToFlatten));
console.log(flattenRecursive(arrayToFlatten));
