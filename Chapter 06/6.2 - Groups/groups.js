class Group {
  constructor() {
    this.group = [];
  }

  add(value) {
    if (this.has(value)) return;
    this.group.push(value);
  }

  delete(value) {
    const idx = this.group.findIndex((v) => v === value);
    if (idx === -1) return;

    this.group.splice(idx, 1);
  }

  has(value) {
    return this.group.some((v) => v === value);
  }

  static from(iterable) {
    const isIterable = Symbol.iterator in Object(iterable);
    if (!isIterable) return;

    const group = new Group();

    for (const item of iterable) {
      group.add(item);
    }

    return group;
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
console.log(group.has(30));

group.add(10);
group.delete(10);
console.log(group.has(10));
