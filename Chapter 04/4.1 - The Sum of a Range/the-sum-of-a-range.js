function range(start, end) {
  return addToArray(start);

  function addToArray(value, arr = []) {
    if (value > end) {
      return arr;
    }

    return addToArray(value + 1, [...arr, value]);
  }
}

const a = range(-1, 7);
a;
