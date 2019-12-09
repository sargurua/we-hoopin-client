import React from 'react'
import {Grid, Image, Table, Header} from 'semantic-ui-react'

const TeamContainer = (props) => {
    const suffixes = ['','st','nd','rd','th','th','th','th','th','th','th','th','th'];
    return (
        <div>
            <Grid style={{width: '100%'}} columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <a href={`/teams/${props.teams.vTeam.triCode}/${props.teams.vTeam.teamId}`}><Image style={{display: 'block', margin: 'auto', width: '200px', height: '200px'}} rounded src={process.env.PUBLIC_URL + `/${props.teams.vTeam.triCode}.png`} /></a>
                    </Grid.Column>
                    <Grid.Column >
                        <div style={{width: '200px', height: '200px', display: 'flex', justifyContent: 'center', margin: 'auto', verticalAlign: 'center'}}>
                            {props.teams.isGameActivated
                            ?
                                <div style={{alignSelf: 'center', paddingTop: '130px'}}>
                                    <h1 style={{textAlign: 'center', verticalAlign: 'center', color: 'red'}}>{props.teams.clock}</h1>
                                    <h2 style={{textAlign: 'center', verticalAlign: 'center', color: 'red'}}>{props.teams.period.current}{suffixes[parseInt(props.teams.period.current)]}</h2>
                                    {props.teams.vTeam.linescore
                                    ?
                                    <Table basic='very' celled collapsing style={{width: '600px'}}>
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
                                                <Table.Cell><Header><img style={{width: '40px', height: '40px'}} src={process.env.PUBLIC_URL + `/${props.teams.vTeam.triCode}.png`}/> {props.teams.vTeam.triCode}</Header></Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.vTeam.linescore[0].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.vTeam.linescore[1].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.vTeam.linescore[2].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.vTeam.linescore[3].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.vTeam.score}</Table.Cell>
                                            </Table.Row>

                                            <Table.Row>
                                                <Table.Cell><Header><img style={{width: '40px', height: '40px'}} src={process.env.PUBLIC_URL + `/${props.teams.hTeam.triCode}.png`}/> {props.teams.hTeam.triCode}</Header></Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.hTeam.linescore[0].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.hTeam.linescore[1].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.hTeam.linescore[2].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.hTeam.linescore[3].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.hTeam.score}</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>

                                        <Table.Body>

                                        </Table.Body>
                                    </Table>
                                    :
                                    null
                                    }
                                </div>
                            :
                            
                                props.teams.isRecapArticleAvail
                                ?
                                    <>
                                    <div style={{alignSelf: 'center', paddingTop: '130px'}}>
                                    <h1 style={{textAlign: 'center', verticalAlign: 'center', color: 'red'}}>Final</h1>
                                    {props.teams.vTeam.linescore
                                    ?
                                    <Table basic='very' celled collapsing style={{width: '600px'}}>
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
                                                <Table.Cell><Header><img style={{width: '40px', height: '40px'}} src={process.env.PUBLIC_URL + `/${props.teams.vTeam.triCode}.png`}/> {props.teams.vTeam.triCode}</Header></Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.vTeam.linescore[0].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.vTeam.linescore[1].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.vTeam.linescore[2].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.vTeam.linescore[3].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.vTeam.score}</Table.Cell>
                                            </Table.Row>

                                            <Table.Row>
                                                <Table.Cell><Header><img style={{width: '40px', height: '40px'}} src={process.env.PUBLIC_URL + `/${props.teams.hTeam.triCode}.png`}/> {props.teams.hTeam.triCode}</Header></Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.hTeam.linescore[0].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.hTeam.linescore[1].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.hTeam.linescore[2].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.hTeam.linescore[3].score}</Table.Cell>
                                                <Table.Cell style={{fontSize: '18px'}}>{props.teams.hTeam.score}</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>

                                        <Table.Body>

                                        </Table.Body>
                                    </Table>
                                    :
                                    null
                                    }
                                    </div>
                                    </>
                                :
                                    <h2 style={{textAlign: 'center', alignSelf: 'center'}}>{props.teams.startTimeEastern}</h2>
                            }
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <a href={`/teams/${props.teams.hTeam.triCode}/${props.teams.vTeam.teamId}`}><Image style={{display: 'block', margin: 'auto', width: '200px', height: '200px'}} rounded src={process.env.PUBLIC_URL + `/${props.teams.hTeam.triCode}.png`} /></a>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <h3 style={{textAlign: 'center'}}>({props.teams.vTeam.win} - {props.teams.vTeam.loss})</h3>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                    <h3 style={{textAlign: 'center'}}>({props.teams.hTeam.win} - {props.teams.hTeam.loss})</h3>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <h1 style={{textAlign: 'center'}}>{props.teams.vTeam.score}</h1>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                        <h1 style={{textAlign: 'center'}}>{props.teams.hTeam.score}</h1>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default TeamContainer