## Redux 复习总结
在前面三篇 Redux 的教程中已详细提到 Redux 的实现，大概可可以总结以下几点
- Redux 
    - 有`Actions`、`Reducer`、`Store`这三层
    - 通过`createStore(reducer)`得到`store`，换名话说`store`包含了`reducer`的逻辑实现
    - 通过`store.dispath(action)`去调用`reducer`，从而改变`state`
    - 通过`store.getState()`获取在`reducer`改变的`state`
    - Redux 本身与 React 没有并没有半毛线关系
- React
    - 有 `Component`、`state`、`props`三大关键要素
    - 本身通过`setState()`改变`state`从而触发`render`，更新`component`
- react-redux
    - 这是一个第三方模块，它的作用就是本来没有半毛钱关系的 Redux 和 React 关联在一起
    - 它有组件`Provier`和方法`connect`
    - `connect`将 React 的`state`和 Redux 的`actions`合并成一个对象`props`，再将这个对象和`component`生成一个新的组件
    - `Provider`负责将 Redux 的`store`当属性传`connect`的新组件，从面将 React 和 Redux 关联到了一起
    - 当新组件调用`action`的时候，`Provider.store`就会映射调用`reducer`从而改变`state`，当`state`发生改变，就会触发新组件的`render`，重新更新组件。

## 中间件
上面是 React 依赖 Redux 的实现过程，但问题来了，如果项目中有异步请求，根据 Redux 的规则是：
- Action 必须返回一个带有属性`type`的对象
- Reducer 必须是一个纯函数，负责改变`state`  
这样一来，这个异步请求就变得无处安放了，这个时候的解决方案就是需要一个模块，在这个模块中发起 ajax 请求，然后在请求的回调函数中去手动调用`reducer`，而这个发起 ajax 请求的模块就称之为中间件

## 实现
该案例是以中间件调用 nodejs 的公共接口，实现一个数据列表。

源码下载：https://github.com/wscats/react-tutorial/tree/master/reactreact/redux/middleware  

[效果预览](https://wscats.github.io/react-tutorial/react/redux/middleware/index.html)

源码下载后执行下面步骤例可查看效果
- `npm install`
- `npm start`


#### 结构
| src  
|——| components  
|——|——| datagrid  
|——|——|——| datagridcomponent.js  
|——|——|——| datagridaction.js  
|——|——|——| datagridconstants.js  
|——|——|——| datagridreducer.js
|——|——| cnode  
|——|——|——| cnode.js
|——|——| spinner  
|——|——|——| spinner.js  
|——|——|——| spinner.scss    
|——| redux  
|——|——| store.js  
|——|——| middleware.js  
|——|——| rootReducer.js  
|——| utils  
|——|——| httpclient.js  
|——| app.js   

##### datagridcomponent.js
```javascript
import React from 'react'
import {connect} from 'react-redux'

import SpinnerComponent from '../spinner/spinner'

import * as actions from './datagridaction'

class DatagridComponent extends React.Component{
    getKeys(item){
        let cols = item ? Object.keys(item) : [];
        return this.props.config.cols || cols;
    }
    
    componentWillMount(){
        this.props.refresh(this.props.config)
    }
    render(){
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            {
                                this.getKeys(this.props.dataset[0]).map((key) => {
                                    return <th key={Math.random()}>{key}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.dataset.map((item) => {
                                return (
                                    <tr key={item.id || item.indexid} onDoubleClick={this.selectTr.bind(this, item)}>
                                        {
                                            this.getKeys(item).map((key) => {
                                                return <td key={Math.random()}>{item[key]}</td>
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                        <tr></tr>
                    </tbody>
                </table>
                <SpinnerComponent show={this.props.show}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataset: state.datagrid.dataset || [], 
        show: state.datagrid.show,
        error: state.datagrid.error
    }
}

export default connect(mapStateToProps, actions)(DatagridComponent);
```

#### datagridconstants.js
```javascript
export const Requesting = 'Requesting'
export const Requested = 'Requested'
export const RequestError = 'RequestError'
```

#### datagridaction.js
```javascript
import * as constants from './datagridconstants'

export function refresh(_config){
    return {
        types: [constants.Requesting, constants.Requested, constants.RequestError],
        url: _config.url,
        method: _config.method || 'get',
        data: _config.data || {},
        name: _config.name
    }
}
```

#### datagridreducer.js
```javascript
import * as constants from './datagridconstants'

export default function datagrid(state = {}, action){
    let _state = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case constants.Requesting:
            _state.show = true;
            break;
        case constants.Requested:
            _state.show = false;
            if(action.name){
                _state[action.name] = _state[action.name] || {};
                _state[action.name].dataset = action.result;
            } else {
                _state.dataset = action.result;
            }
            break;
        case constants.RequestError:
            _state.show =false;
            _state.error = action.error;
            break
    }
    return _state;
}
```

#### spinner.js
```javascript
import React, {Component} from 'react'
import './spinner.scss'

class SpinnerComponent extends React.Component{
    render(){
        let html = (
            <div>
                <div className="dk-spinner-mask"></div>
                <div className="dk-spinner dk-spinner-three-bounce">
                    <div className="dk-bounce1"></div>
                    <div className="dk-bounce2"></div>
                    <div className="dk-bounce3"></div>
                </div>        
            </div>     
        )
        return this.props.show ? html : null;
    }
}

export default SpinnerComponent
```

#### spinner.scss
```scss
.dk-spinner-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    opacity: .4;
    z-index: 2090;
}

.dk-spinner-three-bounce.dk-spinner {
    position: absolute;
    top: 53%;
    left: 47%;
    background-color: none!important;
    z-index: 2099;
    margin: 0 auto;
    width: 70px;
    text-align: center;    
}

.dk-spinner-three-bounce div {
    width: 18px;
    height: 18px;
    background-color: #1ab394;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: dk-threeBounceDelay 1.4s infinite ease-in-out;
    animation: dk-threeBounceDelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.dk-spinner-three-bounce .dk-bounce1 {
    -webkit-animation-delay: -.32s;
    animation-delay: -.32s;
}

.dk-spinner-three-bounce .dk-bounce2 {
    -webkit-animation-delay: -.16s;
    animation-delay: -.16s;
}

@-webkit-keyframes dk-threeBounceDelay{
    0%,
    100%,
    80%{-webkit-transform:scale(0); transform:scale(0)}
    40%{-webkit-transform:scale(1);transform:scale(1)}
}
@keyframes dk-threeBounceDelay{
    0%,
    100%,
    80%{-webkit-transform:scale(0);transform:scale(0)}
    40%{-webkit-transform:scale(1);transform:scale(1)}
}
```

#### cnode.js
```javascript
import React from 'react'
import Datagrid from '../../components/datagrid/datagridcomponent'

export default class CNodeComponent extends React.Component{
    static defaultProps = {
        config: {
            url: 'https://cnodejs.org/api/v1/topics',
            data: {page: 1, limit: 10},
            cols: ['title', 'reply_count', 'top', 'create_at', 'last_reply_at']
        }
    }
    render(){
        return (
            <div>
                <Datagrid config={this.props.config}/>
            </div>
        )
    }
}
```

#### rootReducer.js
```javascript
import React from 'react'
import {combineReducers} from 'redux'

import datagrid from '../components/datagrid/datagridreducer'

export default combineReducers({
    datagrid
})
```

#### middleware.js
```javascript
import http from '../utils/httpclient'
import * as constants from '../components/datagrid/datagridconstants'

export default function(api){
    return function(dispatch){
        return function(action){
            let {type, types, url, data, method = 'get', name} = action;
            if(!url){
               return dispatch(action)
            }

            dispatch({type: constants.Requesting})

            http[method](url, data).then((res) => {
                let _action = {
                    type: constants.Requested,
                    name,
                    result: res.data
                }
                dispatch(_action)
            }).catch((error) => {
                dispatch({type: constants.RequestError})
            })
        }
    }
}
```

#### store.js
```javascript
import React from 'react'
import {createStore, applyMiddleware} from 'redux'

import rootReducer from './rootReducer'

import middleware from './middleware'

const store = createStore(rootReducer, applyMiddleware(middleware));

export default store;
```

#### app.js
```javascript
import './libs/bootstrap/css/bootstrap.min.css'
import './libs/font-awesome/css/font-awesome.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './redux/configStore'
import CNodeComponent from './components/cnode/cnode'

ReactDOM.render(
    <Provider store={store}>
        <CNodeComponent/>
    </Provider>,
    document.getElementById('app')
)
```

### 小结
- 组件 `datagrid` 支持动态配置
- `ajax`请求放到了中间件执行
- `ajax`请求为了统一处理，分为三个状态，就是`constants.js`文件中的三个变量，分别代表请求前，请求中，请求后
- 请求前显示加载组件`spinner`，请求结束后移除加载组件`spinner`