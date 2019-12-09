import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTeams, displayTeam, teamLeaders} from '../redux/actions'
import TeamLeaders from '../components/TeamLeaders'
import {Image, Container, Grid, Table, Card} from 'semantic-ui-react'
import {LightenDarkenColor as ldc, suffix} from '../constants'


class TeamDetail extends Component {

    suffixes = ['','st','nd','rd','th','th','th','th','th','th','th','th','th'];


    componentDidMount(){
        this.props.callSetTeams()
    }

    handlePlayerClick = player => {
        this.props.history.push(`/players/${player.ref_id}`)
    }

    renderPlayers = () => {
        return this.props.displayTeam.players.map(player => {
            return (
                <Card style={{width: 'auto', background: '#eaffff'}} onClick={() => this.handlePlayerClick(player)}>
                <div style={{display: 'flex'}}>
                    <img style={{height: 'auto', width: '190px'}} src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.team_ref_id}/2019/260x190/${player.ref_id}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.ref_id}.png`} alt={`${player.first_name} ${player.last_name}`}/>
                    <div style={{float: 'left', textAlign: 'right', width: '100%', marginRight: '40px'}}>
                        <Card.Header style={{fontSize: '30px', textAlign: 'center'}}> {player.first_name} {player.last_name} </Card.Header>
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
    }

    renderTeam = () => {
        return (
            <div>
                <Container style={{backgroundColor: '#cec1e7', width: '100%', maxWidth: '100%'}}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img style={{height: '250px', width: 'auto', marginRight: '400px'}} src={process.env.PUBLIC_URL + `/${this.props.displayTeam.abbreviation}.png`}/>
                        <div style={{alignSelf: 'center'}}>
                            <h1>{this.props.displayTeam.name} {this.props.displayTeam.nickname}</h1>
                            <p style={{fontSize: '20px'}}>({this.props.displayTeam.info.win}-{this.props.displayTeam.info.loss})</p>
                            <h3>Projected Wins</h3>
                            <div style={{display: 'flex'}}>
                                <div>
                                    <h4 style={{textDecoration: 'underline', marginRight: '15px'}}>Win Pct</h4>
                                    <p>{this.props.displayTeam.pctExpectation}</p>
                                </div>

                                <div>
                                    <a target='_blank' href='https://en.wikipedia.org/wiki/Pythagorean_expectation'><h4 style={{textDecoration: 'underline', marginBottom: '7px'}}>Morey Method</h4></a>
                                    <p>{this.props.displayTeam.expectation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table basic='very' celled collapsing style={{marginTop: '20px', width: '100%'}}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>POINTS</Table.HeaderCell>
                                <Table.HeaderCell>OPPONENT POINTS</Table.HeaderCell>
                                <Table.HeaderCell>ASSISTS</Table.HeaderCell>
                                <Table.HeaderCell>REBOUNDS</Table.HeaderCell>
                                <Table.HeaderCell>TURNOVERS</Table.HeaderCell>
                                <Table.HeaderCell>FIELD GOAL %</Table.HeaderCell>
                                <Table.HeaderCell>3PT %</Table.HeaderCell>
                                <Table.HeaderCell>STEALS</Table.HeaderCell>
                                <Table.HeaderCell>BLOCKS</Table.HeaderCell>
                                <Table.HeaderCell>+/-</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{this.props.displayTeam.ppg.avg}</h1>
                                        <p>{this.props.displayTeam.ppg.rank + suffix(parseInt(this.props.displayTeam.ppg.rank))}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{this.props.displayTeam.oppg.avg}</h1>
                                        <p>{this.props.displayTeam.oppg.rank + suffix(parseInt(this.props.displayTeam.oppg.rank))}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{this.props.displayTeam.apg.avg}</h1>
                                        <p>{this.props.displayTeam.apg.rank + suffix(parseInt(this.props.displayTeam.apg.rank))}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{this.props.displayTeam.trpg.avg}</h1>
                                        <p>{this.props.displayTeam.trpg.rank + suffix(parseInt(this.props.displayTeam.trpg.rank))}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{this.props.displayTeam.tpg.avg}</h1>
                                        <p>{this.props.displayTeam.tpg.rank + suffix(parseInt(this.props.displayTeam.tpg.rank))}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{parseFloat(this.props.displayTeam.fgp.avg) * 100}%</h1>
                                        <p>{this.props.displayTeam.fgp.rank + suffix(parseInt(this.props.displayTeam.fgp.rank))}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{parseFloat(this.props.displayTeam.tpp.avg) * 100.0}%</h1>
                                        <p>{this.props.displayTeam.tpp.rank + suffix(parseInt(this.props.displayTeam.tpp.rank))}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{this.props.displayTeam.spg.avg}</h1>
                                        <p>{this.props.displayTeam.spg.rank + suffix(parseInt(this.props.displayTeam.spg.rank))}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{this.props.displayTeam.bpg.avg}</h1>
                                        <p>{this.props.displayTeam.bpg.rank + suffix(parseInt(this.props.displayTeam.bpg.rank))}</p>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div style={{textAlign: 'center'}}>
                                        <h1>{this.props.displayTeam.eff.avg}</h1>
                                        <p>{this.props.displayTeam.eff.rank + suffix(parseInt(this.props.displayTeam.eff.rank))}</p>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Container>
            </div>
        )
    }
        
    findTeam = () => {
        const foundTeam = this.props.teams.find(team => team.teamId === this.props.match.params.teamId)
        console.log(foundTeam)
        this.props.getDisplayTeam(foundTeam)
        this.props.callLeaders(foundTeam)
    }

    render() {
        return (
            <div>
                {this.props.teams === undefined
                ?
                <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-gif-orange-4.gif"/>
                :
                
                    this.props.displayTeam === undefined || this.props.leaders === undefined
                    ?
                    <>
                        <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-gif-orange-4.gif"/>
                        {this.props.displayTeam === undefined
                        ?
                        this.findTeam()
                        :
                        null
                        }
                    </>
                    :
                    <>
                    {this.renderTeam()}
                    <Grid style={{marginTop: '5px', marginLeft: '10px'}}>
                        <Grid.Row>
                            <Grid.Column style={{width: '50%'}}>
                                <h1 style={{textDecoration: 'underline'}}>Players</h1>
                                {this.renderPlayers()}
                            </Grid.Column>

                            <Grid.Column style={{width: '50%'}}>
                                <TeamLeaders history={this.props.history} leaders={this.props.leaders}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    </>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {teams: state.teams, displayTeam: state.displayTeam, leaders: state.leaders}
}

const mapDispatchToProps = dispatch => {
    return {callSetTeams: () => dispatch(fetchTeams()), getDisplayTeam: (team) => dispatch(displayTeam(team)), callLeaders: (team) => dispatch(teamLeaders(team))}
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail)