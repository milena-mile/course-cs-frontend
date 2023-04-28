export function collapseRecursion(obj: {}, res = {}, key = ''): {} {
    let keysArr = Object.keys(obj);

    for (let i = 0; i < keysArr.length; i++) {
        if (typeof obj[keysArr[i]] !== 'object') {
            res[`${key}${keysArr[i]}`] = obj[keysArr[i]];
        }

        collapseRecursion(obj[keysArr[i]], res, `${key}${keysArr[i]}.`);
    }

    return res;
}

