import { random } from "./task-1.mjs";

export function take(iterable: IterableIterator<number>, amount: number): IterableIterator<number> {
    const innerIter = iterable[Symbol.iterator]();
    let counter = 0;
    
    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            let chunk = innerIter.next();

            if (counter >= amount) {
                return {value: undefined, done: true};
            }
            
            counter++;
            chunk = innerIter.next();

            return chunk;
        }
    }
}


const randomInt = random(0, 100);

console.log([...take(randomInt, 15)]);