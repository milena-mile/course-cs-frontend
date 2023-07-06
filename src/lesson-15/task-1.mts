export function random(min: number, max: number): IterableIterator<number> {
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            return {
                value: Math.floor(Math.random() * (max - min) + min),
                done: false
            }
        }
    }
}

const randomInt = random(0, 100);

console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());
console.log(randomInt.next());