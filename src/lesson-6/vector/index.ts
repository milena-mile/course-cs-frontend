import { Vector } from "./Vector";

const uint8Vector = new Vector(Uint8Array, {capacity: 10});

console.log(uint8Vector.push(100));    // 1
console.log(uint8Vector.push(20, 10)); // 3

console.log(uint8Vector.pop());        // 10
console.log(uint8Vector.shift());      // 100

console.log(uint8Vector.unshift(1));  // 2
console.log(uint8Vector.length);      // 2