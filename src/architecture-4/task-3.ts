function readonly(obj) {
    return new Proxy(obj, {
        get(target, p, receiver) {
            const val = Reflect.get(target, p, receiver);
            if (val == null || typeof val !== 'object') {
                return val;
            }
            if (typeof val === 'function') {
                return val.bind(receiver);
            }
            return readonly(val);
        },
        
        set() {
            return false;
        },

        defineProperty() {
            return false;
        },

        deleteProperty() {
            return false;
        },

        setPrototypeOf() {
            return false;
        },

        getOwnPropertyDescriptor(target, p) {
            const descriptor = Reflect.getOwnPropertyDescriptor(target, p);
            
            if (!descriptor?.configurable) {
                return descriptor?.configurable;
            }

            return {
                ...descriptor,
                writable: false
            }
        }
    })
}   


const obj = {a: 1, b: [1, 2, 3], mutate() { this.a++; }};

const readonlyObj = readonly(obj);

readonlyObj.a++;

/// true
console.log(readonlyObj.a === 1);

readonlyObj.mutate();

/// true
console.log(readonlyObj.a === 1);

readonlyObj.b.push(10);

// [1, 2, 3]
console.log(readonlyObj.b);

obj.a++;

/// true
console.log(readonlyObj.a === 2);