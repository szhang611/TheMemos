window.onload = function () {
    var name = "小王", age = 20;

    var obj = {
        name: "小张",
        objAge: this.age,
        myFun: function(from,to){
            console.log(`${this.name},年龄${this.age},来自${from}去往${to}`);
        }
    }

    var db = {
        name: "百度",
        age: 88
    }



    obj.myFun.call(db,'成都','上海');   　　　  //德玛 年龄 99  来自 成都去往上海

    obj.myFun.apply(db,['成都','上海']);        //德玛 年龄 99  来自 成都去往上海  

    obj.myFun.bind(db,'成都','上海')();         //德玛 年龄 99  来自 成都去往上海

    obj.myFun.bind(db,['成都','上海'])();　　   //德玛 年龄 99  来自 成都,上海去往undefined


// 　　从上面四个结果不难看出
// 　　　　call 、bind 、 apply 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
// 　　　　call的参数是直接放进去的，第二第三第n个参数全都用逗号分隔，直接放到后面  obj.myFun.call(db,'成都', ... ,'string' )；
// 　　　　apply的所有参数都必须放在一个数组里面传进去  obj.myFun.apply(db,['成都', ..., 'string' ]);
// 　　　　bind除了返回是函数以外，它 的参数和call 一样。
// 　　　　
// 　　　　当然，三者的参数不限定是string类型，允许是各种类型，包括函数 、 object 等等！

}
