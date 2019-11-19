import React, {Component} from 'react'
import TeamList from './TeamList'
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import HomePage from '../components/HomePage'
import Games from '../components/Games'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            teams: []
        }
    }

    componentDidMount(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://data.nba.net/data/10s/prod/v1/current/standings_all.json"
    fetch(proxyurl + url)
    .then(resp => resp.json())
    .then(json => {
        console.log(json.league.standard.teams)
        this.setState({
        teams: json.league.standard.teams
        })
    })
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
            </div>
        )
    }
}

export default Home