# Redux
前端框架的组件式开发永远有一道鸿沟——跨组件通信。我在 [Vue 教程](https://github.com/wscats/vue/tree/master/VueBasic/Vuex)中有提到过，如果对跨组件通信不明白的可先跳过去看看。

React 不同与双向数据绑定框架，它是单向数据流，所以每次更新都得调用`setState`，所以在跨组件通信中会比较迂回。还有就是 React 没有逻辑分层，在开发过程中，逻辑分层是很重要的。

Redux 实现了跨组件通信和逻辑分层的好处，所以在 React 中使用 Redux 更配。

# Redux 简单实现
为了说明问题，先来一个公共对象实现跨组件通信。当然这个也是 flux 的实现原理。
##### actions.js
```javascript
export default {
    increment(){
        return {
            type: "+"
        }
    },
    decrement(){
        return {
            type: '-'
        }
    }
}
```
##### reducer
```javascript
export default (state = 0, action) => {
    switch(action.type){
        case '+':
            return state + 1;
        case '-':
            return state - 1;
        default:
            return state;
    }
}
```
#### component
```javascript
import React, {Component} from 'react'
import {createStore} from 'redux'
import Actions from './actions'
import Reducer from './reducer'

const store = createStore(Reducer);

export default class Component1 extends Component{
    constructor(props){
        super(props);
        this.state = {count: 0}
    }
    increment = () => {
        store.dispatch(Actions.increment());
        this.setState({
            count: store.getState()
        })
    }
    
    render(){
        return (
            <div>
                <h3>component-cp1-{this.state.count}</h3>
                <input type="button" value="increment" onClick={this.increment}/>
            </div>
        )
    }
}
```

### 小结——分层
- Actions 层
    - 用户行为操作，由用户在 View 层触发 `store.dispatch(Actions.increment());`
    - 行为操作应该为一个 `function`且必须返回有`type`属性的对象
    - 每个方法都应该由`store`进行派发。
- Reducer 层  
    - 必须是一个纯函数(一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用)
    - 接受两个参数，第一个为`state`，另一个为`action`
    - `return`的结果可以用`store.getState()`来接收
- Store 层
    - `redux`的一个方法，接受`reducer`，返回一个对象`store`
    - 对象`store`的方法`dispath`用于派发`action`
    - 通过`dispath`派发的`action`会触发`reducer`
- View 层
    - 视图层，也就是组件
    - 通过`getState()`获取的值然后再`setState`便可以显示。
