export class Result<T> {
    #data: T | null = null;
    #error: unknown;
    state: 'ok' | 'error';

    constructor(getter: () => T | Result<T>, unpack: boolean = true) {
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
                this.#data = data as any;
            }

        } catch (err) {
            this.state = 'error';
            this.#error = err;
        }
    }

    unwrap() {
        if (this.state === 'error') {
            throw this.#error;
        }

        return this.#data;
    }

    flatMap<R>(cb: (data: T) => R): Result<R> {
        if (this.state ==='ok') {
            return new Result(() => cb(this.#data!));
        }

        return this as any;
    }

    map<R>(cb: (data: T) => R): Result<R> {
        if (this.state ==='ok') {
            return new Result(() => cb(this.#data!), false);
        }

        return this as any;
    }

    then<R>(cb: (data: T) => R | Result<R>): Result<R> {
        if (this.state === 'ok') {
            return new Result(() => cb(this.#data!));
        }

        return this as any;
    }

    catch<R>(cb: (err) => R | Result<R>): Result<R> {
        if (this.state === 'error') {
            return new Result(() => cb(this.#error!));
        }

        return this as any;
    }
}

const res1 = new Result(() => 42);
const a = res1.then((data) => String(data))
    .then((data) => new Result(() => data + '-bar'))
    .map((data) => new Result(() => data.toUpperCase()));
a.unwrap()?.then(console.log); // 42-BAR

// const res2 = new Result(() => 10);

// res2.then((data) => {
// // Этот callback не вызовется
//   console.log(data);
// // А этот вызовется
// }).catch(console.error);

