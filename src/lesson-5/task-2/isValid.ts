const brackets = {
    '{': '}',
    '(': ')',
    '[': ']'
}
const openBrackets = Object.keys(brackets);
const closeBrackets = Object.values(brackets);

export function isValid(str: string): boolean {
    let stack: string[] = [];

    for (let item of str) {
        if (openBrackets.includes(item)) {
            stack.push(item);
        } else if (closeBrackets.includes(item)) {
            if (item !== brackets[stack.pop()!]) return false;
        }
    }
    return true;
}