const levelCount = 7;
const output = '#';

for (let i = 0; i < levelCount; i++) {
  let row = '';

  for (let j = 0; j <= i; j++) {
    row += output;
  }

  console.log(row);
}
