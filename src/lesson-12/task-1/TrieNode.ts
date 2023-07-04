export class TrieNode {
    word: boolean;
    value: string;
    children: Map<string, number> = new Map();

    constructor(value: string, word: boolean = false) {
        this.value = value;
        this.word = word;
    }
}