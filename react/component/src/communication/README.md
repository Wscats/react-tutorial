# 组件通信

在这里只讲 React 组件与组件本身的通信，组件通信主要分为三个部分：
- 父组件向子组件通信：父组件向子组件传参或者是父组件调用子组件的方法
- 子组件向父组件通信：子组件向父组件传参或者是子组件调用父组件的方法
- 兄弟组件通信：兄弟组件之间相互传参或调用
建议不要有太深的的嵌套关系

## 父组件向子组件通信
- 父：调用子组件的方法主要使用 `this.refs.c1.changeChildren1`
- 父：向子组件传参主要使用 `text={this.state.text}`
- 子：定义方法 changeChildren1 供父组件调用
- 子：使用通过属性 `this.props.text` 获取来自父组件的传参
```javascript
//父组件向子组件通信
//父组件
var ParentComponent1 = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },
    //输入事件
    change: function(event){
        this.setState({text: event.target.value});
        //调用子组件的方法
        this.refs.c1.changeChildren1(event.target.value);
    },
    render: function(){
        return (
            <div>
                <p><label>父组件</label><input type="text" onChange={this.change}/></p>
                <ChildrenComponent1 ref="c1" text={this.state.text}/>
            </div>                        
        )
    }
}) 

//子组件
var ChildrenComponent1 = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },
    //被父组件调用执行
    changeChildren1: function(text){
        this.setState({text: text});
    },
    render: function(){
        return (
            <div>
                <p>子组件-来自父组件的调用：{this.state.text}</p>
                <p>子组件-来自父组件的传参：{this.props.text}</p>
            </div>                        
        )
    }
})  
ReactDOM.render(<ParentComponent1/>, document.getElementById('div1')); 
```

## 子组件向父组件通信
- 父：定义方法 changeParent 供子组件调用
- 子：调用父组件的方法主要使用 `this.props.change(event.target.value);`
```javascript
//子组件向父组件通信
//父组件
var ParentComponent2 = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },
    //被子组件调用执行
    changeParent: function(text){
        this.setState({text: text});
    },
    render: function(){
        return (
            <div>
                <p>父组件-来自子组件的调用：{this.state.text}</p>                     
                <ChildrenComponent2 change={this.changeParent}/>
            </div>                        
        )
    }
}) 

//子组件
var ChildrenComponent2 = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },
    //输入事件
    change: function(event){
        //调用子组件的方法
        this.props.change(event.target.value);
    },
    render: function(){
        return (
            <div>
                <p><label>子组件</label><input type="text" onChange={this.change}/></p>
            </div>                        
        )
    }
})  
ReactDOM.render(<ParentComponent2/>, document.getElementById('div2'));      
```
## 兄弟组件通信
- 方式一：通过共同的父组件通信
因为在 React 组件必须有且仅有一个最顶层元素，所以兄弟组件之间肯定会有共同的父元素（组件），所以兄弟之间的可以通过共同的父元素（组件）进行通信，通信的方式和上面介绍的父子、子父相互结合便可达到
```javascript
//兄弟组间通信-通过共同的父组件通信
//父组件
var ParentComponent3 = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },
    //被子组件2调用，向子组件1通信
    changeChildren1: function(text){
        //调用子组件1的方法
        this.refs.cp1.changeState(text);
    },
    //被子组件1调用，向子组件2通信
    changeChildren2: function(text){
        //调用子组件2的方法
        this.refs.cp2.changeState(text);
    },                
    render: function(){
        return (
            <div>
                <p>父组件-来自子组件的调用：{this.state.text}</p>                     
                <ChildrenComponent3_1 change={this.changeChildren2} ref="cp1"/>
                <ChildrenComponent3_2 change={this.changeChildren1} ref="cp2"/>
            </div>                        
        )
    }
}) 

//子组件1
var ChildrenComponent3_1 = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },
    changeState: function(text){
        this.setState({text: text});
    },                  
    //输入事件
    change: function(event){
        //调用子组件的方法
        this.props.change(event.target.value);
    },
    render: function(){
        return (
            <div>
                <p><label>子组件1</label><input type="text" onChange={this.change}/></p>
                <p>来自子组件2的调用-{this.state.text}</p>
            </div>                        
        )
    }
})  
//子组件2
var ChildrenComponent3_2 = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },              
    changeState: function(text){
        this.setState({text: text});
    },  
    //输入事件
    change: function(event){
        //调用子组件的方法
        this.props.change(event.target.value);
    },
    render: function(){
        return (
            <div>
                <p><label>子组件2</label><input type="text" onChange={this.change}/></p>
                <p>来自子组件1的调用-{this.state.text}</p>
            </div>                        
        )
    }
})              
ReactDOM.render(<ParentComponent3/>, document.getElementById('div3')); 
```
方式二：通过 context 通信
和通过共同的父组件通信一样，不同之处在于调用的是 context
```javascript
//兄弟组间通信-通过 context 通信
//父组件
var ParentComponent4 = React.createClass({
    getChildContext: function(){
        return {
            changeChildren1: function(text){
                this.refs.cp1.changeState(text)
            }.bind(this),
            changeChildren2: function(text){
                this.refs.cp2.changeState(text)
            }.bind(this)
        }
    },
    childContextTypes: {
        changeChildren1: React.PropTypes.func.isRequired,
        changeChildren2: React.PropTypes.func.isRequired
    },                
    render: function(){
        return (
            <div>
                <ChildrenComponent4_1 ref="cp1"/>
                <ChildrenComponent4_2 ref="cp2"/>
            </div>                        
        )                    
    }
}) 

//子组件1
var ChildrenComponent4_1 = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },
    contextTypes: {
        changeChildren2: React.PropTypes.func.isRequired
    },                         
    changeState: function(text){
        this.setState({text: text});
    },                  
    //输入事件
    change: function(event){
        //调用子组件的方法
        this.context.changeChildren2(event.target.value);
    },
    render: function(){
        return (
            <div>
                <p><label>子组件1</label><input type="text" onChange={this.change}/></p>
                <p>来自子组件2的调用-{this.state.text}</p>
            </div>                        
        )
    }
})  
//子组件2
var ChildrenComponent4_2 = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },   
    contextTypes: {
        changeChildren1: React.PropTypes.func.isRequired
    },                            
    changeState: function(text){
        this.setState({text: text});
    },  
    //输入事件
    change: function(event){
        //调用子组件的方法
        this.context.changeChildren1(event.target.value);
        
    },
    render: function(){
        return (
            <div>
                <p><label>子组件2</label><input type="text" onChange={this.change}/></p>
                <p>来自子组件1的调用-{this.state.text}</p>
            </div>                        
        )
    }
});                
ReactDOM.render(<ParentComponent4/>, document.getElementById('div4'));       
```

### 效果预览

- [父子组件双向通信](https://wscats.github.io/react-tutorial/react/component/src/communication/communication.html)