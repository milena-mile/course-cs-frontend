import { intoIter } from "./iter.mjs";
import { Parser, ParserToken, ParserResult } from "./parserModel.mjs";
import { take } from "./take.mjs";
import { tag } from "./tag.mjs";

export const seq = (...parsers: Parser[]): Parser => {
    return function* (iterable: Iterable<string>): Generator<ParserToken, ParserResult, Iterable<string>> {
      let innerIter = intoIter(iterable);
      let result = '';
  
      for (const parser of parsers) {
        const chunk = parser(innerIter).next();
        const [token, iterator] = chunk.value as ParserResult<string>;
  
        innerIter = intoIter(iterator);
        result += token.value;
      }
  
      return [{ type: 'SEQ', value: result }, innerIter];
    };
  };

  const fnExpr = seq(
    tag('function '),
    take(/[a-z_$]/i, {max: 1}),
    take(/\w/, {min: 0}),
    tag('()')
  )('function foo() {}');
  
  console.log(fnExpr.next()); // {done: true, value: {type: 'SEQ', value: 'function foo()'}}