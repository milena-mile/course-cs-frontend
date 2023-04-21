import { LinkedList } from "../../lesson-3/task-1/LinkedList";

export class Queue {
    list = new LinkedList();

    get head() {
        return this.list.first?.value;
    }
    
    empty() {
        if (this.list.size === 0) {
            throw new Error('Queue is empty!');
        }
    }

    push(value: (string | number)) {
        this.list.addLast(value);
    }

    pop() {
        this.empty();
        let value = this.list.first?.value;
        this.list.removeFirst();
        return value;
    }
}