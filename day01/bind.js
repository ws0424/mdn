// this.x = 9; // 在浏览器中，this 指向全局的 "window" 对象
// var module = {
//   x: 81,
//   getX: function () {
//     return this.x;
//   },
// };

// module.getX(); // 81

// var retrieveX = module.getX;
// console.log(retrieveX());
// // 返回 9 - 因为函数是在全局作用域中调用的

// // 创建一个新函数，把 'this' 绑定到 module 对象
// // 新手可能会将全局变量 x 与 module 的属性 x 混淆
// var boundGetX = retrieveX.bind(module);
// console.log(boundGetX()); // 81

// const bTest = function (...args) {
//   return args;
// };
// //call(boundThis,boundArgs,arguments)
// const b1 = bTest.bind(null, 1, 2, 3, 4, 5);
// console.log(b1(22, 33, 55));

// function list() {
//   return Array.prototype.slice.call(arguments);
// }

// function addArguments(arg1, arg2) {
//   return arg1 + arg2;
// }

// var list1 = list(1, 2, 3); // [1, 2, 3]

// var result1 = addArguments(1, 2); // 3

// // 创建一个函数，它拥有预设参数列表。
// var leadingThirtysevenList = list.bind(null, 37);

// // 创建一个函数，它拥有预设的第一个参数
// var addThirtySeven = addArguments.bind(null, 37);

// var list2 = leadingThirtysevenList();
// console.log(list2);
// // [37]

// var list3 = leadingThirtysevenList(1, 2, 3);
// // [37, 1, 2, 3]

// var result2 = addThirtySeven(5);
// // 37 + 5 = 42

// var result3 = addThirtySeven(5, 10);
// // 37 + 5 = 42 ，第二个参数被忽略

// function LateBloomer() {
//   this.petalCount = Math.ceil(Math.random() * 12) + 1;
// }

// // 在 1 秒钟后声明 bloom
// LateBloomer.prototype.bloom = function () {
//   window.setTimeout(this.declare.bind(this), 1000);
// };

// LateBloomer.prototype.declare = function () {
//   console.log("I am a beautiful flower with " + this.petalCount + " petals!");
// };

// var flower = new LateBloomer();
// flower.bloom(); // 一秒钟后, 调用 'declare' 方法

function add() {
  //   var slice = Array.prototype.slice;

  //   return slice.apply(arguments);

  // 与前一段代码的 "slice" 效果相同
  var unboundSlice = Array.prototype.slice;
  var slice = Function.prototype.apply.bind(unboundSlice);

  // ...

  return slice(arguments);
}
console.log(add(1, 2, 3, 4, 5, 6));
