import React, {Component} from 'react'
import LeadingScorer from './LeadingScorer'
import {PROXY_URL} from '../constants'
import {withRouter} from 'react-router-dom'
import { Table } from 'semantic-ui-react'

class TeamCard extends Component {
    handleClick = event => {
        console.log(this.props)
        let teamName = ""
        this.props.history.push(`/teams/${this.props.team.teamSitesOnly.teamTricode}/${this.props.team.teamId}`)
        fetch(PROXY_URL + `http://data.nba.net/data/10s/prod/v1/2019/teams/${this.props.team.teamSitesOnly.teamCode}/roster.json`)
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
            <Table.Row>
                <Table.Cell onClick={this.handleClick}>{this.props.team.teamSitesOnly.teamName} {this.props.team.teamSitesOnly.teamNickname}</Table.Cell>
                <Table.Cell>{this.props.team.win}-{this.props.team.loss}</Table.Cell>
                <Table.Cell>{this.props.team.lastTenWin}-{this.props.team.lastTenLoss}</Table.Cell>
                <Table.Cell>{this.props.team.isWinStreak ? "W" : "L"}{this.props.team.streak}</Table.Cell>
                <Table.Cell>{Math.round(this.props.team.winPct * 82)}-{82 - Math.round(this.props.team.winPct * 82)}</Table.Cell>
            </Table.Row>
        )
    }
}

export default withRouter(TeamCard)