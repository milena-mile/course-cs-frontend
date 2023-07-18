import { Parser, ParserResult, ParserToken } from './parserModel.mjs';
import { intoIter } from "./iter.mjs";

export function tag(str: string): Parser {
    return function* (iterable: Iterable<string>): Generator<ParserToken, ParserResult, Iterable<string>> {
        const innerIter = intoIter(iterable);
        let result = '';

        for (const char of str) {
            const chunk = innerIter.next();

            if (chunk.done || chunk.value !== char) {
                throw new Error('Invalid string');
            }

            result += char;
        }
        
        return [{ type: 'TAG', value: result }, innerIter];
    }
}

const fnTag = tag('function')('function foo() {} function');
console.log(fnTag.next()); // {done: true, value: {type: 'TAG', value: 'function'}}