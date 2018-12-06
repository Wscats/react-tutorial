import React from 'react'

export default class AppComponent extends React.Component{
    render(){
        return <div>{this.props.children}</div>
    }
}