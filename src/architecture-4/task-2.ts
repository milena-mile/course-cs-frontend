function indexedWrapper(map) {
    return new Proxy(map, {
        get(target, key, receiver) {
            if (!isNaN(key)) {
                return [...target.values()][key];
            }

            const value = target[key];
            return typeof value === 'function' ? value.bind(target) : value;
        }
    })
}

const indexedMap = indexedWrapper(new Map([
    ['key1', 'foo'],
    ['key2', 'bar'],
    ['2', 'bla'],
  ]));
  
  // true
  console.log(indexedMap.get('key1') === indexedMap[0]);
