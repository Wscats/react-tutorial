import React from 'react'

let Login = (props) => {
    return <input type="button" value="login" onClick={props.click}/>;
}


let Logout = (props) => {
    return <input type="button" value="logout" onClick={props.click}/>;
}

export default Login

// export default class CP extends React.Component{
//     state = {
//         status: 0
//     }

//     login(){
//         this.setState({status: 1})
//     }

//     logout(){
//         this.setState({status: 0})
//     }

//     render(){
//         let button = null;
//         if(this.state.status == 0){
//             button = <Login click={this.login.bind(this)}/>
//         } else {
//             button = <Logout click={this.logout.bind(this)} />
//         }

//         return <div>{button}</div>
//     }
// }