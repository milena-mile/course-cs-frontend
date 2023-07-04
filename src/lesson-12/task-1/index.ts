import { Trie } from "./Trie";

const trie = new Trie();

trie.addWord('мясо');
trie.addWord('мясорубка');
trie.addWord('мир');

console.log(trie.go('м').go('я').go('с').go('о').isWord); // true
console.log(trie.go('м').go('и').go('р').isWord);         // true
console.log(trie.go('м').go('о').go('р').go('е').isWord); // false