class Example{
    static c=0;
    constructor(a){
        this.a=a
    }
    set a(a){
        console.log('setter')
        this._a=a
    }
    get a(){
        console.log('getter')
        return this._a
    }
    
}
// Example.b=2
// console.log(Example.c)

// import {Observable} from './util'

// class ObservableImpl extends Observable{ //具体的被观察者
//     doSomething(){
//         /*
//         do something 
//         */
//     //    super.notifyObservers()
//     }
// }
class Observer{
    update(){
        // console.log('observer1')
    };
}
class RequestObserver extends Observer{
    update(){
        console.log('RequestObserver')
    }
}
module.exports={
    // ObservableImpl: ObservableImpl,
    Observer:Observer,
    RequestObserver: RequestObserver,
}