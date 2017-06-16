import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, HashRouter} from 'react-router-dom'
import {createBrowserHistory, createHashHistory} from 'history'
const history = createHashHistory()
//引入组件
import Home from "./home.jsx";
import Topics from "./topics.jsx";
import About from "./about.jsx";
import {ButtonGroup, Button, Grid, Row, Col} from 'react-bootstrap';

import {increaseAction, multiAction} from '../action.js';

import {connect} from 'react-redux';

import {Tab, Tabs} from 'react-bootstrap';

// React component
class Basic extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      text: props.initialValue || 'Hello Wscats'
    };
    // ES6 类中函数必须手动绑定
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    var page = event.target.id.charAt(event.target.id.length - 1);
    switch (page) {
      case "1":
        history.push('/');
        break;
      case "2":
        history.push('/about');
        break;
      case "3":
        history.push('/topics');
        break;
    }
  }
  render() {
    const {value, onIncreaseClick} = this.props
    return (
      <HashRouter history={history}>
        <div>
          <Tabs defaultActiveKey={2} id="uncontrolled-tab-example" onClick={this.handleSubmit}>
            <Tab eventKey={1} title="首页"></Tab>
            <Tab eventKey={2} title="关于"></Tab>
            <Tab eventKey={3} title="主题列表"></Tab>
            <Tab eventKey={4} title="其他" disabled></Tab>
          </Tabs>
          <p>{value}</p>
          <button onClick={onIncreaseClick}>Increase</button>
          {/*<ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/about">关于</Link>
            </li>
            <li>
              <Link to="/topics">主题列表</Link>
            </li>
          </ul>*/}
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
          <Redirect to="/topics"/>{/*默认跳转*/}
        </div>
      </HashRouter>
    )
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {value: state.count}
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => {
      //可以触发多个
      dispatch(increaseAction())
      dispatch(multiAction())
    }
  }
}
// Connected Component
export default connect(mapStateToProps, mapDispatchToProps)(Basic);
