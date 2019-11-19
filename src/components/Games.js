import React, {Component} from 'react'
import {PROXY_URL} from '../constants'

class Games extends Component {
    state = {
        games: [],
        date: '',
        months: [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ]
    }

    componentDidMount() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const currentDate = `${yyyy}${mm}${dd}`
        fetch(PROXY_URL + `http://data.nba.net/data/10s/prod/v1/${currentDate}/scoreboard.json`)
        .then(resp => resp.json())
        .then(json => {
            console.log(json.games)
            this.setState({
                games: json.games,
                date: currentDate
            })
        })
    }

    renderDateForm = () => {
        return (
            <form>
               <input onChange={this.handleChange} type="date"></input> 
            </form>
        )
    }

    renderGames = () => {
        const cards = this.state.games.map(game => {
            return(
                <div class="card">
                    <div class="content">
                        <div class="header">{game.vTeam.triCode} ({game.vTeam.win} - {game.vTeam.loss}) @ {game.hTeam.triCode} ({game.hTeam.win} - {game.hTeam.loss})</div>
                        <div class="meta">Friend</div>
                        <div class="description">
                            Elliot Fu is a film-maker from New York.
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="ui center cards" id="games"> 
                {cards}
            </div>
        )
    }

    render() {
        return(
            <div>
                {this.state.games.length === 0
                ?
                <h2>Loading.......</h2>
                :
                <div>
                    <h1>Games for {this.state.months[this.state.date.slice(4, 6) - 1]} {this.state.date.slice(6, 8)}, {this.state.date.slice(0, 4)}</h1>
                    {this.renderDateForm()}
                    {this.renderGames()}
                </div>
                }
            </div>
        )
    }
}

export default Games