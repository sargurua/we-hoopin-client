import React, {Component, Fragment} from 'react'
import {PROXY_URL} from '../constants'
import {boxscore, previousGame, teamLeadersAway, teamLeadersHome} from '../redux/actions'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import TeamContainer from './TeamContainer'
import TeamLeaders from './TeamLeaders'
import BoxScoreTable from './BoxScoreTable'
import PreviousMatchup from './PreviousMatchup'
import { Box } from '@material-ui/core';
import { Grid } from 'semantic-ui-react';

class BoxScore extends Component {
    componentDidMount() {
        this.props.getBox(this.props.match.params.game_id, this.props.match.params.date)
    }

    callLeaders = () => {
        this.props.callLeadersAway(this.props.boxscore.basicGameData.vTeam)
        this.props.callLeadersHome(this.props.boxscore.basicGameData.hTeam)
    }

    render () {
        if (this.props.boxscore !== undefined && this.props.previousGame === undefined) {
            this.props.callPreviousGame(this.props.boxscore.previousMatchup.gameId, this.props.boxscore.previousMatchup.gameDate)
        }
        return (
            <div>
                {this.props.boxscore === undefined || this.props.previousGame === undefined
                ?
                <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-gif-orange-4.gif"/>
                :
                <div>
                   <div>
                       <TeamContainer teams={this.props.boxscore.basicGameData}/>
                   </div>
                   <div style={{width: '100%'}}>
                       {this.props.boxscore.stats !== undefined
                       ?
                       <>    
                       <BoxScoreTable team={this.props.boxscore.basicGameData.vTeam} players={this.props.boxscore.stats.activePlayers.filter(player => player.teamId == this.props.boxscore.basicGameData.vTeam.teamId)} />
                       <BoxScoreTable team={this.props.boxscore.basicGameData.hTeam} players={this.props.boxscore.stats.activePlayers.filter(player => player.teamId == this.props.boxscore.basicGameData.hTeam.teamId)} />
                       </>
                       :
                        <>
                        {this.props.leadersAway === undefined || this.props.leadersHome === undefined
                        ?
                        this.callLeaders()
                        :
                        <>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column style={{width: '35%', marginLeft: '9.5%'}}>
                                        <TeamLeaders leaders={this.props.leadersAway} />
                                    </Grid.Column>
                                    <Grid.Column style={{width: '35%', marginLeft: '16%'}}>
                                        <TeamLeaders leaders={this.props.leadersHome} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </>}
                        </>
                    }

                   </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        boxscore: state.boxscore,
        previousGame: state.previousGame,
        leadersHome: state.leadersHome,
        leadersAway: state.leadersAway
    }
}

const mapDispatchToProps = dispatch => {
    return {getBox: (game, date) => dispatch(boxscore(game, date)), callPreviousGame: (gameId, date) => dispatch(previousGame(gameId, date)), callLeadersHome: team => dispatch(teamLeadersHome(team)), callLeadersAway: team => dispatch(teamLeadersAway(team))}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BoxScore))