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
