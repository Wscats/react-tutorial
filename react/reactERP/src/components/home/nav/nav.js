import React, {Component} from 'react'
import {Link} from 'react-router'
import './nav.scss'

export default class NavComponent extends Component{
    toggleNav(){}
    toggleNavItem(){}
    render(){
        return (
            <div className="dk-nav-content" ref="dknav">
            <ul className="dk-nav">
                <li className="dk-nav-item nav-toggle">
                    <a className="btn btn-primary" href="javascript:" onClick={this.toggleNav} >
                        <i className="fa fa-bars"></i> 
                    </a>
                </li>
                <li className="dk-nav-item" onClick={this.toggleNavItem}>
                    <a href="javascript:">
                        <i className="fa fa-file-o"></i>
                        <span>档案管理</span>
                        <i className="fa fa-angle-left"></i>
                    </a>
                    <ul className="dk-sub-nav">
                        <li><Link to="/clients">客户档案</Link></li>
                        <li><Link to="/">产品档案</Link></li>
                        <li><Link to="/">供应商档案</Link></li>
                        <li><Link to="/">人事档案</Link></li>
                    </ul>
                </li>
                <li className="dk-nav-item" onClick={this.toggleNavItem}>
                    <a href="javascript:">
                        <i className="fa fa-cog"></i>
                        <span>系统设置</span>
                        <i className="fa fa-angle-left"></i>
                    </a>
                    <ul className="dk-sub-nav">
                        <li><Link to="/">修改密码</Link></li>
                        <li><Link to="/">修改信息</Link></li>
                        <li><Link to="/">权限设置</Link></li>
                        <li><Link to="/">模块设置</Link></li>
                    </ul>
                </li>					
            </ul>
        </div>	       
        )
    }
}