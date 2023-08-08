function allLimit(iterable: Iterable<Function>, limit: number) {
    return new Promise((resolve, reject) => {
        const promises = [...iterable],
            res = new Array(promises.length);
        let pending = promises.length,
        iter = promises.entries();

        for (let i = 0; i < limit; i++) {
            next();
        }

        function next() {
            if (pending === 0) {
                resolve(res);
            }

            const chunk = iter.next();

            if (chunk.done) {
                return;
            }

            const [i, fn] = chunk.value;

            Promise.resolve(fn()).then(
                (value) => {
                    res[i] = value;
                    pending--;
                    next();
                },

                reject
            )
        }
    })
}

//allLimit([f1, f2, f3, f4, f5, f6], 2).then(console.log).catch(console.error);

