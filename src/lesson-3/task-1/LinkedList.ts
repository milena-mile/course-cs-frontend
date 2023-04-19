import { IListItem, ILinkedList } from "./types";
import { ListItem } from "./LinkedListItem";

export class LinkedList<T> implements ILinkedList<T> {
    first: IListItem<T> | null;
    last: IListItem<T> | null;
    size: 0;

    addFirst(value: T): this {
        var newItem = new ListItem(value);

        if (!this.first) {
            this.first = newItem;
        }
        else if (!this.first.next) {
            this.last = this.first;
            this.first = newItem;
            this.last.prev = this.first;
            this.first.next = this.last;
        }
        else if (this.first !== null) {
            var oldFirst = this.first;
            this.first.prev = newItem;
            this.first = newItem;
            this.first.next = oldFirst;
        }
        this.size++;
        return this;
    }

    addLast(value: T): this {
        var newItem = new ListItem(value);

        if (!this.last) {
            this.last = newItem;
            this.first = this.last;
        }
        else if (!this.last.prev) {
            this.first = this.last;
            this.last = newItem;
            this.first.next = this.last;
            this.last.prev = this.first;
        }
        else if (this.last !== null) {
            var oldLast = this.last;
            this.last.next = newItem;
            this.last = newItem;
            this.last.prev = oldLast;
        }

        this.size++;
        return this;
    }

    removeFirst(): this {
        if (this.first === null)
            throw new Error('Linked List is empty!');
        if (this.first === this.last) {
            this.first = this.last = null;
            console.log('It was the las element. Linked list is empty now.');
        }
        else {
            this.first = this.first.next;
            if (this.first !== null) {
                this.first.prev = null;
            }
        }

        this.size--;
        return this;
    }

    removeLast(): this {
        if (this.last === null)
            throw new Error('Linked List is empty!');
        if (this.first === this.last) {
            this.first = this.last = null;
            console.log('It was the las element. Linked list is empty now.');
        }
        else {
            this.last = this.last.prev;
            if (this.last !== null) {
                this.last.next = null;
            }
        }
        this.size--;
        return this;
    }

    *[Symbol.iterator]() {
        let current = this.first;
        while (current !== null) {
            yield current.value;
            current = current.next;
        }
    }
}