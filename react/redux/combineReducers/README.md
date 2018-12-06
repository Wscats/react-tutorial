## Redux 跨组件通信之入门篇 —— combineReducers
### 结构
- component1
    - actions.js
    - reducer.js
    - component1.js
- component2
    - actions.js
    - reducer.js
    - component.js
- redux
    - store.js

### 组件 Component1
#### action.js
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
#### reducer.js
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
#### component.js
```javascript
import React, {Component} from 'react'
import Actions from './actions'
import Reducer from './reducer'

import store from '../../redux/configStore'

import Component2 from '../cp2/cp2'

export default class Component1 extends Component{
    constructor(props){
        super(props);
        this.state = {count: 0}
    }
    increment = () => {
        store.dispatch(Actions.increment());
        this.setState({
            count: store.getState().cp1
        })
    }
    
    render(){
        return (
            <div>
                <h3>component-cp1-{store.getState().cp1}</h3>
                <input type="button" value="increment" onClick={this.increment}/>
                <Component2 />
            </div>
        )
    }
}
```

### 组件 component2
#### action.js
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
#### reducer.js
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
#### component.js
```javascript
import React, {Component} from 'react'
import Actions from './actions'
import Reducer from './reducer'

import store from '../../redux/configStore'

export default class Component2 extends Component{
    increment = () => {
        store.dispatch(Actions.increment());
        this.setState({
            count: store.getState().cp1
        })
    }
    
    render(){
        return (
            <div>
                <h3>component-cp2-{store.getState().cp2}</h3>
            </div>
        )
    }
}
```

### store.js
```javascript
import {createStore} from 'redux';
import { combineReducers } from 'redux';
import cp1 from '../components/cp1/reducer'
import cp2 from '../components/cp2/reducer'

const rootReducer = combineReducers({
    cp1,
    cp2
});

const store = createStore(rootReducer)

export default store;
```

## 小结
通过共同调用`store`已实现两个组件之间的通信
- 多个组件之间，每个组件都有单独的`actions`和`reducer`
- 多个组件之间的`reducer`通过`redux.combineReducers`来进行合并得到一个`rootReducer`，最后用`createStore`来完成`store`的创建生成。
- 在 View 层通过`store.getState()`得到的是`rootReducer`后的对象`{cp1: 0, cp2: 0}`
- `store.dispath`会同时改变`rootReducer`里面的属性`cp1`和`cp2`，因为触发了`reducer`，而且两个`action.type`都是一样的，所以同时修改
- 如果想做到单独修改`rootReducer`，则需要变改不同组件`action.type`
- 为了`action.type`能统一管理，可以派生出多一个层`constants`，后面的案例会用到这个层
