import { Parser, ParserResult, ParserToken } from './parserModel.mjs';
import { intoIter, intoSeq, intoBuffer } from "./iter.mjs";
import { tag } from './tag.mjs';

export const or = (...parsers: Parser[]): Parser => {
    return function* (iterable: Iterable<string>): Generator<ParserToken, ParserResult, Iterable<string>> {
        let buffer: string[] = [];
        let innerIter = intoBuffer(iterable, buffer);
        let parserResult,
            done;
  
        for (const parser of parsers) {
            try {
                const chunk = parser(innerIter).next();
                parserResult = chunk.value as ParserResult<string>;
            } catch (error) {
                innerIter = intoSeq(buffer, innerIter);
            }
      }

      if (!done) {
        throw new Error('Invalid data');
        }
  
      const [token, iter] = parserResult!;
  
      return [{ type: 'OR', value: token.value }, intoIter(iter)];
    };
  };

const boolExpr = or(
    tag('true'),
    tag('false')
  )('false');
  
  console.log(boolExpr.next()); // {done: true, value: {type: 'TAG', value: 'false'}}