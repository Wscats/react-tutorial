const React = require('react');
import { matchRoutes, renderRoutes } from 'react-router-config';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

const AppComponent = require('./components/productBox.jsx');
const Wscats = require('./components/wscats.jsx');
const IndexA = require('./components/index/indexA.jsx');
const IndexB = require('./components/index/indexB.jsx');
let Root = require('./components/root.jsx')
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