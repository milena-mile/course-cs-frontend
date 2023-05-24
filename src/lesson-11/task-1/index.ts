const alphabets = [
    ['arabic', (code: number): number => (code > 0x0039) ? 1 : (code < 0x0030) ? -1 : 0],
    ['rome', (code: number): number => (code > 0x2188) ? 1 : (code < 0x2160) ? -1 : 0],
    ['greek', (code: number): number => (code > 0x10174) ? 1 : (code < 0x10140) ? -1 : 0]
] as const;

function getAlphabet(code: number) {
    for (let item of alphabets) {
        const [type, comparator] = item;
        const res = comparator(code);
        if (res == 0) return type;
    }
}

function isDigit(str: string) {
    const firstCharType = getAlphabet(str[0].codePointAt(0)!);
    if (firstCharType == undefined) return false;

    for (let i of str) {
        const code: number = i.codePointAt(0)!;
        const type = getAlphabet(code);
        
        if (type == undefined) return false;
        if (type != firstCharType) return false;
    }

    return true;
}

console.log(isDigit('123')); // true
console.log(isDigit('Ⅳ'));  // true
console.log(isDigit('1X2')); // false
console.log(isDigit('a1s')); // false