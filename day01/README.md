# mdn 阅读笔记-day01

> javascript 函数优先，用于 web 环境及非 web 环境中如 nodejs，javascript 是一种基于**原型编程**、**多范式**动态语言脚本，支持面向对象、命令式声明式（函数编程风格）

#### 头等函数（first-class Function）

> 函数可以被当成变量一样用时，则这门语言拥有头等函数

1. 函数赋值给变量（注意当我们把命名函数赋值给变量的时候也不会影响用变啦名字加`()`去调用他）
2. 函数当成参数传递
3. 函数当成返回值返回（一个返回另外一个函数的函数被称为**高阶函数**）

#### 原型编程

> 原型编程是一种面向对象编程的风格，不会显式的定义类，甚至有时候还会使用空对象创建类，简单来说这种风格是在不定义 class 的情况下创建一个 object

#### 变量

> 变量是一个值的命名引用，可以通过这个变量名访问到这个值

#### javascript 标准内置对象

> 内置对象不应该与`global`对象混淆，`global`对象在全局作用域里通过`this`访问到,严格模式与非严格模式会略有不同，严格模式下得到的是 undefined

#### Function.prototype.bind()

> 创建一个新的绑定函数（bound function，BF），这个新函数的 this 被指定为 bind 调用的第一个参数

> ```
> function.bind(thisArg[, arg1[, arg2[, ...]]])
> ```

1. 如果是 new 运算符构造绑定则则忽略改值，thiaArg 传递任何值都会被转成 Object，如果 bind 的 thisArg 的列表为空或者，undefined，null，执行作用域的 this 将会被转成新函数的 thisArg
2. 调用绑定函数通常会导致执行包装函数
3. 绑定函数（bound function，BF）具有以下内部属性
   1. [[BoundTargetFunction]]包装函数对象
   2. [[BoundThis]] 调用包装函数时传递 this 的值
   3. [[BoundArguments]] 列表包装函数优先用列表元素的值填充列表
   4. [[call]] 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个**this**值和一个包含通过调用表达式传递给函数的参数的列表。
4. 调用函数绑定时，调用 BoundTargetFuction 上的内部方法 call，`call(boundThis,boundArguments)`

> bind 可以干什么？

1. 改变 this 的值创建绑定函数

   ```javascript
   this.x = 9; // 在浏览器中，this 指向全局的 "window" 对象
   var module = {
     x: 81,
     getX: function () {
       return this.x;
     },
   };

   module.getX(); // 81

   var retrieveX = module.getX;
   retrieveX();
   // 返回 9 - 因为函数是在全局作用域中调用的

   // 创建一个新函数，把 'this' 绑定到 module 对象
   // 新手可能会将全局变量 x 与 module 的属性 x 混淆
   var boundGetX = retrieveX.bind(module);
   boundGetX(); // 81
   ```

2. 添加函数预设的初始值

   ```js
   function list() {
     return Array.prototype.slice.call(arguments);
   }

   function addArguments(arg1, arg2) {
     return arg1 + arg2;
   }

   var list1 = list(1, 2, 3); // [1, 2, 3]

   var result1 = addArguments(1, 2); // 3

   // 创建一个函数，它拥有预设参数列表。
   var leadingThirtysevenList = list.bind(null, 37);

   // 创建一个函数，它拥有预设的第一个参数
   var addThirtySeven = addArguments.bind(null, 37);

   var list2 = leadingThirtysevenList();
   // [37]

   var list3 = leadingThirtysevenList(1, 2, 3);
   // [37, 1, 2, 3]

   var result2 = addThirtySeven(5);
   // 37 + 5 = 42

   var result3 = addThirtySeven(5, 10);
   // 37 + 5 = 42 ，第二个参数被忽略
   ```

3. 配合 setTimeout 使用（setTimeout 中的 this 关键字会指向 window 或者 global）

   ```js
   function LateBloomer() {
     this.petalCount = Math.ceil(Math.random() * 12) + 1;
   }

   // 在 1 秒钟后声明 bloom
   LateBloomer.prototype.bloom = function () {
     window.setTimeout(this.declare.bind(this), 1000);
   };

   LateBloomer.prototype.declare = function () {
     console.log(
       "I am a beautiful flower with " + this.petalCount + " petals!"
     );
   };

   var flower = new LateBloomer();
   flower.bloom(); // 一秒钟后, 调用 'declare' 方法
   ```

4. 如果作为构造函数的绑定函数，绑定函数的`this`会被忽略，但是他的参数会插入传递

5. 快捷调用，我们可以把类数组（array-like object）转换成一个真的数组

   ```js
   // bind小技巧
   // 与前一段代码的 "slice" 效果相同
   var unboundSlice = Array.prototype.slice;
   var slice = Function.prototype.apply.bind(unboundSlice);

   slice(arguments);
   ```
