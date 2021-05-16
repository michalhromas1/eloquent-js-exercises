const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

const targetElement = document.getElementById('mountains');
targetElement.innerHTML = parseMountains(MOUNTAINS);

function parseMountains(mountains) {
  const THs = Object.keys(mountains[0])
    .map((prop) => {
      return `<th>${prop}</th>`;
    })
    .join('');

  let TRs = '';

  for (const mountain of mountains) {
    let TDs = '';

    for (const value of Object.values(mountain)) {
      const isNumeric = typeof value === 'number';
      TDs += `<td${!isNumeric ? '' : ' style="text-align: right"'}>${value}</td>`;
    }

    TRs += `<tr>${TDs}</tr>`;
  }

  return `<table><thead><tr>${THs}</tr></thead><tbody>${TRs}</tbody></table>`;
}
