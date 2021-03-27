function flatten(array) {
  return array.reduce((a, b) => a.concat(b), []);
}

console.log(flatten([1, 2, [1, 2, 3], [2, 3, 4], [3, 2, 5]]));
