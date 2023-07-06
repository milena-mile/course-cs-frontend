const myRegExp3 = /"([^"]*)"[ ]*:[ ]*(\d+|null|true|false|"[^"]*")/g;

// [['"a": 1', 'a', '1'], ['"b": "2"', 'b', '"2"']]
let res = [...'{"a": 1, "b": "2"}'.matchAll(myRegExp3)];
console.log(res);