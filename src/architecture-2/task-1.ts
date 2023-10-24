function addToString(arr: number[]): Object {
    return Object.defineProperty(arr, 'toString', {
        writable: true,
        configurable: true,
        enumerable: false,
        value() {
            if (this.length <= 1) {
                return this.join('');
            }
            return `${this[0]}..${this.at(-1)}`;
        }
    })
}

// 1..4
console.log(addToString([1, 2, 3, 4]).toString());
// 1
console.log(addToString([1]).toString());
//
console.log(addToString([]).toString());

