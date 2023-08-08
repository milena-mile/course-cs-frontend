function promisify(fn) {
    return function wrapper(...args): Promise<any> {
        if (args.length !== fn.length - 1) {
            throw new Error('Not enough arguments!');
        }

        return new Promise((resolve, reject) => {
            try {
                fn(...args, (err, res) => {
                    if (err != null) {
                        reject(err);
                        return;
                    }

                    resolve(res);
                })
            } catch (err) {
                reject(err);
            }
        })
    }
}


function readFile(file, cb) {
    cb(null, 'fileContent');
}
   
const readFilePromise = promisify(readFile);
readFilePromise('my-file.txt').then(console.log).catch(console.error);


