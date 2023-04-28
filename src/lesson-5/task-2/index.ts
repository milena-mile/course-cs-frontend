import { isValid } from "./isValid";

console.log(isValid('(hello{world} and [me])'));  // true
console.log(isValid('(hello{world)} and [me])')); // false
console.log(isValid('(hello{world}) and [me]')); // true
console.log(isValid(')'));  //false