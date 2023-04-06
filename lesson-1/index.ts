import { bitGetterSetter } from "./bitGetterSetter";

const bitGetter = bitGetterSetter(new Uint8Array([0b1110, 0b1101]));
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0

const bitAccessor = bitGetterSetter(new Uint8Array([0b1110, 0b1101]));
console.log(bitAccessor.set(0, 1, 0)); //
console.log(bitAccessor.get(0, 1)); // 0