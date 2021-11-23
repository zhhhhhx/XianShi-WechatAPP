// class Example{
//     static c=0;
//     constructor(a){
//         this.a=a
//     }
//     set a(a){
//         console.log('setter')
//         this._a=a
//     }
//     get a(){
//         console.log('getter')
//         return this._a
//     }
    
// }
// Example.b=2
// console.log(Example.c)



class Observer{
    constructor(){
        this.receiver=[] //这里receiver表示消息接收人，可能是委托人或受托人
        this.title='' //标题 云函数发消息用
    }
    update(){
        /* 接收到被监听对象传来的消息后进行更新操作
           在子类中实现*/
        console.log('observer.update')
    }
}

//export导出写法一 不同的写法对应不同的导入 具体原因不明
module.exports=Observer