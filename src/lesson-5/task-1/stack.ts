export function collapseStack(obj: {}) {
    let stack = [{ key: '', value: obj }];
    let result = {};

    while (stack.length > 0) {
        let { key, value } = stack.pop()!;

        if (typeof value !== 'object') {
            result[key] = value;
        } else {
            let keysArr = Object.keys(value);

            for (let i = keysArr.length - 1; i >= 0; i--) {
                const newKey = keysArr[i];
                let resKey = key === '' ? newKey : `${key}.${newKey}`; 
                stack.push({key: resKey, value: value[newKey]});
            }
        }
    }
    return result;
}