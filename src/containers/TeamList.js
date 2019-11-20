import React, {Component} from 'react'
import TeamCard from "../components/TeamCard"
import redux from 'redux'
import { connect } from 'react-redux';
import { setTeams, fetchTeams } from '../redux/actions'

class TeamList extends Component {
    componentDidMount() {
        this.props.callSetTeams()
    }

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

const mapStateToProps = state => {
    return {teams: state.teams}
}

const mapDispatchToProps = dispatch => {
    return {callSetTeams: () => dispatch(fetchTeams())}
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)