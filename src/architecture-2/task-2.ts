Object.defineProperty(String.prototype, 'capitalize', {
    writable: true,
    configurable: true,
    enumerable: false,
    value() {
        return `${this[0].toUpperCase()}${this.slice(1)}`;
    }
});

console.log("foo".capitalize());