const trails = [];
const TRAIL_COUNT = 20;

for (let i = 0; i < TRAIL_COUNT; i++) {
  const trail = document.createElement('div');
  trail.className = 'trail';
  document.body.appendChild(trail);
  trails.push(trail);
}

let currentTrail = 0;

document.addEventListener('mousemove', (e) => {
  const x = e.pageX;
  const y = e.pageY;

  trails[currentTrail].style.top = y + 'px';
  trails[currentTrail].style.left = x + 'px';

  currentTrail = (currentTrail + 1) % TRAIL_COUNT;
});
