import React, {Component} from 'react'
import TeamList from './TeamList'
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import HomePage from '../components/HomePage'
import Games from '../components/Games'
import Players from '../components/Players'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            teams: []
        }
    }

    componentDidMount(){
    }

    handleClick = e => {
        console.log(e.target.value)
    }

    render() {
        return(
            <div>
                <div>
                    <a className="home-link" href="/"><img className='we-hoopin-logo' src='./we-hoopin-log.png'></img></a>
                    <div class="ui three item menu">
                        <a class="item" href="/standings">Standings</a>
                        <a class="item" href='/players'>Players</a>
                        <a class="item" href='/games'>Games</a>
                    </div>
                </div>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/games">
                        <Games />
                    </Route>
                    <Route exact path="/standings">
                        <TeamList teams={this.state.teams}/>
                    </Route>
                    <Route exact path="/players">
                        <Players />
                    </Route>
            </div>
        )
    }
}

export default Home