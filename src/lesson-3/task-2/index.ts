import { Structure } from "./ArrayBufferStructure";

const jackBlack = Structure([
    ["name", "utf16", 10], // Число - это максимальное количество символов
    ["lastName", "utf16", 10],
    ["age", "u16"], // uint16
  ]);
  
  jackBlack.set("name", "JackJonesFirst");
  jackBlack.set("lastName", "Black");
  jackBlack.set("age", 53);
  
  console.log(jackBlack.get("name")); // 'Jack'
  console.log(jackBlack.get("age")); // 53