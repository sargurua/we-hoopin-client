import React, {Component} from 'react'

import GeneralHomePage from "./GeneralHomePage"
import UserHomePage from "./UserHomePage"

import {homeObject, getAllPlayers} from "../redux/actions"
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class HomePage extends Component {
    
    checkUser(){
        if (this.props.user){
            console.log("logged in")
        }
        else {
            console.log("logged out")
        }
    }

    render() {
        return (
            <div>
                <GeneralHomePage />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => {
    return {callGetAllPlayers: () => dispatch(getAllPlayers())}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage))