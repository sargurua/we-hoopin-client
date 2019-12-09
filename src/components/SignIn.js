import React, {Component} from 'react'
import {login} from "../redux/actions"
import redux from 'redux'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import Swal from 'sweetalert2'

class SignIn extends Component {
    handleSubmit = event => {
        event.preventDefault()

        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: event.target[0].value,
                password: event.target[1].value
            })
        }
        fetch('http://localhost:3000/api/signin', reqObj)
        .then(resp => resp.json())
        .then(json =>{
            localStorage.setItem("token", json.token.split(" ")[1])
            this.props.callLogin(json.token.split(" ")[1])
            this.props.history.goBack()
        })
        .catch(err => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Naw'
          }))
    }
    render () {
        if(localStorage.getItem("token")) {
            this.props.history.push('/')
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Sign In</h1>
                <p>UserName:</p>
                <input type="text"></input>
                <p>Password:</p>
                <input type="password"></input>
                <div></div>
                <input type="submit"></input>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {token: state.token}
}

const mapDispatchToProps = dispatch => {
    return {callLogin: token => dispatch(login(token))}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn))