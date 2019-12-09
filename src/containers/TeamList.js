import React, {Component} from 'react'
import TeamCard from "../components/TeamCard"
import redux from 'redux'
import { connect } from 'react-redux';
import { setTeams, fetchTeams, weLoading } from '../redux/actions'
import {Table} from 'semantic-ui-react'

class TeamList extends Component {
    componentDidMount() {
        this.props.timeToLoad()
        this.props.callSetTeams()
    }

    renderTeams = () => {
        return this.props.teams.map((team, indx) => <TeamCard key={indx} team={team}/>)

    }

    render(){
        console.log(this.props.loading)
        return(
            <div>
            {this.props.teams === undefined
            ?
            <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-gif-orange-4.gif"/>
            :
            <Table style={{background: 'rgb(234, 255, 255)', width: '100%', margin: `10px 5px 10px 5px`}} basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Record</Table.HeaderCell>
                        <Table.HeaderCell>Last 10</Table.HeaderCell>
                        <Table.HeaderCell>Streak</Table.HeaderCell>
                        <Table.HeaderCell>Projected Record</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>


                <Table.Body>
                    {this.renderTeams()}
                </Table.Body>
            </Table>
            }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {teams: state.teams, loading: state.loading}
}

const mapDispatchToProps = dispatch => {
    return {callSetTeams: () => dispatch(fetchTeams()), timeToLoad: () => dispatch(weLoading())}
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)