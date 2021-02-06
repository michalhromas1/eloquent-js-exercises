function arrayToList(
  array,
  position = array.length - 1,
  list = { value: array[position], rest: null }
) {
  if (position <= 0) return list;
  return arrayToList(array, position - 1, { value: array[position - 1], rest: list });
}

function listToArray(list) {
  const array = [];
  for (; list; list = list.rest) array.push(list.value);
  return array;
}

function prepend(value, list) {
  return {
    value,
    rest: list,
  };
}

function nth(list, n, position = 0) {
  if (!list) return undefined;
  if (position === n) return list.value;
  return nth(list.rest, n, ++position);
}

const list = arrayToList([1, 2, 3]);
const newList = prepend('ahoj', list);
const arrayFromNewList = listToArray(newList);

console.log(nth(newList, 0));
