function every(array, predicate) {
  for (const item of array) {
    if (!predicate(item)) return false;
  }

  return true;
}

function everyUsingSome(array, predicate) {
  return !array.some((item) => !predicate(item));
}

console.log(every([1, 2, 3], (item) => item < 5));
console.log(every([1, 2, 3], (item) => item > 5));

console.log(everyUsingSome([1, 2, 3], (item) => item < 5));
console.log(everyUsingSome([1, 2, 3], (item) => item > 5));
