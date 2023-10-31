function overload(fns): () => number {
    const map = {};
    for (let fn of fns) {
        map[fn.length] = fn;
    }
    
    return function(...args: number[]) {
        const current = map[args.length];

        if (current != null) {
            return current.apply(this, args);
        }
        return Object.values(map).at(-1).apply(this, args);
    }
}

const myFunction = overload([
    () => 100500,
    (a, b) => a + b,
    (a, b, c) => a * b * c
  ]);
  

  console.log(myFunction());  // 100500
  console.log(myFunction(1, 2));  // 3
  console.log(myFunction(2, 3, 4));  // 24