class symbolRange<T extends number | string> {
    type: 'string' | 'number';
    from: number;
    to: number;
    reversed: boolean;

    constructor(from: T, to: T) {
        this.type = typeof from === 'string' ? 'string' : 'number';
        this.from = this.getNumber(from);
        this.to = this.getNumber(to);
        this.reversed = this.from > this.to;
    }

    [Symbol.iterator]() {
        return this.values();
    }

    reverse(): IterableIterator<number | string> {
        return new symbolRange(this.getT(this.to), this.getT(this.from)).values();
    }

    values(): IterableIterator<number | string> {
        let start = this.from,
            end = this.to;
        
        return {
            [Symbol.iterator]() {
                return this;
            },

            next: () => {
                if (this.reversed ? (start < end) : (start > end)) {
                    return {value: undefined, done: true}
                }

                return {
                    value: this.getT(this.reversed ? start-- : start++),
                    done: false
                }
            }
        }
    }

    protected getNumber(value: number | string) {
        if (typeof value === 'string') {
            return value.codePointAt(0) ?? NaN;
        };

        return Number(value)
    }

    getT(value: number) {
        if (this.type === 'string') {
            return String.fromCodePoint(value);
        };

        return value;
    }
}

const charRange = new symbolRange('a', 'f');
console.log(Array.from(charRange)); // ['a', 'b', 'c', 'd', 'e', 'f']
console.log(Array.from(charRange.reverse())); // [ 'f', 'e', 'd', 'c', 'b', 'a' ]

const numberRange = new symbolRange(-5, 1);
console.log(Array.from(numberRange.reverse())); // [1, 0, -1, -2, -3, -4, -5]