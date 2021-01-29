const rangeStart = 1;
const rangeEnd = 100;

const output1 = 'Fizz';
const output2 = 'Buzz';

const output1Divisor = 3;
const output2Divisor = 5;

for (let i = rangeStart; i <= rangeEnd; i++) {
  let output = '';

  if (!(i % output1Divisor)) {
    output += output1;
  }

  if (!(i % output2Divisor)) {
    output += output2;
  }

  console.log(output || i);
}
