const setImmediateIds = new Map();

function setImmediate(cb, ...args) {
    const id = setImmediateIds.size + 1;

    setImmediateIds.set(id, true);
    queueMicrotask(() => {
        if (setImmediateIds.get(id) === false) {
            return;
        }

        cb(...args);
    });

    return id;
}

function clearImmediate(id) {
    setImmediateIds.set(id, false);
}