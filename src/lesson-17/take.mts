import { Parser, ParserResult, ParserToken, ParserParams } from './parserModel.mjs';
import { intoIter, intoSeq } from "./iter.mjs";

export function take(regExp: RegExp, params?: Partial<ParserParams>): Parser {
    return function* (iterable: Iterable<string>): Generator<ParserToken, ParserResult, Iterable<string>> {
        const innerIter = intoIter(iterable);
        const {max = Infinity, min = 1} = params || {};
        const prevIterable = [];
        let result = '';
        let count = 0;

        while (count < max) {
            const chunk = innerIter.next();

            if (!regExp.test(chunk.value) && (!result || result.length < min)) {
                throw new Error('Invalid string');
            }

            if (chunk.done || !regExp.test(chunk.value)) {
                prevIterable.push(chunk.value);

                break;
            }

            result += chunk.value;
            count++;
        }
        return [{ type: 'TAKE', value: result }, prevIterable.length > 0 ? intoSeq(prevIterable, innerIter) : innerIter];
    }
}

const takeNumber = take(/\d/)('1234 foo');
console.log(takeNumber.next()); // {done: true, value: {type: 'TAKE', value: '1234'}}

const takeNumber2 = take(/\d/, {max: 2})('1234 foo');
console.log(takeNumber2.next()); // {done: true, value: {type: 'TAKE', value: '12'}}