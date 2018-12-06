import React, {Component} from 'react'
import HeaderComponent from './header/header'
import NavComponent from './nav/nav'
import './home.scss'

export default class HomeComponent extends Component{
    render(){
        return (
            <div className="dk-container">
            <HeaderComponent/>
            <div className="dk-body">
                <NavComponent />
                <div className="dk-content">
                    <div className="dk-viewer">{this.props.children}</div>
                </div>
            </div>
            <div className="dk-footer">@dk</div>
        </div>	       
        )
    }
}