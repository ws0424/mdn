// console.log(Number.POSITIVE_INFINITY);
// function myIsNaN(a) {
//   return a !== a;
// }
// console.log(myIsNaN(NaN));
// console.log(isNaN("aa"));
// console.log(Number.isNaN("aa"));
// function test() {
//   var x = 2,
//     y = 4;
//   console.log(eval("x + y")); // 直接调用，使用本地作用域，结果是 6
//   var geval = eval; // 等价于在全局作用域调用
//   console.log(geval("x + y")); // 间接调用，使用全局作用域，throws ReferenceError 因为`x`未定义
//   (0, eval)("x + y"); // 另一个间接调用的例子
// }
// var x = 11;
// var y = 22;
// test();

// function looseJsonParse(obj) {
//   return Function('"use strict";return (' + obj + ")")();
// }
// const a = 11;
// const b = 22;
// console.log(looseJsonParse("a+b"));
console.log(Function('"use strict";return(function(a){return a(5)})')());
