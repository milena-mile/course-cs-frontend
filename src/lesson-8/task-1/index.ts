import { bisecLeft } from "./binarySearch";
import { bisecRight } from "./binarySearch";

// Находит первый индекс элемента
console.log(bisecLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el: number) => el - 7));  // 6

// Находит последний индекс элемента
console.log(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el: number) => el - 7)); // 9