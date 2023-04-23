import { TypedArray, TypedArrayType, IStack } from "./types";

export class Stack implements IStack {
    typedArr: TypedArray;
    length: number | string;

    constructor(TypedArray: TypedArrayType, length: number) {
        this.typedArr = new TypedArray(length);
        this.length = length;
    }

    size: number = 0;

    get head() {
        return this.typedArr[this.size - 1];
    }

    push(value: number) {
        if (this.size < +this.length) {
            this.typedArr[this.size] = value;
            this.size++;
        } else {
            throw new Error('Stack is full.');
        }
        
    }

    pop(): number {
        if (this.size > 0) {
            let value = this.typedArr[this.size - 1];
            this.typedArr[this.size - 1] = 0;
            this.size--;
            return value;
        } else {
            throw new Error('Stack is empty.');
        }
    }

}