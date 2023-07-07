import { random } from "./task-1.mjs";
import { take } from "./task-2.mjs";

export function enumerate(i: Iterable<number>): IterableIterator<any> {
    const innerIter = i[Symbol.iterator]();
    let key = -1; // Initialize key as -1

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            let chunk = innerIter.next();

            if (chunk.done) {
                return { value: undefined, done: true };
            }

            key++; // Increment key by 1
            return {
                value: [key, chunk.value],
                done: false
            };
        }
    };
}
const randomInt = random(0, 100);

console.log([...take(enumerate(randomInt), 4)]); // [[0, ...], [1, ...], [2, ...]]