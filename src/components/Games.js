import React, {Component} from 'react'
import {PROXY_URL} from '../constants'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {getTodaysGames, weLoading} from '../redux/actions'
import BestPerformances from './BestPerformances'

class Games extends Component {
    state = {
        games: [],
        date: '',
        loading: true
    }
    suffixes = ['','st','nd','rd','th','th','th','th','th','th','th','th','th'];

    months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ]

    componentDidMount() {
        this.props.timeToLoad()

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
                game.vTeam.score
                    ?
                    <div style={{backgroundColor: 'rgb(234, 255, 255)', width: '400px'}} class="card" onClick={() => this.props.history.push(`/games/${this.props.date}/${game.gameId}`)}>
                        <div class="content">
                        <div class="header">{game.vTeam.triCode} ({game.vTeam.win} - {game.vTeam.loss}) {game.vTeam.score}</div>
                            <div class='header'>{game.hTeam.triCode} ({game.hTeam.win} - {game.hTeam.loss}) {game.hTeam.score}</div>
                            {!game.isGameActivated && game.period.current >= 4
                            ?
                            <div class="meta" style={{color: "red"}}>Final</div>
                            :
                            <div class="meta" style={{color: "red"}}>{game.period.current + this.suffixes[parseInt(game.period.current)]} {game.clock == "" ? "0:00" : game.clock}</div>
                            }        
                        </div>
                    </div>
                    :
                    <div style={{backgroundColor: 'rgb(234, 255, 255)', width: '400px'}} class="card" onClick={() => this.props.history.push(`/games/${this.props.date}/${game.gameId}`)}>
                        <div class="content">
                            <div class="header">{game.vTeam.triCode} ({game.vTeam.win} - {game.vTeam.loss})</div>
                            <div class='header'>{game.hTeam.triCode} ({game.hTeam.win} - {game.hTeam.loss})</div>
                            <div class="meta">{game.startTimeEastern}</div>
                        </div>
                    </div>
            )
        })

        return (
            <div>
                <div className="ui center cards" id="games"> 
                    {cards}
                </div>
                {
                }
            </div>
        )
    }

    render() {
        return(
            <div>
                {this.props.games == undefined || this.props.date == undefined
                ?
                <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-gif-orange-4.gif"/>
                :
                    (this.props.games === undefined)
                    ?
                    <div>
                        {this.props.date !== undefined
                        ?
                        <div>
                            <h1 style={{textDecoration: 'underline'}}>Games for {this.months[this.props.date.slice(4, 6) - 1]} {this.props.date.slice(6, 8)}, {this.props.date.slice(0, 4)}</h1>
                            <div>
                            { this.renderDateForm()}
                            </div>
                            <h1>No games on this date</h1>
                        </div>
                        :
                        null
                        }

                    </div>
                    :
                    <div>
                        <h1 style={{textDecoration: 'underline'}}>Games for {this.months[this.props.date.slice(4, 6) - 1]} {this.props.date.slice(6, 8)}, {this.props.date.slice(0, 4)}</h1>
                        {this.renderDateForm()}
                        {this.props.games == null
                        ?
                        <h1>No games on this date</h1>
                        :
                        <div style={{display: 'flex'}}>
                            {this.renderGames()}
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Games))