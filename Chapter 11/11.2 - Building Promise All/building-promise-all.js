// Implementation
function Promise_all(promises) {
  if (!promises?.length) {
    return Promise.resolve([]);
  }

  const values = [];
  let inProgress = promises.length;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, idx) => {
      promise
        .then((val) => {
          values[idx] = val;
          inProgress--;

          if (inProgress === 0) {
            resolve(values);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

// Test
function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
  console.log('This should be [1, 2, 3]:', array);
});

Promise_all([])
  .then((array) => {
    console.log('This should be []:', array);
  })
  .catch((err) => console.warn(err));

Promise_all([soon(1), Promise.reject('X'), soon(3)])
  .then((array) => {
    console.log('We should not get here');
  })
  .catch((error) => {
    console.log('Unexpected failure:', error);
  });
