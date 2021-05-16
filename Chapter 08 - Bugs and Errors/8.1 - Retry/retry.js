class MultiplicationUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  const success = Math.random() < 0.2;

  if (success) {
    return a * b;
  }

  throw new MultiplicationUnitFailure();
}

function multiplyNumbers(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!(e instanceof MultiplicationUnitFailure)) {
        throw e;
      }
    }
  }
}

console.log(multiplyNumbers(2, 6));
