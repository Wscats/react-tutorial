import React, {Component} from 'react';
import * as loginActions from './LoginAction';
import {connect} from 'react-redux'
// import {Input} from 'element-react';
// import 'element-theme-default';

class LoginComponent extends Component{
    loginHandler(){
        this.props.login();
    }
    render(){
        return (
        <div className="col-md-12">
            <div className="form-group">
                <label className="col-sm-2 control-label">
                    用户名
                </label>
                <div className="col-sm-9">
                    <input type="text" placeholder="输入用户名" id="form-field-1" className="form-control"/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-2 control-label">
                    密码
                </label>
                <div className="col-sm-9">
                    <input type="text" placeholder="输入密码" id="form-field-1" className="form-control"/>
                </div>
            </div> 
            <button type="button" className="btn btn-primary" onClick={this.loginHandler.bind(this)}>登录</button>
            <i className="fa fa-fire"></i>
            <h1>{this.props.a}</h1>
        </div>            
        )
    }
}

// const mapStateToProps = state => ({
//     loading: false,
// })

const mapStateToProps = (state) => {
    return {
        loading: false,
        a: state.login.login.a
    }
}
export default connect(mapStateToProps, loginActions)(LoginComponent)