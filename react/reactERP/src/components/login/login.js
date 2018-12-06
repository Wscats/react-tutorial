import React, {Component} from 'react'

import './login.scss'

class LoginComponent extends Component{
    login(){
        console.log(this)
        this.props.router.push({pathname: '/home/cnode'})
    }
    render(){
        return (
            <div className="login-box">
                <div className="col-sm-12 b-r">
                    <h3 className="m-t-none m-b">登录</h3>
                    <form role="form">
                        <div className="form-group text-left">
                            <label>用户名：</label>
                            <input type="text" placeholder="请输入用户名" className="form-control required" />
                        </div>
                        <div className="form-group  text-left">
                            <label>密码：</label>
                            <input type="password" placeholder="请输入密码" className="form-control required" />
                        </div>
                        <div>
                            <input type="button" className="btn btn-primary pull-right m-t-n-xs" value="登录" onClick={this.login.bind(this)} />
                        </div>
                    </form>
                </div>
                <div className="copyright">2017 © dk by www.wscats.com</div>
            </div>            
        )
    }
}

export default LoginComponent