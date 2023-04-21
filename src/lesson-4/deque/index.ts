import { Deque } from "./Deque";

const deque = new Deque();

deque.push(10);
deque.unshift(11);
deque.push(12);

console.log(deque.pop());   // 12
console.log(deque.shift()); // 11
console.log(deque.pop());   // 10
console.log(deque.pop());   // Exception