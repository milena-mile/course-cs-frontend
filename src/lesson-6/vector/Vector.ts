import { TypedArray, TypedArrayType } from "../../lesson-4/typedStack/types";

export class Vector<T extends TypedArrayType> {
    #capacity: number;
    #arrayType: T;
    #buffer: TypedArray;
    length = 0;

    constructor(arrayType: T, { capacity }: { capacity: number }) {
        this.#capacity = capacity;
        this.#arrayType = arrayType;
        this.#buffer = new this.#arrayType(capacity);
    }

    push(...value: number[]): number {
        let addItem = (item: number) => {
            this.#buffer[this.length] = item;
            ++this.length;
        }
        value.forEach( (item: number) => {
            if (this.length < this.#capacity) {
                addItem(item);
            } else {
                this.increaseCapacity();
                addItem(item);
            }
        });
        return this.length;
    }

    pop(): number | undefined {
        if (this.length > 0) {
            let value = this.#buffer[this.length - 1];
            this.#buffer[this.length - 1] = 0;
            --this.length;
            return value;
        } else {
            console.log('Vector is empty.');
        }
    }

    unshift(...value: number[]): number {
        let addItem = (item: number) => {
            let length = this.#buffer.length - 1;
            for (let i = length; i >= 0; i--) {
                this.#buffer[length - (length - i)] = this.#buffer[length - (length - i + 1)];
            }
            this.#buffer[0] = item;
            ++this.length;
        }
        value.reverse().forEach( (item: number) => {
            if (this.length < this.#capacity) {
                addItem(item);
            } else {
                this.increaseCapacity();
                addItem(item);
            }
        })
        return this.length;
    }

    shift(): number | undefined  {
        if (this.length > 0) {
            let value = this.#buffer[0];
            for (let i = 0; i < this.length; i++) {
                this.#buffer[i] = this.#buffer[i + 1];
            }
            --this.length;
            return value;
        } else {
            console.log('Vector is empty.');
        }
    }

    increaseCapacity() {
        this.#capacity *= 2;
        let newBuffer = new this.#arrayType(this.#capacity);
        for (let i = 0; i < this.#buffer.length; i++) {
            newBuffer[i] = this.#buffer[i];
        }
        this.#buffer = newBuffer;
    }

    getBuffer() {
        return this.#buffer;
    }

} 