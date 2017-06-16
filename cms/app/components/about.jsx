import React from 'react';
import {
  Jumbotron,
  Checkbox,
  Radio,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
class About extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <p>
            <Button bsStyle="primary">Learn more</Button>
          </p>
        </Jumbotron>
      </div>
    )
  }
}
module.exports = About;
