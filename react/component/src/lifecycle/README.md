# 生命周期
React 是一个由虚拟 DOM 渲染成真实 DOM 的过程，这个过程称为组件的生命周期。React 把这个周期划分为三个阶段，每个阶段都提供了 will 和 did 两种处理方式，will 是指发生前，did 是指发生后。
- Mounting：组件渲染过程
    - componentWillMount()
    - componentDidMount()
- Updating：组件更新过程
    - componentWillReceiveProps(nextProps) 
    - shouldComponentUpdate(nextProps, nextState) 
    - componentWillUpdate(object nextProps, object nextState) 
    - componentDidUpdate(object prevProps, object prevState) 
- Unmounting：组件移除过程
    - componentWillUnmount()
    - 这个阶段没有对应的 did 方法

## Mounting
指首次渲染或者组件从 DOM 中移除后再次重新渲染，后者场景不会执行 getDefaultProps
### 执行顺序
1. getDefaultProps
2. getInitialState
3. componentWillMount
4. render
5. componentDidMount
### componentWillMount
该方法在 render 之前被调用，也就是说在这个方法当中无法获取到真实的 DOM 元素。
首次渲染前和当 state 发生改变时再次渲染前触发该方法。
### componentDidMount
该方法是在 render 之后被调用，也就是这个方法可以直接获取到真实的 DOM 元素。
首次渲染后和当 state 发生改变再次渲染后触发该方法。
```javascript
var MountingComponent = React.createClass({
    componentWillMount: function(){
        console.log(this.refs.h1) // undefined
    },
    componentDidMount: function(){
        console.log(this.refs.h1) // h1 对象
    },
    render: function(){
        return <h1 ref="h1">Lifecycle-Mounting</h1>;
    }                
})
ReactDOM.render(<MountingComponent />, document.getElementById('div1'));
```
## Updating
当改变组件的 props 或 state 时候会触发
### 执行顺序
1. componentWillReceiveProps
2. shouldComponentUpdate
3. componentWillUpdate
4. render
5. componentDidUpdate
### componentWillReceiveProps
在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。
方法接受一个参数
newProps： 为更新后的 props
注：props 不能手动改变，正常场景是当前组件被当子组件调用，然后在父组件中改变该组件的 props
### shouldComponentUpdate
组件挂载之后，每次调用setState后都会调用shouldComponentUpdate判断是否需要重新渲染组件。默认返回true，需要重新render。在比较复杂的应用里，有一些数据的改变并不影响界面展示，可以在这里做判断，优化渲染效率。
方法接受两个参数
newProps：已更新的 props
newState：已更新的 state
方法必须要返回 boolen，返回 true 则执行后面的 componentWillUpdate、render、componentDidUpdate。反之则不执行。
### componentWillUpdate
在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
方法接受两个参数
nextProps：将要更新的 props
nextState：将要更新的 state
### componentDidUpdate
在组件完成更新后立即调用。在初始化时不会被调用。
方法接受两个参数
prevProps：更新前的 props
nextState：更新前的 state
```javascript
var UpdatingComponent = React.createClass({
    getInitialState: function() {
        return {
            data:0
        };
    },           
    setNewNumber: function() {
        //当 state 发生改变的时候，state 对应的组件会重新挂载
        //会触发 componentWillUpdate、componentDidUpdate
        this.setState({data: this.state.data + 1})
    },
    //参数 newProps：已更新的 props
    componentWillReceiveProps:function(newProps) {
        console.log('Component WILL RECEIVE PROPS!', newProps)
    },        
    //参数 newProps：已更新的 props
    //参数 newState：已更新的 state  
    //必须要返回 boolen，true 则执行componentWillUpdate、render、componentDidUpdate。反之则不执行。
    shouldComponentUpdate: function(newProps, newState){
        console.log('shouldComponentUpdate',newProps, newState);
        return (newState.data > 0 && newState.data % 2 == 0);
    },                          
    //参数 nextProps：将要更新的 props
    //参数 nextState：将要更新的 state
    componentWillUpdate: function(nextProps, nextState){
        console.log(nextProps, nextState, this.refs.p1)
    },
    //参数 prevProps：更新前的 props
    //参数 nextState：更新前的 state                
    componentDidUpdate: function(prevProps, prevState){
        console.log(prevProps, prevState) 
    },
    render: function(){
        return (
            <div>
                <button onClick={this.setNewNumber}>INCREMENT</button>
                <h3>{this.state.data}</h3>
            </div>
        );
    }                
})
ReactDOM.render(<UpdatingComponent/>, document.getElementById('div2'));
```
## Unmounting
在组件从 DOM 中移除的时候立刻被调用，这个阶段没有对应的 did 方法
### componentWillUnmount
方法适用在父子组件的结构中，当某个条件符合的场景下，该子组件会被渲染
### 重新渲染的执行顺序
1. getInitialState
2. componentWillMount
3. render
4. componentDidMount
```javascript
var ChildrenComponent = React.createClass({
    componentWillUnmount: function(){
        console.log('componentWillUnmount');
    },
    render: function(){
        return <h3>{this.props.myNumber}</h3>
    }
})

var UnmountingComponent = React.createClass({
    getInitialState: function() {
        return {
            data:0
        };
    },
    setNewNumber: function() {
        this.setState({data: this.state.data + 1})
    },
    render: function () {
        var content;
        //当条件不符合时 ChildrenComponent 会被移除，然后会触发方组件的 componentWillUnmount 方法
        //当条件重新符合时，会重新渲染组件 ChildrenComponent
        if(this.state.data % 2 == 0){
            content = <ChildrenComponent myNumber = {this.state.data}></ChildrenComponent>;
        } else {
            content = <h3>{this.state.data}</h3>;
        }
        return (
            <div>
                <button onClick = {this.setNewNumber}>INCREMENT</button>
                {content}
            </div>
        );
    }
})

ReactDOM.render(<UnmountingComponent/>, document.getElementById('div3'));
```
[效果预览](https://wscats.github.io/react-tutorial/react/component/src/lifecycle/lifecycle.html)