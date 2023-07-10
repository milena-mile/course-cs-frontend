class BinaryHeap {
    head() {
        return this.buffer[0];
    }
    length() {
        return this.lastIndex + 1;
    }
    constructor(comparator, buffer = []) {
        this.buffer = buffer;
        this.comparator = comparator;
        this.lastIndex = buffer.length - 1;
    }
    push(...values) {
        for (const value of values) {
            this.lastIndex++;
            this.buffer[this.lastIndex] = value;
            this.fromBottom();
        }
        return this.length();
    }
    pop() {
        const head = this.head();
        if (this.lastIndex >= 0) {
            this.buffer[0] = this.buffer[this.lastIndex];
            this.buffer[this.lastIndex] = null;
            this.lastIndex--;
            this.toBottom();
        }
        return head;
    }
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    getLeftChildIndex(index) {
        return index * 2 + 1;
    }
    getRightChildIndex(index) {
        return index * 2 + 2;
    }
    fromBottom(cursor = this.lastIndex) {
        if (this.length() <= 1) {
            return;
        }
        const value = this.buffer[cursor];
        while (cursor > 0) {
            const parentIndex = this.getParentIndex(cursor), parent = this.buffer[parentIndex];
            if (this.comparator(value, parent) <= 0) {
                break;
            }
            this.buffer[cursor] = parent;
            cursor = parentIndex;
        }
        this.buffer[cursor] = value;
    }
    toBottom(cursor = 0) {
        if (this.length() <= 1) {
            return;
        }
        let leftChildIndex = this.getLeftChildIndex(cursor), rightChildIndex = this.getRightChildIndex(cursor);
        const value = this.buffer[cursor];
        while (leftChildIndex <= this.lastIndex) {
            let childIndex;
            if (rightChildIndex > this.lastIndex) {
                childIndex = leftChildIndex;
            }
            else {
                childIndex = this.comparator(this.buffer[leftChildIndex], this.buffer[rightChildIndex]) >= 0 ?
                    leftChildIndex :
                    rightChildIndex;
            }
            const child = this.buffer[childIndex];
            if (this.comparator(value, child) >= 0) {
                break;
            }
            this.buffer[cursor] = child;
            cursor = childIndex;
            leftChildIndex = this.getLeftChildIndex(cursor);
            rightChildIndex = this.getRightChildIndex(cursor);
        }
        this.buffer[cursor] = value;
    }
}
function heapSort(arr, comparator) {
    const q = new BinaryHeap(comparator, arr);
    for (let i = Math.floor(arr.length / 2); i--;) {
        q.toBottom(i);
    }
    for (let i = 0; i < arr.length; i++) {
        arr[arr.length - 1 - i] = q.pop();
    }
    return arr;
}
let res = heapSort([15, 10, 3, 18, 7, 8, 12], (a, b) => a - b);
console.log(res);
