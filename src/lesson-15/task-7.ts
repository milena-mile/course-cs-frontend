function zip<T extends Iterable<any>[]>(...iterables: T) {
    const iters = iterables.map(i => i[Symbol.iterator]());

    return {
        [Symbol.iterator]() {
            return this;
        },
        
        next() {
            const res = new Array(iters.length);

            for (const [i, iter] of iters.entries()) {
                const chunk = iter.next();

                if (chunk.done) {
                    return {value: undefined, done: true}
                }

                res[i] = chunk.value;
            }

            return {
                done: false,
                value: res
            }
        }
    }
}

console.log(...zip([1, 2, 5], new Set([3, 4]), 'bl')); // [[1, 3, b], [2, 4, 'l']]