import { IListItem } from "./types";

export class ListItem<T> implements IListItem<T> {
    value: T;
    next: ListItem<T> | null = null;
    prev: ListItem<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}