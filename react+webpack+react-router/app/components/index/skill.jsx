import React from 'react';
import PropTypes from 'prop-types';

class Skill extends React.Component {
	constructor(props) {
        super(props);
        // Set initial state
        this.state = {
            text: props.initialValue || 'Hello Wscats'
        };
        // Bind handler in ES6 class
        this.handleChange = this.handleChange.bind(this);
    }
	componentDidMount() {
	}
	handleChange(event) {
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
    // Define prop types for validation
    initialValue: PropTypes.string.isRequired
};
Skill.defaultProps = {
    // Default props
    initialValue: 'Hello Oaoafly'
};
module.exports = Skill;