# mdn 阅读笔记-day03

## Javascript 标准内置对象

#### 标准内置对象分类

##### 值属性

> 全局的属性，返回一个简单的值，没有属于自己的属性跟方法

- Infinty 全局属性（global object,全局对象）是一个数值表示无穷大 不可以写，不可配置，不可枚举，初始值是 Number.POSITIVE_INFINITY(正无穷大)
- NaN 全局属性表示不是一个数字（Not A Number），NaN 与 Number.isNaN 的值一样，在现代浏览器中他是一个不可写，不可配置，不可枚举的属性，但是在 ES3 这个属性值是可以更改的，判断一个是是否是 NaN 在比较中也只有 NaN 不等于它自己，必须使用 Number.isNaN 或者 isNaN 函数，Number.isNaN 与 isNaN 的区别，前者是当前值为 NaN 则为 true，后者是当前值转换成 NaN 则为 true
- undefined 全局属性表示原始值 undefined，在现代浏览器中 undefined 是一个不可以写，不可以配置，不可以枚举的全局变量，一个没有赋值的变量类型是 undefined，如果方法或者语句中的操作变量没有赋值就会返回 undefined，也就是说函数如果没有返回值就会返回 undefined，严格相等`typeof x === 'undefined'` 如果非严格模式则与`null`相等，`void 0`等于 undefined
- globalThis 全局属性，包含全局的 This 值，主要来解决在不同的 web 环境中获取全局 global 的问题，

##### 函数属性

> 全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果返回给调用者

- eval 全局对象的一个属性，参数是`string`格式，一个表示 javascript 表达式，语句或一系列语句的字符串，表达式可以包含于以存在的对象属性，返回值返回字符串代码中的返回值，如果返回值为空那么就返回 undefined，如果 eavl 的参数不是字符串则会将参数原封不动的返回，如果不是直接使用 eavl 而是间接性调用 eavl 的作用域则是在全局作用域下，永远不要使用 eavl，因为 eavl 是一个危险函数，我们可以使用`window.Funcrion`来代替 eavl，eval 访问对象成员，不建议用 eavl 访问对象成员因为可以有更好的办法代替他比如`a[b]`而不是`eavl('a.'+ b)`,
  返回值返回最后一个表达式的值,eavl 中定义函数要与`“(“和”)”`定义前缀和后缀，否则返回 undeifned

```js
// 使用eval的糟糕代码:
function looseJsonParse(obj) {
  return eval("(" + obj + ")");
}
console.log(looseJsonParse("{a:(4-1), b:function(){}, c:new Date()}"));
// 不用eval的更好的代码:
function looseJsonParse(obj) {
  return Function('"use strict";return (' + obj + ")")();
}
console.log(looseJsonParse("{a:(4-1), b:function(){}, c:new Date()}"));
```

- uneavl 顶级函数并且不与任何对象相关联（非标准）,参数是一个对象或者表达式`object`返回对象或者表达式的源码

```js
var a = 1;
uneval(a); // returns a String containing 1

var b = "1";
uneval(b); // returns a String containing "1"

uneval(function foo() {}); // returns "(function foo(){})"

var a = uneval(function foo() {
  return "hi";
});
var foo = eval(a);
foo(); // returns "hi"
```

##### 基本对象

##### 数字和日期

##### 字符串

##### 可索引的集合对象

##### 使用键的集合对象

##### 结构化数据

##### 控制抽象对象

##### 反射

##### 国际化

##### WebAssembly

##### 其他
