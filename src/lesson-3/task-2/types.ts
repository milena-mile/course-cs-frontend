export interface Structure {
    set(key: string, value: string | number): void,
    get(key: string): (string | number);
}