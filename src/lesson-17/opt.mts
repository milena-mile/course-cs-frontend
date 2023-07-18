import { Parser, ParserResult, ParserToken } from './parserModel.mjs';
import { repeat } from "./repeat.mjs";
import { take } from "./take.mjs";
import { seq } from "./seq.mjs";
import { tag } from "./tag.mjs";
import { intoIter } from './iter.mjs';

export function opt(parser): Parser {
    return function* (iterable: Iterable<string>): Generator<ParserToken, ParserResult, Iterable<string>> {
        let innerIter = intoIter(iterable);

        try {
            const chunk = parser(innerIter).next();
            const [token, iterator] = chunk.value as ParserResult;
            return [{ type: 'OPT', value: token.value }, iterator];
        } catch (error) {
            return [{ type: 'OPT', value: '' }, innerIter];
        }
    }
}

const takeNumbers = repeat(
    seq(take(/\d/), opt(tag(','))),
    {min: 1}
  )('100,200,300');
  
  console.log(takeNumbers.next()); // {done: false, value: {type: 'SEQ', value: '100,'}}
  console.log(takeNumbers.next()); // {done: false, value: {type: 'SEQ', value: '200,'}}
  console.log(takeNumbers.next()); // {done: false, value: {type: 'SEQ', value: '300'}}