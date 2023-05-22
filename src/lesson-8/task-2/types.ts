import { BinaryNode } from "./BinaryTree";

export interface BinaryNodeChildren<T> {
    left?: BinaryNode<T>;
    right?: BinaryNode<T>;
    parent?: BinaryNode<T>;
}