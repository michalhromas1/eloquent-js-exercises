let cat = document.querySelector('#cat');
let hat = document.querySelector('#hat');

const OFFSET_X = 300;
const OFFSET_Y = 300;

let angle = 0;
let lastTime = null;

function animate(time) {
  if (lastTime != null) angle += (time - lastTime) * 0.001;
  lastTime = time;

  cat.style.top = Math.sin(angle) * 40 + 40 + OFFSET_Y + 'px';
  cat.style.left = Math.cos(angle) * 200 + 230 + OFFSET_X + 'px';

  hat.style.top = Math.sin(angle + Math.PI) * 40 + 40 + OFFSET_Y + 'px';
  hat.style.left = Math.cos(angle + Math.PI) * 200 + 230 + OFFSET_X + 'px';

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
