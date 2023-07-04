import { TrieNode } from "./TrieNode";
import { TrieView } from "./TrieView";

export class Trie {
    protected buffer: TrieNode[] = [new TrieNode('')];

    addWord(iterable: Iterable<string>) {
        let cursor = 0;

        for (const str of iterable) {
            const current = this.buffer[cursor],
                childIndex = current.children.get(str);
 
            if (childIndex != null) {
                cursor = childIndex;
            } else {
                const node = new TrieNode(str);
                const pointer = this.buffer.push(node) - 1;
                current.children.set(str, pointer);
                cursor = pointer;
            }
        }
        this.buffer[cursor].word = true;
    }

    go(value: string) {
        return new TrieView(0, this.buffer).go(value);
    }
}