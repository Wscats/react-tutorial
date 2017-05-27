var React = require('react');
import { matchRoutes, renderRoutes } from 'react-router-config';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

var AppComponent = require('./components/productBox.jsx');
var Wscats = require('./components/wscats.jsx');
var IndexA = require('./components/index/indexA.jsx');
var IndexB = require('./components/index/indexB.jsx');
var Root = require('./components/root.jsx')
//根组件
/*const Root = ({route}) => (
  <div>
    <h1>Root</h1>
    <Link to="/">home</Link> <Link to="/index">index</Link>
    {renderRoutes(route.routes)}
    {console.log(route)}
  </div>
)*/

const routes = [
  { component: Root,
    routes: [
      { path: '/',
        exact: true,
        component: AppComponent
      },
      { path: '/index',
        component: Wscats,
        routes: [
          { path: '/childA',
            component: IndexA
          },
          { path: '/childB',
            component: IndexB
          }
        ]
      }
    ]
  }
]
module.exports = routes;