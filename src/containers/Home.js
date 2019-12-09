import React, {Component, useState} from 'react'
import TeamList from './TeamList'
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import HomePage from '../components/HomePage'
import Games from '../components/Games'
import Players from '../components/Players'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import PlayerDetail from "../components/PlayerDetail"
import TeamDetail from '../components/TeamDetail';
import BoxScore from '../components/BoxScore'
import UserPage from '../components/UserPage'
import {getUser, login, logout} from "../redux/actions"
import {connect} from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'reactstrap';

class Home extends Component {



    constructor(){
        super()
        this.state = {
            teams: [],
            isOpen: false
        }
    }

    toggle = () => this.setState(!this.state.isOpen);
    
    ifUser(){
        console.log(localStorage.getItem("token") !== null)
        console.log(localStorage.getItem("token") !== null && this.props.user === undefined)
        if (this.props.token !== undefined && this.props.user === undefined){
            console.log("called")
            this.props.callLogin(this.props.token)
        }
        if (localStorage.getItem("token") !== null && this.props.user === undefined){
          this.props.setToken(localStorage.getItem("token"))
        }
        
    }

    logout = () => {
        localStorage.clear()
        this.props.history.push("/")
        window.location.reload()
    }

    handleClick = e => {
        console.log(e.target.value)
    }

    render() {
        this.ifUser()
        return(
            <div>
                <div>
                    {this.props.user
                    ?
                    <div> 
                        <Navbar style={{backgroundColor: "#ffc87a"}} light expand="md"  style={{width: '100%'}}>
                            <NavbarBrand className='mr-auto' href='/'>
                                <div style={{display: 'flex'}}> 
                                    <img style={{height: '60px', width: 'auto'}} src={'/we-hoopin-log.png'}/>
                                    <h1 style={{marginTop: '11px', marginLeft: '15px', color: '#272343'}}>We Hoopin</h1>
                                </div>
                            </NavbarBrand>
                            <Nav navbar className='ml-auto'>
                                <NavItem style={{fontSize: '25px', marginLeft: '15px', marginRight: '15px'}}>
                                    <NavLink href="/standings">Standings</NavLink>
                                </NavItem>
                                <NavItem style={{fontSize: '25px', marginLeft: '15px', marginRight: '15px'}}>
                                    <NavLink href="/players">Players</NavLink>
                                </NavItem>
                                <NavItem style={{fontSize: '25px', marginLeft: '15px', marginRight: '15px'}}>
                                    <NavLink href="/games">Games</NavLink>
                                </NavItem>                                <NavItem style={{fontSize: '25px', marginLeft: '15px', marginRight: '15px'}}>
                                    <NavLink href={`/users/${this.props.user.id}`}>{this.props.user.username}</NavLink>
                                </NavItem>
                                <NavItem style={{fontSize: '25px', marginLeft: '15px', marginRight: '15px'}}>
                                    <NavLink href="/" onClick={() => {this.logout()}}>Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </div>
                    :
                    <div> 
                    <Navbar style={{backgroundColor: "#ffc87a"}} light expand="md"  style={{width: '100%'}}>
                        <NavbarBrand className='mr-auto' href='/'>
                            <div style={{display: 'flex'}}> 
                                <img style={{height: '60px', width: 'auto'}} src={'/we-hoopin-log.png'}/>
                                <h1 style={{marginTop: '11px', marginLeft: '15px', color: '#272343'}}>We Hoopin</h1>
                            </div>
                        </NavbarBrand>
                        <Nav navbar className='ml-auto'>
                            <NavItem style={{fontSize: '25px', marginLeft: '15px', marginRight: '15px'}}>
                                <NavLink href="/standings">Standings</NavLink>
                            </NavItem>
                            <NavItem style={{fontSize: '25px', marginLeft: '15px', marginRight: '15px'}}>
                                <NavLink href="/players">Players</NavLink>
                            </NavItem>
                            <NavItem style={{fontSize: '25px', marginLeft: '15px', marginRight: '15px'}}>
                                <NavLink href="/games">Games</NavLink>
                            </NavItem>  
                            <NavItem style={{fontSize: '25px', marginLeft: '15px', marginRight: '15px'}}>
                                <NavLink href="/signup"> Sign Up</NavLink>
                            </NavItem>
                            <NavItem style={{fontSize: '25px', marginLeft: '15px', marginRight: '15px'}}>
                                <NavLink href="/signin">Login</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
                    }

                </div>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/games">
                        <Games />
                    </Route>
                    <Route exact path="/standings">
                        <TeamList />
                    </Route>
                    <Route exact path="/players">
                        <Players />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                    <Route exact path="/signin">
                        <SignIn />
                    </Route>
                    <Route path='/players/:player_id' component={PlayerDetail} />
                    <Route path='/teams/:team_code/:teamId' component={TeamDetail} />
                    <Route path='/games/:date/:game_id' component={BoxScore} />
                    <Route path='/users/:user_id' component={UserPage} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {callLogin: token => dispatch(getUser(token)), setToken: token => dispatch(login(token)), callLogout: () => {
        dispatch(logout(this.props.history))
    }
    }
  }

const mapStateToProps = state => {
    return {user: state.user, token: state.token}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)