import { BinaryNode } from "./BinaryTree";
import { BinaryTree } from "./BinaryTree";

const tree: BinaryTree<number> = new BinaryTree(10);
tree.add(15);
tree.add(3);
tree.add(8);
tree.add(7);
tree.add(18);
tree.add(13);

console.log(tree.min()); // 3
console.log(tree.max()); // 18     
tree.add(12);  
console.log(tree.find(15));
tree.remove(10);
tree.traverseInOrder();  // 3 7 8 12 13 15 18          
