import React from 'react'
import {withRouter} from 'react-router-dom'
import {Card, Grid} from 'semantic-ui-react'

const TeamLeaders = props => {

        console.log(props.leaders.ppg.player.first_name)

        const handlePlayerClick = player => {
            props.history.push(`/players/${player.ref_id}`)
        }

        return (
                <Grid style={{width: '97%'}}>
                    <Grid.Row>
                        <Grid.Column style={{width: '100%'}}>
                            <div>
                                <h1 style={{textDecoration: 'underline'}}>Team Leaders</h1>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card style={{background: 'rgb(234, 255, 255)' ,width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}} onClick={() => handlePlayerClick(props.leaders.ppg.player)}>
                                <Card.Header style={{fontSize: '45px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline'}}>Points</Card.Header>
                                <img style={{backgroundColor: '#F5F5F5', borderRadius: '50%', height: '190px', width: '220px', alignText: 'center'}} src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${props.leaders.ppg.player.team_ref_id}/2019/260x190/${props.leaders.ppg.player.ref_id}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${props.leaders.ppg.player.ref_id}.png`} alt={`${props.leaders.ppg.player.first_name} ${props.leaders.ppg.player.last_name}`} />
                                <p style={{fontSize: '25px'}}>{props.leaders.ppg.player.first_name} {props.leaders.ppg.player.last_name}</p>
                                <p style={{fontSize: '45px'}}>{props.leaders.ppg.value}</p>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card style={{background: 'rgb(234, 255, 255)' ,width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}} onClick={() => handlePlayerClick(props.leaders.trpg.player)}>
                                <Card.Header style={{fontSize: '45px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline'}}>Rebounds</Card.Header>
                                <img style={{backgroundColor: '#F5F5F5', borderRadius: '50%', height: '190px', width: '220px', alignText: 'center'}} src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${props.leaders.trpg.player.team_ref_id}/2019/260x190/${props.leaders.trpg.player.ref_id}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${props.leaders.trpg.player.ref_id}.png`} alt={`${props.leaders.trpg.player.first_name} ${props.leaders.trpg.player.last_name}`} />
                                <p style={{fontSize: '25px'}}>{props.leaders.trpg.player.first_name} {props.leaders.trpg.player.last_name}</p>
                                <p style={{fontSize: '45px'}}>{props.leaders.trpg.value}</p>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card style={{background: 'rgb(234, 255, 255)' ,width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}} onClick={() => handlePlayerClick(props.leaders.apg.player)}>
                                <Card.Header style={{fontSize: '45px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline'}}>Assists</Card.Header>
                                <img style={{backgroundColor: '#F5F5F5', borderRadius: '50%', height: '190px', width: '220px', alignText: 'center'}} src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${props.leaders.apg.player.team_ref_id}/2019/260x190/${props.leaders.apg.player.ref_id}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${props.leaders.apg.player.ref_id}.png`} alt={`${props.leaders.apg.player.first_name} ${props.leaders.apg.player.last_name}`} />
                                <p style={{fontSize: '25px'}}>{props.leaders.apg.player.first_name} {props.leaders.apg.player.last_name}</p>
                                <p style={{fontSize: '45px'}}>{props.leaders.apg.value}</p>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card style={{background: 'rgb(234, 255, 255)' ,width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}} onClick={() => handlePlayerClick(props.leaders.spg.player)}>
                                <Card.Header style={{fontSize: '45px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline'}}>Steals</Card.Header>
                                <img style={{backgroundColor: '#F5F5F5', borderRadius: '50%', height: '190px', width: '220px', alignText: 'center'}} src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${props.leaders.spg.player.team_ref_id}/2019/260x190/${props.leaders.spg.player.ref_id}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${props.leaders.spg.player.ref_id}.png`} alt={`${props.leaders.spg.player.first_name} ${props.leaders.spg.player.last_name}`} />
                                <p style={{fontSize: '25px'}}>{props.leaders.spg.player.first_name} {props.leaders.spg.player.last_name}</p>
                                <p style={{fontSize: '45px'}}>{props.leaders.spg.value}</p>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card style={{background: 'rgb(234, 255, 255)' ,width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}} onClick={() => handlePlayerClick(props.leaders.bpg.player)}>
                                <Card.Header style={{fontSize: '45px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline'}}>Blocks</Card.Header>
                                <img style={{backgroundColor: '#F5F5F5', borderRadius: '50%', height: '190px', width: '220px', alignText: 'center'}} src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${props.leaders.bpg.player.team_ref_id}/2019/260x190/${props.leaders.bpg.player.ref_id}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${props.leaders.bpg.player.ref_id}.png`} alt={`${props.leaders.bpg.player.first_name} ${props.leaders.bpg.player.last_name}`} />
                                <p style={{fontSize: '25px'}}>{props.leaders.bpg.player.first_name} {props.leaders.bpg.player.last_name}</p>
                                <p style={{fontSize: '45px'}}>{props.leaders.bpg.value}</p>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
        )
}



export default withRouter(TeamLeaders)