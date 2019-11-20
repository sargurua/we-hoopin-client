import React, {Component} from 'react'
import {PROXY_URL} from '../constants'
import {connect} from 'react-redux';
import {getTodaysGames, weLoading} from '../redux/actions'

class Games extends Component {
    state = {
        games: [],
        date: '',
        loading: true
    }

    months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ]

    componentDidMount() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const currentDate = `${yyyy}${mm}${dd}`

        this.props.callGetGames(currentDate)
    }

    changeGames = (date) => {
        this.setState({
            loading: true
        })
        fetch(PROXY_URL + `http://data.nba.net/data/10s/prod/v1/${date}/scoreboard.json`)
        .then(resp => resp.json())
        .then(json => {
            let newGames = null
            if(json.games !== []){
                newGames = json.games
            }
            console.log(json.games)
            this.setState({
                games: newGames,
                date: date,
                loading: false
            })
        })
        .catch(err => this.setState({
            games: null,
            date: date,
            loading: false
        }))
    }

    renderDateForm = () => {
        return (
            <form>
               <input onChange={this.handleChange} type="date"></input> 
            </form>
        )
    }
    
    handleChange = (event) => {
        this.props.timeToLoad()
        this.props.callGetGames(event.target.value.split('-').join(''))
    }

    renderGames = () => {
        const cards = this.props.games.map(game => {
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
                {this.props.loading
                ?
                <h1>Loading........</h1>
                :
                    this.props.games === undefined
                    ?
                    <div>
                        <h1>Games for {this.months[this.props.date.slice(4, 6) - 1]} {this.props.date.slice(6, 8)}, {this.props.date.slice(0, 4)}</h1>
                        {this.renderDateForm()}
                        <h1>No games on this date</h1>
                    </div>
                    :
                    <div>
                        <h1>Games for {this.months[this.props.date.slice(4, 6) - 1]} {this.props.date.slice(6, 8)}, {this.props.date.slice(0, 4)}</h1>
                        {this.renderDateForm()}
                        {this.props.games == null
                        ?
                        <h1>No games on this date</h1>
                        :
                        this.renderGames()
                        }              
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        games: state.games,
        date: state.date
    }
}

const mapDispatchToProps = dispatch => {
    return {callGetGames: (date) => dispatch(getTodaysGames(date)), timeToLoad: () => dispatch(weLoading())}
}

export default connect(mapStateToProps, mapDispatchToProps)(Games)