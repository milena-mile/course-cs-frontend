function compose(...fns: Array<Function>) {
    return fns.reduce((res, fn) => {
        return (value: number) => res(fn(value));
    })
}

const f = compose(
    (a) => a ** 2,
    (a) => a * 10,
    (a) => Math.sqrt(a) // Первая
  );
  
  console.log(f(16)); // 1600