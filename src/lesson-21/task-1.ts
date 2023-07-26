curry._ = {};

function curry(fn) {
    return function curried(this: unknown, ...args) {
      if (args.filter((el) => el !== curry._).length === fn.length) {
        return fn.apply(this, args);
      }
      return function (this: unknown, ...args2) {
        let normalizedArgs = args.slice();
        
        normalizedArgs.forEach((el, i, normArgs) => {
            if (el === curry._) {
                el = args2.shift();
                normArgs[i] = el;
            }
        });
      
        return curried.apply(this, normalizedArgs.concat(args2));
      }
    }
  }

const diff = curry((a, b, c) => a - b + c);

console.log(diff(curry._, 10)(15)(8)); // 15 - 10 = 5