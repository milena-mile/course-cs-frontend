export interface Bit {
    get(arrIndex: number, getBit: number): number,
    set(arrIndex: number, getBit: number, setBit: number): void
}