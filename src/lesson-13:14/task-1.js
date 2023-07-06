let myRegExp = /^[\w$]*$/i;

console.log(myRegExp.test('привет'));          // false
console.log(myRegExp.test('200$'));            // true
console.log(myRegExp.test('12привет hi 223')); // false
console.log(myRegExp.test('hello'));           // true
console.log(myRegExp.test('how_are_you'));     // true
console.log(myRegExp.test('how are you'));     // false