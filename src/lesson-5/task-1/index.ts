import { collapseRecursion } from "./recursion";
import { collapseStack } from "./stack";

const objRecursion = {
    a: {
      b: [1, 2],
      '': {c: 2},
      d: [3, 4]
    }
  };
  
  /* { 'a.b.0': 1, 'a.b.1': 2, 'a..c': 2, 'a.d.0': 3, 'a.d.1': 4 } */
console.log(collapseRecursion(objRecursion));

const objStack = {
    a: {
      b: [3, 4],
      '': {c: 2},
      d: [1, 2]
    }
  };
  
  /* { 'a.b.0': 3, 'a.b.1': 4, 'a..c': 2, 'a.d.0': 1, 'a.d.1': 2 } */
console.log(collapseStack(objStack));