import React from 'react'
import {Route, IndexRoute} from 'react-router'

import AppComponent from '../components/app/app'
import HomeComponent from '../components/home/home'
import LoginComponent from '../components/login/login'
import CNodeComponent from '../components/cnode/cnode'


const routes = (
    <Route path="/" component={AppComponent}>
        <IndexRoute component={HomeComponent} />
        <Route path="login" component={LoginComponent} />
        <Route path="home" component={HomeComponent}>
            <IndexRoute component={CNodeComponent} />
            <Route path="cnode" component={CNodeComponent}/>
        </Route>
    </Route>
)

export default routes;