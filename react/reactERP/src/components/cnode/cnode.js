import './cnode.scss'

import React from 'react'
import Datagrid from '../../components/datagrid/datagridcomponent'
import Modal from '../../components/modal/modalcomponent'

export default class CNodeComponent extends React.Component{
    static defaultProps = {
        cnode: {
            config: {
                url: 'https://cnodejs.org/api/v1/topics',
                data: {page: 1, limit: 10},
                cols: ['title', 'reply_count', 'top', 'create_at', 'last_reply_at'],
                name: 'cnode'
            }           
        },
        modal: {
            config: {
                type: 'datagrid',
                url: 'https://cnodejs.org/api/v1/topics',
                data: {page: 3, limit: 5},
                cols: ['title'],
                name: 'modal'
            } 
        }
    }
    state = {
        modalShow: false,
        title: ''
    }
    filldata(_data = {}){
        this.setState({
            modalShow: false,
            title: _data.title || this.state.title
        })
    }
    componentDidMount(){
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
    }
    routerWillLeave(){
        return '确认要离开？'
    }
    showup(){
        this.setState({
            modalShow: true
        })
    }
    render(){
        return (
            <div>
                <div className="dk-toolbar" style={{background: '#fff'}}>
                    <div className="input-group col-sm-3">
                        <input type="text" className="form-control" placeholder="Title" value={this.state.title} onClick={this.showup.bind(this)}/>
                        <div className="input-group-addon">...</div>
                    </div>
                </div>                
                <Datagrid config={this.props.cnode.config}/>
                <Modal config={this.props.modal.config} show={this.state.modalShow} cb={this.filldata.bind(this)}/>
            </div>
        )
    }
}