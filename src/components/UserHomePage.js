import React, {Component} from 'react'
import {homeObject} from "../redux/actions"
import redux from 'redux'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import GeneralHomePage from './GeneralHomePage'

class UserHomePage extends Component {
    renderPlayers = () => {
        return this.props.user.playerBandwagons.map(player => {
        return <h1>{player.first_name} {player.last_name}</h1>
        })
    }

    render() {
        return (
            <div>
                {this.renderPlayers()}
                <GeneralHomePage />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {homeDisplay: state.homeDisplay, user: state.user}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserHomePage))