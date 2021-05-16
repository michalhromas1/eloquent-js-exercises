function loop(value, test, update, body) {
  while (test(value)) {
    body(value);
    value = update(value);
  }
}

const array = [];

loop(
  0,
  (val) => val < 5,
  (val) => val + 1,
  (val) => array.push(val)
);

console.log(array);
