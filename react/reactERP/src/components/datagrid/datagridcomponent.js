import React from 'react'
import {connect} from 'react-redux'

import SpinnerComponent from '../spinner/spinner'

import * as actions from './datagridaction'

class DatagridComponent extends React.Component{
    getKeys(item){
        let cols = item ? Object.keys(item) : [];
        return this.props.config.cols || cols;
    }
    selectTr(item){
        if(this.props.cb){
            this.props.cb(item)
        }
    }
    componentWillMount(){
        this.props.refresh(this.props.config)
    }
    render(){
        let ds = this.props.dataset;
        let name = this.props.config.name;
        if(name){
            ds = ds[name] ? ds[name].dataset : []
        } else {
            ds = ds.dataset || [];
        }
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            {
                                this.getKeys(ds[0]).map((key) => {
                                    return <th key={Math.random()}>{key}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ds.map((item) => {
                                return (
                                    <tr key={item.id || item.indexid} onDoubleClick={this.selectTr.bind(this, item)}>
                                        {
                                            this.getKeys(item).map((key) => {
                                                return <td key={Math.random()}>{item[key]}</td>
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                        <tr></tr>
                    </tbody>
                </table>
                <SpinnerComponent show={this.props.show}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataset: state.datagrid, 
        show: state.datagrid.show,
        error: state.datagrid.error
    }
}

export default connect(mapStateToProps, actions)(DatagridComponent);