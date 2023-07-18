import { Parser, ParserResult, ParserToken, ParserParams } from './parserModel.mjs';
import { intoIter } from "./iter.mjs";
import { seq } from './seq.mjs';
import { take } from './take.mjs';
import { tag } from './tag.mjs';

export function repeat(parser: Parser, params: Partial<ParserParams>): Parser {
    return function* (iterable: Iterable<string>): Generator<ParserToken, ParserResult, Iterable<string>> {
        let innerIter = intoIter(iterable);
        let {max = Infinity, min = 1} = params || {};
        let result = '';
        let iter = null;

        try {
            while (max) {
                const chunk = parser(innerIter).next();
                const [token, iterator] = chunk.value as ParserResult;
                iter = iterator;
                result += token.value;

                yield token;

                min--;
                max--;
            }
        } catch (error) {
            return [{ type: 'REPEAT', value: result }, iter!];
        }

        if (min) {
            throw new Error('Invalid string');
        }

        return [{ type: 'REPEAT', value: result }, iter!];
    }
}

const takeNumbers = repeat(
    seq(take(/\d/), tag(',')),
    {min: 1}
  )('100,200,300,');
  
  console.log(takeNumbers.next()); // {done: false, value: {type: 'SEQ', value: '100,'}}
  console.log(takeNumbers.next()); // {done: false, value: {type: 'SEQ', value: '200,'}}
  console.log(takeNumbers.next()); // {done: false, value: {type: 'SEQ', value: '300,'}}