function seq<T extends Iterable<any>[]>(...iterables: T) {
    const iter = iterables.map(i => i[Symbol.iterator]()).values();

    let cursor = iter.next(),
        innerIter;

    return {
        [Symbol.iterator]() {
            return this;
        },
        
        next() {
            while (true) {
                if (cursor.done) {
                    return {value: undefined, done: true}
                }
    
                innerIter ??= cursor.value;
                const chunk = innerIter.next();
    
                if (!chunk.done) {
                    return chunk;
                }
    
                cursor = iter.next();
                innerIter = null;
            }
        }
    }
}

console.log(...seq([1, 2], new Set([3, 4]), 'bla')); // 1, 2, 3, 4, 'b', 'l', 'a'