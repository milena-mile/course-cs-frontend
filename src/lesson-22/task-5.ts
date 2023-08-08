import AggregateError from "aggregate-error";

class SyncPromise {
    protected onFulfilled: Function[] = [];
    protected onRejected: Function[] = [];
    protected state: 'pending' | 'fulfilled' |'rejected' = 'pending';
    protected value;

    static resolve(value) {
        if (value instanceof SyncPromise) {
            return value;
        }

        return new SyncPromise((resolve) => {
            resolve(value);
        })
    }

    static reject(value) {
        return new SyncPromise((_, reject) => {
            reject(value);
        })
    }

    static all(iterable) {
        return new SyncPromise((resolve, reject) => {
            const promises = [...iterable].map(SyncPromise.resolve),
                res = new Array(promises.length);
            let pending = promises.length;

            promises.forEach((promise, i) => {
                promise.then(
                    (value) => {
                        res[i] = value;
                        pending--;

                        if (pending === 0) {
                            resolve(res);
                        }
                    },
                    (error) => {
                        reject(error);
                    }
                );
            })
        })
    }

    static allSettled(iterable) {
        return new SyncPromise((resolve, reject) => {
            const promises = [...iterable].map(SyncPromise.resolve),
                res = new Array(promises.length);
            let pending = promises.length;

            promises.forEach((promise, i) => {
                promise.then(
                    (value) => {
                        res[i] = {status: 'fulfilled', value};
                        pending--;

                        if (pending === 0) {
                            resolve(res);
                        }
                    },
                    (reason) => {
                        res[i] = {status: 'rejected', reason};
                        pending--;

                        if (pending === 0) {
                            resolve(res);
                        }
                    }
                );
            })
        })
    }

    static race(iterable) {
        return new SyncPromise((resolve, reject) => {
            for (const value of iterable) {
                SyncPromise.resolve(value).then(resolve, reject);
            }
        })
    }

    static any(iterable) {
        return new SyncPromise((resolve, reject) => {
            const promises = [...iterable].map(SyncPromise.resolve),
                errors = new Array(promises.length);
            let pending = promises.length;

            promises.forEach((promise, i) => {
                promise.then(resolve,
                    (error) => {
                        errors[i] = error;
                        pending--;
                        
                        if (pending === 0) {
                            reject(new AggregateError(errors));
                        }
                    }
                );
            })
        })
    }

    constructor(initializer) {
        const reject = (err) => {
            if (this.value != null || this.state !== 'pending') {
                return;
            }

            this.value = err;
            this.state = 'rejected';

            if (this.onRejected.length > 0) {
                this.onRejected.forEach((handler: Function) => {
                    handler(err);
                });
    
            } else {
                queueMicrotask(() => {
                    if (this.onRejected.length === 0) {
                        console.log('Unhandled rejection');
                    }
                });
            }
        }

        const resolve = (value) => {
            if (this.value != null || this.state !== 'pending') {
                return;
            }

            this.value = value;

            const fulfill = (value) => {
                this.state = 'fulfilled';
                this.value = value;

                this.onFulfilled.forEach((handler) => {
                    handler(this.value);
                });
            };

            if (typeof value?.then === 'function') {
                value.then(fulfill, reject);
                return;
            } else {
                fulfill(value);
            }
        }

        try {
            const res = initializer(resolve, reject);

            if(typeof res?.catch === 'function') {
                res.catch(reject);
            }

        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled?, onRejected?) {
        return new SyncPromise((resolve, reject) => {
            const fulfillWrapper = (value) => {
                this.call(onFulfilled ?? resolve, [value], reject, resolve);
            };

            const rejectWrapper = (err) => {
                this.call(onRejected ?? reject, [err], reject, resolve);
            };

            this.onFulfilled.push(fulfillWrapper);
            this.onRejected.push(rejectWrapper);

            if (this.state !== 'pending') {
                if (this.state == 'fulfilled') {
                    fulfillWrapper(this.value);
                } else {
                    rejectWrapper(this.value);
                }
            }
        })
    }

    catch(onRejected) {
        return new SyncPromise((resolve, reject) => {
            const rejectWrapper = (err) => {
                this.call(onRejected ?? reject, [err], reject, resolve);
            }

            this.onRejected.push(rejectWrapper);

            if (this.state !== 'pending') {
                if (this.state === "fulfilled") {
                    resolve(this.value);
                } else {
                    rejectWrapper(this.value);
                }
            }
        })
    }

    finally(cb) {
        return new SyncPromise((resolve, reject) => {
            const fulfillWrapper = () => {
                try {
                    let res = cb?.();

                    if (typeof res?.then === 'function') {
                        res = res.then(() => this.value, reject);
                    } else {
                        res = this.value;
                    }

                    resolve(res);

                } catch (error) {
                    reject(error);
                }
            };

            const rejectWrapper = () => {
                try {
                    let res = cb?.();

                    if (typeof res?.then === 'function') {
                        res = res.then(() => this.value, reject);
                        resolve(res);
                    } else {
                        reject(this.value);
                    }

                } catch (error) {
                    reject(error);
                }
            };

            this.onFulfilled.push(fulfillWrapper);
            this.onRejected.push(rejectWrapper);

            if (this.state !== 'pending') {
                if (this.state === "fulfilled") {
                    fulfillWrapper();
                } else {
                    rejectWrapper();
                }
            }
        });
    }

    protected call(fn, args, onRejected, onResolved) {
        const reject = onRejected ?? loopback,
            resolve = onResolved ?? loopback;

        try {
            const res = fn?.(...args);

            if (typeof res?.then === 'function') {
                res.then(resolve, reject);
            } else {
                resolve(res);
            }

        } catch (error) {
            reject(error);
        }

        function loopback(): void {
            return undefined;
        }
    }


}

SyncPromise.resolve(1).then(console.log); // 1
console.log(2);  