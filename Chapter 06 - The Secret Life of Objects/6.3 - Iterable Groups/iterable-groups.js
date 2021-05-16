class Group {
  constructor() {
    this.group = [];
  }

  add(value) {
    if (this.has(value)) return;
    this.group.push(value);
  }

  delete(value) {
    this.group = this.group.filter((v) => v !== value);
  }

  has(value) {
    return this.group.includes(value);
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }

  static from(iterable) {
    const group = new Group();

    for (const item of iterable) {
      group.add(item);
    }

    return group;
  }
}

class GroupIterator {
  idx = 0;

  constructor(group) {
    this.group = group;
    this.length = group.group.length;
  }

  next() {
    this.idx++;

    return {
      value: this.group.group[this.idx - 1],
      done: this.idx > this.length,
    };
  }
}

for (let value of Group.from(['a', 'b', 'c'])) {
  console.log(value);
}
