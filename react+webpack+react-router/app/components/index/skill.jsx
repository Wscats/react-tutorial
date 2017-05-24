//var React = require('react');
import React from 'react';
import PropTypes from 'prop-types';
//新版本的写法 推荐
class Skill extends React.Component {
	constructor(props) {
        super(props);
        // 设置 initial state
        this.state = {
            text: props.initialValue || 'Hello Wscats'
        };
        // ES6 类中函数必须手动绑定
        this.handleChange = this.handleChange.bind(this);
    }
	componentDidMount() {
		console.log(this.props.match)
	}
	handleChange(event) {
		console.log(this)
        this.setState({
            text: event.target.value
        });
 	}
	render() {
		return( 
			<div>
				<h5>sKill</h5>
				<div>
					Type something:
					<input onChange={this.handleChange} value={this.state.text} />
					<p>{this.state.text}</p>
				</div>
			</div>
		)
	}
}
Skill.propTypes = {
	//定义传入props中的属性各种类型
    initialValue: PropTypes.string.isRequired//PropTypes.string
};
Skill.defaultProps = {
	//组件默认的props对象
    initialValue: 'Hello Oaoafly'
};
module.exports = Skill;