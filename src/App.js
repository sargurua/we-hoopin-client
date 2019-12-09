import React, {Component} from 'react';
import './App.css';
import Home from "./containers/Home"
import {login, getUser} from "./redux/actions"
import {connect} from "react-redux"
import {BrowserRouter as Router, withRouter} from 'react-router-dom'


class App extends Component {

  componentDidMount() {

  }

  render(){
    return(
      <div style={{height: '100%'}}>
          <Router>
            <Home />
          </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {token: state.token, user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {callLogin: token => dispatch(getUser(token)), setToken: token => dispatch(login(token))}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)