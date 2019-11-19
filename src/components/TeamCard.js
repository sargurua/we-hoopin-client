import React, {Component} from 'react'
import LeadingScorer from './LeadingScorer'

export default class TeamCard extends Component {
    render() {
        return(
            <tr>
                <td>
                    {this.props.team.teamSitesOnly.teamName}           {this.props.team.teamSitesOnly.teamNickname}
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