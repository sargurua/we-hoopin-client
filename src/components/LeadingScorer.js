import React, {Component} from 'react'

export default class LeadingScorer extends Component {
    componentDidMount(){
        const teamName = this.props.teamName.toLowerCase()
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `http://data.nba.net/data/10s/prod/v1/2019/teams/${teamName}/leaders.json`
    }
    
    render() {
        return (<td>

        </td>)
    }
}