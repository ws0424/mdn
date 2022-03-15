// const test = {
//   prop: 42,
//   func: function () {
//     return this.prop;
//   },
// };

// console.log(test.func());
// expected output: 42
// this.MDN = "mdn";
// console.log(this === window); >> true
// console.log(window.MDN, this.MDN); >> mdn , mdn
// "use strict";
// function fn() {
//   console.log(this === globalThis);
//   console.log(this, globalThis);
// }
// fn();

// class Example {
//   constructor() {
//     const proto = Object.getPrototypeOf(this);
//     console.log(Object.getOwnPropertyNames(proto));
//   }
//   first() {}
//   second() {}
//   static third() {}
// }

// console.log(new Example()); // ['constructor', 'first', 'second']
// class Base {}
// class Good extends Base {}
// class AlsoGood extends Base {
//   constructor() {
//     return {a: 5};
//   }
//   add() {
//     console.log(this);
//   }
// }
// class Bad extends Base {
//   constructor() {
//     super();
//     console.log(this);
//   }
// }

// new Good();
// console.log(new AlsoGood().add());
// new Bad(); // ReferenceError

// class Base {
//   constructor() {
//     this.aa = 11;
//   }
// }
// class Good {
//   constructor() {
//     this.aa = 12;
//   }
// }
// const g = new Good();
// console.log(g);

// 对象可以作为 bind 或 apply 的第一个参数传递，并且该参数将绑定到该对象。
// var obj = {a: "Custom"};

// // 声明一个变量，并将该变量作为全局对象 window 的属性。
// var a = "Global";

// function whatsThis() {
//   return this.a; // this 的值取决于函数被调用的方式
// }

// console.log(whatsThis()); // 'Global' 因为在这个函数中 this 没有被设定，所以它默认为 全局/ window 对象
// console.log(whatsThis.call(obj)); // 'Custom' 因为函数中的 this 被设置为obj
// console.log(whatsThis.apply(obj)); // 'Custom' 因为函数中的 this 被设置为obj
// function bar() {
//   console.log(Object.prototype.toString.call(this));
// }

// bar.call(7); // [object Number]
// bar.call("foo"); // [object String]
// bar.call(undefined); // [object global]
// console.log(Object(undefined));

// function f() {
//   return this.a;
// }

// var g = f.bind({a: "azerty"});
// console.log(g()); // azerty

// var h = g.bind({a: "yoo"}); // bind只生效一次！
// console.log(h()); // azerty

// var o = {a: 37, f: f, g: g, h: h};
// console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty

// var globalObject = this;
// var foo = () => this;
// console.log(foo() === globalObject); // true
// // 接着上面的代码
// // 作为对象的一个方法调用
// var obj = {foo: foo};
// console.log(obj.foo() === globalObject); // true

// // 尝试使用call来设定this
// console.log(foo.call(obj) === globalObject); // true

// // 尝试使用bind来设定this
// foo = foo.bind(obj);
// console.log(foo() === globalObject); // true

// const obj = {
//   aa: 11,
//   bb: 22,
//   add() {
//     // console.log(this);
//     (function () {
//       console.log(this);
//     })();
//   },
// };
// obj.add();
// const obj = {
// //   a: 11,
// //   b: 22,
// // };
// // const fn = (a, b) => {
// //   console.log(this);
// //   return a + b;
// // };
// // fn.call(null, 11, 22); // =>
// // fn.apply(null, [11, 22]); // =>
// // const fn1 = fn.bind(obj, 11, 22);
// // fn1(); // =>
// // fn1(33, 44); // =>
// // const fn2 = fn1.bind(null, 33, 55);
// // fn2(); // =>
// // fn2(33, 44); // =>

// // 创建一个含有bar方法的obj对象，
// // bar返回一个函数，
// // 这个函数返回this，
// // 这个返回的函数是以箭头函数创建的，
// // 所以它的this被永久绑定到了它外层函数的this。
// // bar的值可以在调用中设置，这反过来又设置了返回函数的值。
// // var obj = {
// //   bar: function () {
// //     var x = () => this;
// //     return x;
// //   },
// // };

// // 作为obj对象的一个方法来调用bar，把它的this绑定到obj。
// // 将返回的函数的引用赋值给fn。
// // var fn = obj.bar();

// // 直接调用fn而不设置this，
// // 通常(即不使用箭头函数的情况)默认为全局对象
// // 若在严格模式则为undefined
// // console.log(fn() === obj); // true

// // 但是注意，如果你只是引用obj的方法，
// // 而没有调用它
// // var fn2 = obj.bar;
// // 那么调用箭头函数后，this指向window，因为它从 bar 继承了this。
// // console.log(fn2()() == window); // true
// // "use strict";

// // const fn = () => {
// //   console.log(this);
// // };
// // fn();

// // function sum() {
// //   return this.a + this.b + this.c;
// // }

// // var o = {
// //   a: 1,
// //   b: 2,
// //   c: 3,
// //   get average() {
// //     return (this.a + this.b + this.c) / 3;
// //   },
// // };

// // Object.defineProperty(o, "sum", {
// //   get: sum,
// //   enumerable: true,
// //   configurable: true,
// // });

// // console.log(o.average, o.sum); // logs 2, 6
// // var a = 10;
// // var b = 20;
// // var o = {
// //   f: function () {
// //     return this.a + this.b;
// //   },
// // };
// // var p = Object.create(o);
// // p.a = 1;
// // p.b = 4;

// // const f = p.f;
// // console.log(f());
// // console.log(p.f()); // 5
// // 被调用时，将关联的元素变成蓝色
// // function bluify(e) {
// //   console.log(this === e.currentTarget); // 总是 true

// //   // 当 currentTarget 和 target 是同一个对象时为 true
// //   console.log(this === e.target);
// //   this.style.backgroundColor = "#A5D9F3";
// // }

// // // 获取文档中的所有元素的列表
// // var elements = document.getElementsByTagName("*");

// // // 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
// // for (var i = 0; i < elements.length; i++) {
// //   elements[i].addEventListener("click", bluify, false);
// // }

// class Car {
//   constructor() {
//     // Bind sayBye but not sayHi to show the difference
//     this.sayBye = this.sayBye.bind(this);
//   }
//   sayHi() {
//     console.log(`Hello from ${this.name}`);
//   }
//   sayBye() {
//     console.log(`Bye from ${this.name}`);
//   }
//   get name() {
//     return "Ferrari";
//   }
// }

// class Bird {
//   get name() {
//     return "Tweety";
//   }
// }

// const car = new Car();
// const bird = new Bird();

// // The value of 'this' in methods depends on their caller
// car.sayHi(); // Hello from Ferrari
// bird.sayHi = car.sayHi;
// bird.sayHi(); // Hello from Tweety

// // For bound methods, 'this' doesn't depend on the caller
// bird.sayBye = car.sayBye;
// bird.sayBye(); // Bye from Ferrari

function fn() {
  "use strict";
  console.log(this);
}
fn();
