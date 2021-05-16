const size = 8;
const doesFirstRowStartWhite = true;

const blackTile = '#';
const whiteTile = ' ';

for (let i = 0; i < size; i++) {
  const isWhiteFirst = doesFirstRowStartWhite ? !!(i % 2) : !(i % 2);
  let row = '';

  for (let j = 0; j < size; j++) {
    if (isWhiteFirst) {
      row += j % 2 ? whiteTile : blackTile;
    } else {
      row += j % 2 ? blackTile : whiteTile;
    }
  }

  console.log(row);
}
