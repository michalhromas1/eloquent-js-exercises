// Helper code from https://eloquentjavascript.net/
const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error('Locked!');
    return this._content;
  },
};

// Implementation
function withBoxUnlocked(body) {
  const locked = box.locked;
  if (!locked) {
    return body();
  }

  try {
    box.unlock();
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function () {
  box.content.push('gold piece');
});

try {
  withBoxUnlocked(function () {
    throw new Error('Pirates on the horizon! Abort!');
  });
} catch (e) {
  console.log('Error raised: ' + e);
}

console.log(box.locked);
