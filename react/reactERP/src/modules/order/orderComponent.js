import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as orderActions from './orderAction';
import PropTypes from 'prop-types'


class OrderComponent extends React.Component{
    scanHandler(){
        this.props.scanCode();
    }
    printHandler(){
        this.props.print();
    }
    render(){
        return (
            <div>
                <p><input type="button" value="scan" onClick={this.scanHandler.bind(this)}/></p>
                <p><input type="button" value="print" onClick={this.printHandler.bind(this)}/></p>
                <ul>
                    <li>{this.props.name}</li>
                    <li>{this.props.price}</li>
                </ul>
                <h1>{this.props.order.scanCode.length}</h1>
            </div>
        )
    }
}

OrderComponent.propTypes = {
    name: PropTypes.string.isRequired
}

// const mapStateToProps = state => ({order: state.order})
// state == store
const mapStateToProps = (store) => {
    return {
        order: store.order
    }
}
export default connect(mapStateToProps, orderActions)(OrderComponent)

// export default OrderComponent;