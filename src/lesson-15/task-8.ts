function mapSeq(iter: Iterable<number>, funcs: Function[]): IterableIterator<number> {
    const innerIter = iter[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        }, 

        next() {
            let chunk = innerIter.next();
            let res = 0,
                el = chunk.value;

            if (chunk.done) {
                return {value: undefined, done: true}
            }

            for (let i = 0; i < funcs.length; i++) {
                res = funcs[i](el);
                el = res;
            }
            
            return {
                value: res,
                done: false
            }
        }
    }
}

console.log(...mapSeq([1, 2, 3, 6], [(el) => el * 2, (el) => el - 1, (el) => el + 3])); // [1, 3, 5]