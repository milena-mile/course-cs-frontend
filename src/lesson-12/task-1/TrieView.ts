import { TrieNode } from "./TrieNode";

export class TrieView {
    constructor(protected start: number, protected buffer: TrieNode[]) {}

    get isWord() {
        if (this.start === -1 || this.buffer[this.start] == null) {
            return false;
        }

        return this.buffer[this.start].word;
    }

    go(value: string) {
        if (this.start === -1 || this.buffer[this.start] == null) {
            return this;
        }

        return new TrieView(this.buffer[this.start].children.get(value) ?? -1, this.buffer)
    }
}