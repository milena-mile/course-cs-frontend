import { Result } from "./result.mjs";

function exec<R>(generator: () => Generator<unknown | Result<unknown>, R, unknown>): Result<R> {
    const iter = generator();
    return process();

    function process(data?) {
        let chunk = iter.next(data);

        if (chunk.done) {
            return new Result(() => chunk.value);
        }

        const value = new Result(() => chunk.value);

        return value.then(process).catch((err) => {
            const chunk = iter.throw(err);

            if (chunk.done) {
                return chunk.value;
            }

            return process(chunk.value);
        });
    }
}

exec(function* () {
    const a: any = yield new Result(() => 43),
         b: any = yield new Result(() => {throw 'Ooops'});

    return a + b;
}).then(console.log).catch(console.error);