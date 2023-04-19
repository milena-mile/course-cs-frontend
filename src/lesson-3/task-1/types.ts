export interface IListItem<T> {
    value: T,
    next: IListItem<T> | null;
    prev: IListItem<T> | null;
}

export interface ILinkedList<T> {
    first: IListItem<T> | null;
    last: IListItem<T> | null;
    size: number;

    addFirst(value: T): this;
    addLast(value: T): this;
    removeFirst(): this;
    removeLast(): this;
}