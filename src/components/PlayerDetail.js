import React, {Component} from 'react'
import {connect} from 'react-redux'
import {displayPlayer, weLoading, bandwagonPlayer, unBandwagonPlayer} from '../redux/actions'
import {withRouter} from 'react-router-dom'
import { Container, Card, Image, Header, Grid } from 'semantic-ui-react'
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Table } from 'semantic-ui-react';
import {LightenDarkenColor as ldc} from '../constants'

class PlayerDetail extends Component {
    componentDidMount() {
        console.log(this.props)
        this.props.timeToLoad()
        const {player_id} = this.props.match.params
        this.props.getDisplayPlayer(player_id)
    }

    renderSeasons = () => {
        const data = this.props.displayPlayer.seasonAverages.map(season => {
            if (season.pts === undefined){
                return (
                    <Table.Row>
                        <Table.Cell>{season}</Table.Cell>
                        <Table.Cell>0</Table.Cell>
                        <Table.Cell>0:00</Table.Cell>
                        <Table.Cell>0.0</Table.Cell>
                        <Table.Cell>0.0</Table.Cell>
                        <Table.Cell>0.0</Table.Cell>
                        <Table.Cell>0.0</Table.Cell>
                        <Table.Cell>0.0</Table.Cell>
                        <Table.Cell>0.0</Table.Cell>
                    </Table.Row>
                )
            }
            return (
                <Table.Row>
                    <Table.Cell>{season.season}</Table.Cell>
                    <Table.Cell>{season.games_played}</Table.Cell>
                    <Table.Cell>{season.min}</Table.Cell>
                    <Table.Cell>{season.pts.toFixed(1)}</Table.Cell>
                    <Table.Cell>{season.reb.toFixed(1)}</Table.Cell>
                    <Table.Cell>{season.ast.toFixed(1)}</Table.Cell>
                    <Table.Cell>{(season.fg_pct * 100).toFixed(1)}</Table.Cell>
                    <Table.Cell>{(season.fg3_pct * 100).toFixed(1)}</Table.Cell>
                    <Table.Cell>{season.turnover.toFixed(1)}</Table.Cell>
                </Table.Row>
            )
        }) 
        return data
    }

    handleClick = () => {
        if(this.props.user === undefined) {
            this.props.history.push("/signin")
        }
        else {
            this.props.doBandwagonPlayer(this.props.user, this.props.displayPlayer)
        }
    }

    handleClickUnlike = () => {
        this.props.undoBandwagonPlayer(this.props.user, this.props.displayPlayer)
    }

    render() {
        console.log(this.props.displayPlayer)
        return (
            <div style={{height: '100%'}}>
                {this.props.displayPlayer === undefined
                ?
                <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-gif-orange-4.gif"/>
                :
                <div style={{height: '50%'}}>
                <Container style={{backgroundColor: `${ldc(this.props.displayPlayer.config.primaryColor, 86)}`, height: '205px',maxWidth: '100%', width: '100%'}}>
                        <div id="player-detail">
                            <div id="player-detail-info">
                                <Grid>
                                    <Grid.Row style={{padding: '0'}}>
                                        <Grid.Column className="three wide column">
                                            <img style={{width: '260px', height: '190px', marginBottom: '10px'}}src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${this.props.displayPlayer.team_ref_id}/2019/260x190/${this.props.displayPlayer.ref_id}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.props.displayPlayer.ref_id}.png`} alt={`${this.props.displayPlayer.first_name} ${this.props.displayPlayer.last_name}`} size="medium"/>
                                        </Grid.Column>
                                        <Grid.Column className="thirteen wide column">
                                            <div style={{textAlign: 'right'}}>
                                                <h1 style={{color: 'black'}}>{this.props.displayPlayer.first_name} {this.props.displayPlayer.last_name}</h1>
                                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                    <Header as='h1'>
                                                        <Header.Content>
                                                            <img onClick={() => this.props.history.push(`/teams/${this.props.displayPlayer.otherInfo.team.abbreviation}/${this.props.displayPlayer.team_ref_id}`)} style={{height: '50px', width: '50px'}}src={process.env.PUBLIC_URL + `/${this.props.displayPlayer.otherInfo.team.abbreviation}.png`}/>
                                                        </Header.Content>
                                                    </Header>
                                                    <h2 style={{color: 'black'}}>{this.props.displayPlayer.team.name}</h2>
                                                </div>
                                                {this.props.user !== undefined
                                                ?
                                                    this.props.user.playerBandwagons.filter(player => player.player_ref_id == this.props.match.params.player_id).length == 0
                                                    ?
                                                    <Fab aria-label="like" onClick={this.handleClick}>
                                                        <FavoriteIcon />
                                                    </Fab>
                                                    :
                                                    <Fab aria-label="like" onClick={this.handleClickUnlike}>
                                                        <FavoriteIcon style={{color: 'red'}} className='material-icons'></FavoriteIcon>
                                                    </Fab>
                                                :
                                                <Fab aria-label="like" onClick={this.handleClick}>
                                                    <FavoriteIcon />
                                                </Fab>
                                                }
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>   
                                </Grid>
                            </div>  
                        </div>
                    </Container>

                    <div style={{height: '100%'}}>
                    <Table basic='very' celled collapsing style={{background: 'rgb(234, 255, 255)', width: '100%', height: '100%'}}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Season</Table.HeaderCell>
                                <Table.HeaderCell>GP</Table.HeaderCell>
                                <Table.HeaderCell>MPG</Table.HeaderCell>
                                <Table.HeaderCell>PPG</Table.HeaderCell>
                                <Table.HeaderCell>RPG</Table.HeaderCell>
                                <Table.HeaderCell>APG</Table.HeaderCell>
                                <Table.HeaderCell>FG%</Table.HeaderCell>
                                <Table.HeaderCell>3PT%</Table.HeaderCell>
                                <Table.HeaderCell>TOPG</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.renderSeasons()}
                            <Table.Row>
                                <Table.Cell>Career</Table.Cell>
                                <Table.Cell>{this.props.displayPlayer.gamesPlayed}</Table.Cell>
                                <Table.Cell>{this.props.displayPlayer.mpg}</Table.Cell>
                                <Table.Cell>{parseFloat(this.props.displayPlayer.pts).toFixed(1)}</Table.Cell>
                                <Table.Cell>{parseFloat(this.props.displayPlayer.reb).toFixed(1)}</Table.Cell>
                                <Table.Cell>{parseFloat(this.props.displayPlayer.ast).toFixed(1)}</Table.Cell>
                                <Table.Cell>{parseFloat(this.props.displayPlayer.fgp).toFixed(1)}</Table.Cell>
                                <Table.Cell>{parseFloat(this.props.displayPlayer.tpp).toFixed(1)}</Table.Cell>
                                <Table.Cell>{parseFloat(this.props.displayPlayer.topg).toFixed(1)}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {displayPlayer: state.displayPlayer, user: state.user}
}

const mapDispatchToProps = dispatch => {
    return {getDisplayPlayer: player_id => dispatch(displayPlayer(player_id)), timeToLoad: () => dispatch(weLoading()), doBandwagonPlayer: (user, player) => dispatch(bandwagonPlayer(user, player)), undoBandwagonPlayer: (user, player) => dispatch(unBandwagonPlayer(user, player))}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayerDetail))