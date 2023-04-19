import { LinkedList } from "./LinkedList";

const list = new LinkedList();

list.addLast(1);
list.addLast(2);
list.addLast(3);

console.log(list.first.value);      // 1
console.log(list.last.value);       // 3
console.log(list.first.next.value); // 2

list.addFirst(0);

console.log(list.first.value);      // 0
console.log(list.first.next.value); // 1

list.removeLast();

 console.log(list.last.value);       // 2
 console.log(list.last.prev.value);  // 1

for (const value of list) {
  console.log(value);
}
