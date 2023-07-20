class Result<T> {
    #data: T | null;
    #error: unknown;
    state: 'ok' | 'error' = 'ok';

    constructor(getter: () => T, unpack: boolean = true) {
        const data = getter();

        try {
            if (unpack && data instanceof Result) {
                data.then((data) => {
                    this.state = 'ok';
                    this.#data = data;
                })
                .catch((err) => {
                    this.state = 'error';
                    this.#error = err;
                })

            } else {
                this.state = 'ok';
                this.#data = data;
            }


        } catch (err) {
            this.state = 'error';
            this.#error = err;
        }
    }

    then<R>(cb: (data: T) => R): Result<R> {
        if (this.state = 'ok') {
            return new Result(() => cb(this.#data!));
        }

        return <any>this;
    }

    catch<R>(cb: (err) => R): Result<R> {
        if (this.state = 'error') {
            return new Result(() => cb(this.#error!));
        }

        return <any>this;
    }
}

const res1 = new Result(() => 42);

res1.then((data) => {
  console.log(data);
});

const res2 = new Result(() => { throw 'Boom!'; });

res2.then((data) => {
// Этот callback не вызовется
  console.log(data);
// А этот вызовется
}).catch(console.error);