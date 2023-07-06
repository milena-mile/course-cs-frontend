import { random } from "./task-1.mjs";
import { take } from "./task-2.mjs";

function filter(iterable: IterableIterator<number>, func: (el: number) => boolean): IterableIterator<number> {
    const innerIter = iterable[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            let chunk = innerIter.next();

            while (true) {
                if (chunk.done) {
                    return {value: undefined, done: true};
                }
                
                if (func(chunk.value)) {
                    return chunk;
                }
    
                chunk = innerIter.next();
            }
        }
    }
}

const randomInt = random(0, 100);

console.log([...take(filter(randomInt, (el) => el > 30), 15)]);