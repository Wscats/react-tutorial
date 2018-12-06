import React, {Component} from 'react'
import {Link} from 'react-router'
import './header.scss'

class HeaderComponent extends Component{
    render(){
        return (
            <div className="dk-header">
                <ul>
                    <li><Link to="/">PrintERP</Link></li>
                </ul>
                <ul>
                    <li>
                        <Link className="dropdown-toggle count-info" to="/">
                            <i className="fa fa-bars"></i>
                            <span className="badge badge-primary"> 2</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-toggle count-info" to="/">
                            <i className="fa fa-envelope"></i>
                            <span className="badge badge-primary"> 2</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-toggle count-info" to="/">
                            Adminstrator
                        </Link>
                    </li>						
                </ul>		
            </div>        
        )
    }
}

export default HeaderComponent