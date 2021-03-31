class Rabbit {
  noise = 'rab';

  constructor(type) {
    this.type = type;
  }

  speak(line) {
    return `The ${this.type} rabbit says ${this.noise} ${line}`;
  }
}

let killerRabbit = new Rabbit('killer');

console.log(Rabbit.prototype); //?

killerRabbit.speak('ok'); //?

console.log(Object.getPrototypeOf(killerRabbit));

const a = Object.create(killerRabbit);
a.hi = 'hi';
a.speak(); //?
