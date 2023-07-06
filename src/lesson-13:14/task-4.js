function format(str, obj) {
    const reg = /\${([^}]+)}/g; // \\${(.*?)}\g
    const resStr = str.replace(reg, (_, key) => obj[key]); 
    return resStr;
}

// Hello, Bob! Your age is 10.
const res = format("Hello, ${user}! Your age is ${age}.", {
    user: "Bob",
    age: 10,
  });
console.log(res);