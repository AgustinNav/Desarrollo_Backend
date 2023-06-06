const SingletonClass = require("./singleton.js");

const clase1 = SingletonClass.getInstance();
const clase2 = SingletonClass.getInstance();
const clase3 = SingletonClass.getInstance();
const clase4 = SingletonClass.getInstance();

console.log(clase1);
console.log(clase2);
console.log(clase3);
console.log(clase4);
