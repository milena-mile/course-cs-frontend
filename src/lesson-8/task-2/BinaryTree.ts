import { BinaryNodeChildren } from "./types";

export class BinaryNode<T> {
    value: T;
    parent: BinaryNode<T> | null;
    left: BinaryNode<T> | null;
    right: BinaryNode<T> | null;

    constructor(value: T, {parent, left, right}: BinaryNodeChildren<T> & {parent?: BinaryNode<T>} = {}) {
        this.value = value;
        this.parent = parent ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

export class BinaryTree<T> {
    root: BinaryNode<T>;

    constructor(value: T, {left, right, parent}: BinaryNodeChildren<T> = {}) {
        this.root = new BinaryNode(value, {left, right, parent});
    }

    find(value: T) {
        function findNode(node) {
            if (node === null) {
                return null;
            }
            if (value === node.value) {
                return node;
            }
            if (value < node.value) {
                return findNode(node.left);
            }
            return findNode(node.right);
        }
        return findNode(this.root);
    }

    min() {
        let min: T = this.root.value;

        function findMin(node) {
            if (node == null) {
                return null;
            }
            if (node.value < min) {
                min = node.value;
            }
            return findMin(node.left);
        }

        findMin(this.root);
        return min;
    }

    max() {
        let max: T = this.root.value;

        function findMax(node) {
            if (node == null) {
                return null;
            }
            if (node.value > max) {
                max = node.value;
            }
            return findMax(node.right);
        }

        findMax(this.root);
        return max;
    }

    add(value: T) {
        function addNode(node) {
            if (value == node.value) return;

            if (value > node.value) {
                if (node.right) {
                    addNode(node.right);
                } else {
                    //console.log(node, ' right');
                    node.right = new BinaryNode(value, {parent: node});
                }

            } else if (value < node.value) {
                if (node.left) {
                    addNode(node.left);
                } else {
                    //console.log(node, ' left');
                    node.left = new BinaryNode(value, {parent: node});
                }
            }
        }

        addNode(this.root);
    }

    remove(value: T) {
        function removeNode(node) {
            if (value > node.value) {
                if (node.right) {
                    removeNode(node.right);
                } else {
                    console.log("Binary Tree doesn't have such node");
                }
                
            } else if (value > node.value) {
                if (node.left) {
                    removeNode(node.left);
                } else {
                    console.log("Binary Tree doesn't have such node");
                }

            } else if (value == node.value) {
                if (node.right != null && node.left != null) {
                    if (node.right.left == null) {
                        node = node.right;

                    } else {
                        let removingNode = node;
                        let cursor = node.right;
                        let parent = node;

                        while (cursor != null) {
                            const value = cursor.value;
                            removingNode.value = value;
                            if (!cursor.left) {
                                parent.left = null;
                                cursor = null;
                            } else {
                                parent = cursor;
                                cursor = cursor.left;
                            }
                        }
                    }

                } else if (node.right != null) {
                    node = node.right;
                    return node;

                } else if (node.left != null) {
                    node = node.left;
                    return node;

                } else if (node.right == null && node.left == null) {
                    node = null;
                    return node;
                }
            }
        }

        removeNode(this.root);
    }

    traverseInOrder() {
        let root = this.root;

        function inOrder(root) {
            if (root != null) {
                inOrder(root.left);
                console.log(root.value);
                inOrder(root.right);
            }
        }

        inOrder(root);
    }

    traverseDirect() {
        let root = this.root;
        let stack: any[] = [root];

        while (stack.length > 0) {
            let node = stack.pop();
            console.log(node.value);
            if (node.right != null) {
                stack.push(node.right);
            }
            if (node.left != null) {
                stack.push(node.left);
            } 
        }
        
    }

}