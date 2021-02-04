function range(start, end, step = 1) {
  let numbers = [];

  if (step > 0) {
    for (; start <= end; start += step) numbers.push(start);
  } else {
    for (; start >= end; start += step) numbers.push(start);
  }

  return numbers;
}

function sum(numbers) {
  let sum = 0;

  for (n of numbers) {
    sum += n;
  }

  return sum;
}

console.log(sum(range(1, 10)));
