// 基本概念:
// reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。

// reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。
//
// 语法:
//
//     arr.reduce(callback,[initialValue])
//
//      callback （执行数组中每个值的函数，包含四个参数）
//
//          previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
//          currentValue （数组中当前被处理的元素）
//          index （当前元素在数组中的索引）
//          array （调用 reduce 的数组）
//          initialValue （作为第一次调用 callback 的第一个参数。）


// ——————————————————————————————————————————————————
// 简单应用：

// (1)
var items = [10, 120, 1000];

// our reducer function
var reducer = function add(sumSoFar, item) { return sumSoFar + item; };

// do the job
var total = items.reduce(reducer, 0);

console.log(total); // 1130
// 可以看出，reduce函数根据初始值0，不断的进行叠加，完成最简单的总和的实现。
// reduce函数的返回结果类型和传入的初始值相同，上个实例中初始值为number类型，同理，初始值也可为object类型。


// (2)
var items = [10, 120, 1000];

// our reducer function
var reducer = function add(sumSoFar, item) {
    sumSoFar.sum = sumSoFar.sum + item;
    return sumSoFar;
};

// do the job
var total = items.reduce(reducer, {sum: 0});

console.log(total); // {sum:1130}


// ——————————————————————————————————————————————————
// 进阶应用：

// （1）

// 在来一个例子：
// 某同学的期末成绩如下表示

var result = [
    {
        subject: 'math',
        score: 88
    },
    {
        subject: 'chinese',
        score: 95
    },
    {
        subject: 'english',
        score: 80
    }
];
// 如何求该同学的总成绩？

var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
// 假设该同学因为违纪被处罚在总成绩总扣10分，只需要将初始值设置为-10即可。

var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, -10);
// 我们来给这个例子增加一点难度。假如该同学的总成绩中，各科所占的比重不同，分别为50%，30%，20%，我们应该如何求出最终的权重结果呢？

// 解决方案如下：
//
var dis = {
    math: 0.5,
    chinese: 0.3,
    english: 0.2
}

var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, -10);

var qsum = result.reduce(function(prev, cur) {
    return cur.score * dis[cur.subject] + pre;
}, 0)

console.log(sum, qsum);
// 再看一个例子，如何知道一串字符串中每个字母出现的次数？

var arrString = 'abcdaabc';

arrString.split('').reduce(function(res, cur) {
    res[cur] ? res[cur] ++ : res[cur] = 1;
    return res;
}, {})
// 由于可以通过第二参数设置叠加结果的类型初始值，因此这个时候reduce就不再仅仅只是做一个加法了，我们可以灵活的运用它来进行各种各样的类型转换，比如将数组按照一定规则转换为对象，也可以将一种形式的数组转换为另一种形式的数组，大家可以动手去尝试一样。

[1, 2].reduce(function(res, cur) {
    res.push(cur + 1);
    return res;
}, []);
// koa的源码中，有一个only模块，整个模块就一个简单的返回reduce方法操作的对象：

var only = function(obj, keys){
    obj = obj || {};
    if ('string' == typeof keys) keys = keys.split(/ +/);
    return keys.reduce(function(ret, key){
        if (null == obj[key]) return ret;
        ret[key] = obj[key];
        return ret;
    }, {});
};
// 通过对reduce概念的理解，这个模块主要是想新建并返回一个obj对象中存在的keys的object对象。

var a = {
    env : 'development',
    proxy : false,
    subdomainOffset : 2
};
only(a,['env','proxy']); // {env:'development',proxy : false}
