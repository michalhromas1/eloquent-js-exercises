/* My solution: */
const levelCount = 7;
const output = '#';

for (let i = 0; i < levelCount; i++) {
  let row = '';

  for (let j = 0; j <= i; j++) {
    row += output;
  }

  console.log(row);
}

/* Book solution: */
for (let line = output; line.length - 1 < levelCount; line += output) {
  console.log(line);
}
