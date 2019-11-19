import React, {Component} from 'react'
import TeamCard from "../components/TeamCard"

export default class TeamList extends Component {
    render(){
        const newTeams = this.props.teams.map((team, indx) => <TeamCard key={indx} team={team}/>)
        return(
             <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Record</th>
                        <th>Last 10</th>
                        <th>Streak</th>
                        <th>Projected Record</th>
                    </tr>
                </thead>
                <tbody>
                    {newTeams}
                </tbody>
            </table>)
    }
}