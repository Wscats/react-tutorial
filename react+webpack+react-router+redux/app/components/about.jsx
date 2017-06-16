import React from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
class About extends React.Component {
  render() {
    return (
      <div>
        <h2>关于</h2>
        <ButtonGroup vertical block>
          <Button>Full width button</Button>
          <Button>Full width button</Button>
        </ButtonGroup>
        <div>Hello World!</div>
      </div>
    )
  }
}
module.exports = About;
