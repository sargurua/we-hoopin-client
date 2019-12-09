import React, {Component} from 'react'
import {homeDisplay} from "../redux/actions"
import redux from 'redux'
import { connect } from 'react-redux';
import {Card, Image, GridColumn} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {Grid, Table, Header} from 'semantic-ui-react'

class GeneralHomePage extends Component {
    
    handlePlayerClick = player => {
        this.props.history.push(`players/${player.ref_id}`)
    }

    componentDidMount() {
        this.props.getHomeDisplay()
    }

    renderTopPerformers = () => {
        const players = this.props.homeDisplay.topPerformances.map(player => {
            return (
                    <Card style={{width: 'auto', background: '#eaffff'}} onClick={() => this.handlePlayerClick(player)}>
                        <div style={{display: 'flex'}}>
                            <img style={{height: 'auto', width: '190px'}} src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.team_ref_id}/2019/260x190/${player.ref_id}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.ref_id}.png`} alt={`${player.player.first_name} ${player.player.last_name}`}/>
                            <div style={{float: 'left', textAlign: 'right', width: '100%', marginRight: '40px'}}>
                                <Card.Header style={{fontSize: '30px', textAlign: 'center'}}> {player.player.first_name} {player.player.last_name} </Card.Header>
                                <Table basic='very' celled collapsing style={{margin: '5px auto 0'}}>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell >Points</Table.HeaderCell>
                                            <Table.HeaderCell >Rebounds</Table.HeaderCell>
                                            <Table.HeaderCell >Assists</Table.HeaderCell>
                                            <Table.HeaderCell >Steals</Table.HeaderCell>
                                            <Table.HeaderCell >Blocks</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell style={{fontSize: '18px'}}>{player.pts}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{player.reb}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{player.ast}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{player.stl}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{player.blk}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    </Card>
            )
        })

        return (
            <div className="general-top-performers">
                <h1 style={{textDecoration: 'underline'}}>Yesterdays Top Performers</h1>
                {players.length == 0
                ?
                <h1>No games yesterday</h1>
                :
                players
                }
            </div>
        )
    }

    renderGames = () => {
        const games = this.props.homeDisplay.games.map(game => {
            return (
                <Card style={{width: '100%', background: '#cec1e7', margin: '0', marginTop: '9px'}} onClick={() => {this.props.history.push(`/games/${game.startDateEastern}/${game.gameId}`)}}>
                    <Grid style={{width: '95%', alignSelf: 'center'}}>
                        <Grid.Row style={{padding: '0', marginTop: '12px', fontWeight: 'bold'}}>
                            {!game.isGameActivated && game.period.current >= 4
                            ?
                            <Grid.Column>
                                <div class="meta" style={{color: "red", fontSize: '20px'}}>Final</div>
                            </Grid.Column>
                            :
                            <Grid.Column>
                                <div class="meta" style={{color: "red"}}>{game.period.current + this.suffixes[parseInt(game.period.current)]} {game.clock == "" ? "0:00" : game.clock}</div>
                            </Grid.Column>
                            }       
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Table basic='very' celled collapsing style={{width: '100%'}}>
                                    <Table.Header>
                                        <Table.HeaderCell style={{fontSize: '20px'}}>Team</Table.HeaderCell>
                                        <Table.HeaderCell style={{fontSize: '20px'}}>1</Table.HeaderCell>
                                        <Table.HeaderCell style={{fontSize: '20px'}}>2</Table.HeaderCell>
                                        <Table.HeaderCell style={{fontSize: '20px'}}>3</Table.HeaderCell>
                                        <Table.HeaderCell style={{fontSize: '20px'}}>4</Table.HeaderCell>
                                        <Table.HeaderCell style={{fontSize: '20px'}}>T</Table.HeaderCell>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell><Header><img style={{width: '40px', height: '40px'}} src={process.env.PUBLIC_URL + `/${game.vTeam.triCode}.png`}/> {game.vTeam.triCode}</Header></Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{game.vTeam.linescore[0].score}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{game.vTeam.linescore[1].score}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{game.vTeam.linescore[2].score}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{game.vTeam.linescore[3].score}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{game.vTeam.score}</Table.Cell>
                                        </Table.Row>

                                        <Table.Row>
                                            <Table.Cell><Header><img style={{width: '40px', height: '40px'}} src={process.env.PUBLIC_URL + `/${game.hTeam.triCode}.png`}/> {game.hTeam.triCode}</Header></Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{game.hTeam.linescore[0].score}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{game.hTeam.linescore[1].score}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{game.hTeam.linescore[2].score}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{game.hTeam.linescore[3].score}</Table.Cell>
                                            <Table.Cell style={{fontSize: '18px'}}>{game.hTeam.score}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>

                                    <Table.Body>

                                    </Table.Body>
                                </Table>

                                
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <div style={{fontWeight: 'bold', marginBottom: '5px'}}>{game.nugget.text}</div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {/* <div class="content">
                        <div class="header">{game.vTeam.triCode} ({game.vTeam.win} - {game.vTeam.loss}) @ {game.vTeam.score}</div>
                        <div class='header'>{game.hTeam.triCode} ({game.hTeam.win} - {game.hTeam.loss}) {game.hTeam.score}</div>
                        {!game.isGameActivated && game.period.current >= 4
                        ?
                        <div class="meta" style={{color: "red"}}>Final</div>
                        :
                        <div class="meta" style={{color: "red"}}>{game.period.current + this.suffixes[parseInt(game.period.current)]} {game.clock == "" ? "0:00" : game.clock}</div>
                        }        
                    </div> */}
                </Card>
            )
        })

        return (
            <div style={{marginTop: '0px'}} className="ui cards general-yesterdays-games">
                <h1 style={{width: '100%', textDecoration: 'underline'}}>Yesterdays Games</h1>
                {games.length == 0
                ?
                <h1>No games yesterday</h1>
                :
                games
                }
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.homeDisplay === undefined
                ?
                <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-gif-orange-4.gif"/>
                :
                <Grid style={{width: '100%', height: '100%'}}>
                    <Grid.Row>
                        <Grid.Column style={{width: '50%'}}>
                            {this.renderTopPerformers()}
                        </Grid.Column>
                        <Grid.Column style={{width: '50%'}}>
                            {this.renderGames()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                // <div className="general-home-display">
                //     {this.renderTopPerformers()}
                //     {this.renderGames()}
                // </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {homeDisplay: state.homeDisplay, user: state.user}
}

const mapDispatchToProps = dispatch => {
    return {getHomeDisplay: () => dispatch(homeDisplay())}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GeneralHomePage))