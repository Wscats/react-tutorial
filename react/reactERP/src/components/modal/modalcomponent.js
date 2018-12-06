import React, {Component} from 'react'

import DatagridComponent from '../datagrid/datagridcomponent'

import './modal.css'

class ModalComponent extends Component{
    cancel(){
        this.props.cb();
    }
    render(){
        let content = null;
        if(this.props.config.type == 'datagrid'){
            content = <DatagridComponent config={this.props.config} cb={this.props.cb}/>
        } else {
            content = <p>modal</p>
        }

        let html = (
            <div className="Marco-modal">
                <div className="Marco-modalBody">
                    <div className="Marco-modalHeader">
                        <h5>Modal Header</h5>
                        <span className="Marco-modalClose"  onClick={this.cancel.bind(this)}>&times;</span>
                    </div>
                    <div className="Marco-modalMain">
                        {content}
                    </div>
                </div>
                <div className="Marco-modalShade"></div>
            </div>
        )
        return this.props.show ? html : null;
    }
}

export default ModalComponent;