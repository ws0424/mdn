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
// console.log(Function('"use strict";return(function(a){return a(5)})')());

// console.log(isFinite("aa"));
// console.log(isNaN("111"));
// console.log(Number.isNaN("111"));
// console.log(isNaN(true));
// console.log(Number.isNaN(true));

// console.log(isNaN("aa"));
// console.log(Number.isNaN("aa"));
// parseFloat(3.14);
// parseFloat("3.14");
// parseFloat("  3.14  ");
// parseFloat("314e-2");
// parseFloat("0.0314E+2");
// parseFloat("3.14some non-digit characters");
// console.log(
//   parseFloat({
//     toString: function () {
//       return "3.14";
//     },
//   })
// );

// console.log(
//   encodeURI(
//     `https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI?a=b&c=d]`
//   )
// );

// function Person() {}
// // Person.prototype = Object.create(null);
// Person.prototype.add = function () {
//   console.log("add");
// };

// const p = new Person();
// console.log(p.__proto__.__proto__.__proto__);

// const obj = {
//   name: "zhangsan",
// };

// const o = Object(obj);
// o.name = "lisi";
// console.log(obj, o);

// const obj1 = {name: "zhangsan1"};
// const obj2 = {age: "18"};
// const assign = Object.assign(obj1, obj2);
// console.log(obj1, obj2, assign);
// console.log(obj1 === assign);

var x = 10;

function createFunction1() {
  var x = 20;
  return new Function("return x;"); // 这里的 x 指向最上面全局作用域内的 x
}

function createFunction2() {
  var x = 20;
  function f() {
    return x; // 这里的 x 指向上方本地作用域内的 x
  }
  return f;
}

var f1 = createFunction1();
console.log(f1()); // 10
var f2 = createFunction2();
console.log(f2()); // 20
