import React, {Component} from 'react'
import './spinner.scss'

class SpinnerComponent extends React.Component{
    render(){
        let html = (
            <div>
                <div className="dk-spinner-mask"></div>
                <div className="dk-spinner dk-spinner-three-bounce">
                    <div className="dk-bounce1"></div>
                    <div className="dk-bounce2"></div>
                    <div className="dk-bounce3"></div>
                </div>        
            </div>     
        )
        return this.props.show ? html : null;
    }
}

export default SpinnerComponent