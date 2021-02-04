function reverseArray(array) {
  const reversed = [];
  let position = array.length - 1;

  for (; position >= 0; position--) {
    reversed.push(array[position]);
  }

  return reversed;
}

function reverseArrayInPlace(array) {
  let leftPosition = 0;
  let rightPosition = array.length - 1;

  for (; leftPosition <= rightPosition; leftPosition++, rightPosition--) {
    const temp = array[leftPosition];
    array[leftPosition] = array[rightPosition];
    array[rightPosition] = temp;
  }
}

const arr = [1, 2, 3, 4, 5];

console.log(reverseArray(arr));

reverseArrayInPlace(arr);
console.log(arr);
