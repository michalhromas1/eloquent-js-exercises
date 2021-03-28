function flatten(array) {
  return array.reduce((a, b) => a.concat(b), []);
}

function flattenRecursive(value, result = []) {
  if (!value.forEach) {
    result.push(value);
  } else {
    value.forEach((v) => flattenRecursive(v, result));
  }

  return result;
}

console.log(flatten([1, 2, [1, 2, 3], [2, [3], 4], [3, 2, 5]]));
console.log(flattenRecursive([1, 2, [1, 2, 3], [2, [3], 4], [3, 2, 5]]));
