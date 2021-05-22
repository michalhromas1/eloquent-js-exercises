const TRAIL_COUNT = 20;
const TRAIL_CLASS = 'trail';
const DELAY = 10;

(function () {
  let posX = 0;
  let posY = 0;

  const trails = createTrails(TRAIL_COUNT);
  document.body.append(...trails);
  document.addEventListener('mousemove', onMouseMove);

  function onMouseMove(e) {
    posX = e.pageX;
    posY = e.pageY;

    requestAnimationFrame(() => animate());
  }

  async function animate() {
    for (let i = 0; i < TRAIL_COUNT; i++) {
      moveTrail(trails[i]);

      if (i + 1 !== TRAIL_COUNT) {
        await delay(DELAY);
      }
    }
  }

  function moveTrail(trail) {
    trail.style.left = `${posX}px`;
    trail.style.top = `${posY}px`;
  }
})();

function createTrails(count) {
  const trails = [];

  for (let i = 0; i < count; i++) {
    const trail = document.createElement('div');
    trail.classList.add(TRAIL_CLASS);
    trails.push(trail);
  }

  return trails;
}

async function delay(time) {
  await new Promise((resolve) => setTimeout(resolve, time));
}
