import React, {Component} from 'react'
import LeadingScorer from './LeadingScorer'
import {PROXY_URL} from '../constants'
const nba = require('nba.js').default;

export default class TeamCard extends Component {
    handleClick = event => {
        let teamName = ""
        console.log(PROXY_URL + `http://data.nba.net/data/10s/prod/v1/2019/teams/${this.props.team.teamSitesOnly.teamNickname.split(" ").join("").toLowerCase()}/roster.json`)
        fetch(PROXY_URL + `http://data.nba.net/data/10s/prod/v1/2019/teams/${this.props.team.teamSitesOnly.teamNickname.split(" ").join("").toLowerCase()}/roster.json`)
        .then(resp => resp.json())
        .then(json =>this.findPlayers(json.league.standard.players))
    }

    findPlayers = players => {
        return players.map(player => this.findPlayerFromAll(player.personId))
    }

    findPlayerFromAll = (playerId) => {
        fetch(PROXY_URL + 'http://data.nba.net/data/10s/prod/v1/2019/players.json')
        .then(resp => resp.json())
        .then(json => {
            const person = json.league.standard.find(player => player.personId == playerId)
            console.log(`${person.firstName} ${person.lastName}`)
        })
    }

    render() {
        return(
            <tr>
                <td>
                    <p onClick={this.handleClick}>{this.props.team.teamSitesOnly.teamName} {this.props.team.teamSitesOnly.teamNickname}</p>
                </td>
                <td>
                    {this.props.team.win}-{this.props.team.loss}
                </td>
                <td>
                    {this.props.team.lastTenWin}-{this.props.team.lastTenLoss}
                </td>
                <td>
                    {this.props.team.isWinStreak ? "W" : "L"}{this.props.team.streak}
                </td>
                <td>
                    {Math.round(this.props.team.winPct * 82)}-{82 - Math.round(this.props.team.winPct * 82)}
                </td>
            </tr>
        )
    }
}