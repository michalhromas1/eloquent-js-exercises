const MAX_SIZE = 60;
const balloon = document.getElementById('balloon');

const balloonListener = document.addEventListener('keydown', changeBalloonVolume);

function changeBalloonVolume(e) {
  const key = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? 2 : 0;

  if (key < 1) {
    return;
  }

  e.preventDefault();
  const currentSize = Number(balloon.style.fontSize.match(/\d+.?\d+/));
  const newSize = currentSize * (key === 1 ? 1.1 : 0.9);

  if (newSize <= MAX_SIZE) {
    balloon.style.fontSize = `${newSize}px`;
    return;
  }

  balloon.innerText = '💥';
  document.removeEventListener('keydown', changeBalloonVolume);
}
