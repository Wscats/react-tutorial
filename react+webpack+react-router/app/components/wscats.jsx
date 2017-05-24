var React = require('react');
var ReactDom = require('react-dom');
//引入skill组件
var Skill = require('./index/skill.jsx');
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'
const Topic = () => (
  <div>
    <h5>Topic</h5>
  </div>
)
const About = ({match}) => (
  <div>
    <h5>About</h5>
    <h3>ID: {match.params.id}</h3>
  </div>
)
//新版本的写法 推荐
class Wscats extends React.Component {
	render() {
		return( 
			<div>
				<div>Wscats</div>
				<div>
				    <h2>主题列表</h2>
				    <ul>
				      <li>
				        <Link to="/index/home">
				 			主页
				        </Link>
				      </li>
				      <li>
				      	<Link to="/index/about/1">
							关于
				        </Link>
				      </li>
				      <li>
				      	<Link to="/index/skill/yao">
							技能
				        </Link>
				      </li>
				    </ul>
				    <Route path="/index/home" component={Topic}/>
				    <Route path="/index/about/:id" component={About}/>
				    <Route path="/index/skill/:name" component={Skill}/>
				  </div>
			</div>
		)
	}
}
module.exports = Wscats;