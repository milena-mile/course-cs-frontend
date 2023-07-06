import { random } from "./task-1.mjs";

function take(iterable: IterableIterator<number>, amount: number): IterableIterator<number> {
    let counter = 0;
    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            let chunk = iterable.next();

            if (counter >= amount) {
                return {value: undefined, done: true};
            }
            
            counter++;
            chunk = iterable.next();

            return chunk;
        }
    }
}


const randomInt = random(0, 100);

console.log([...take(randomInt, 15)]);