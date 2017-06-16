var React = require('react');
import {
  Grid,
  Row,
  Col,
  Table,
  ButtonToolbar,
  Button
} from 'react-bootstrap';
class ProductBox extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>
                      <ButtonToolbar>
                        <Button bsSize="xsmall">Delete</Button>
                      </ButtonToolbar>
                    </td>
                  </tr>

                </tbody>
              </Table>
            </Col>
            <Col xs={6} md={4}>
              <ButtonToolbar>
                <Button bsStyle="primary" bsSize="xsmall">Extra small button</Button>
                <Button bsSize="xsmall">Extra small button</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
module.exports = ProductBox;
