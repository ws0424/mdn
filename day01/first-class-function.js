// 头等函数

const foo = function () {};
console.log(foo);
function sayHello() {
  return "Hello, ";
}
function greeting(helloMessage, name) {
  console.log(helloMessage() + name);
}
// 传递 `sayHello` 作为 `greeting` 函数的参数
greeting(sayHello, "JavaScript!"); // Hello, JavaScript!
