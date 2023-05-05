import { HashMap } from "./HashMap";

const map = new HashMap(30);

map.set('foo', 1);
map.set(42, 10);
map.set(24, 15);
map.set(222, 40);
map.set({b: 3}, 100);

console.log(map.get(42));        // 10
console.log(map.get(24));        // 15
console.log(map.get(222));       // 40
console.log(map.has({b: 3}));    // true
console.log(map.delete({b: 3})); // 100
console.log(map.has({b: 3}));    // false
console.log(map.has(24));       // true
console.log(map.delete(222));    // 40  
console.log(map.has(24));       // true
console.log(map.has(222));      // false
