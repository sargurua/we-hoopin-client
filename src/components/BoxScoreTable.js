import React from 'react'
import {Table, Header, Image} from 'semantic-ui-react'

const BoxScoreTable = (props) => {
    const OffCourtPlayers = props.players.filter(player => !player.isOnCourt)
    
    const renderOnCourtPlayers = () => {
        const onCourtPlayers = props.players.filter(player => player.isOnCourt)

        return onCourtPlayers.map(player => {
            return (
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.teamId}/2019/260x190/${player.personId}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`} alt={`${player.firstName} ${player.lastName}`}/>
                            <Header.Content>
                                <a href={`/players/${player.personId}`}>{player.firstName} {player.lastName}</a>
                                <Header.Subheader>{player.pos}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{player.min}</Table.Cell>
                    <Table.Cell>{player.points}</Table.Cell>
                    <Table.Cell>{player.fgm}-{player.fga}</Table.Cell>
                    <Table.Cell>{player.tpm}-{player.tpa}</Table.Cell>
                    <Table.Cell>{player.ftm}-{player.fta}</Table.Cell>
                    <Table.Cell>{player.offReb}</Table.Cell>
                    <Table.Cell>{player.defReb}</Table.Cell>
                    <Table.Cell>{player.totReb}</Table.Cell>
                    <Table.Cell>{player.assists}</Table.Cell>
                    <Table.Cell>{player.steals}</Table.Cell>
                    <Table.Cell>{player.blocks}</Table.Cell>
                    <Table.Cell>{player.turnovers}</Table.Cell>
                    <Table.Cell>{player.pFouls}</Table.Cell>
                    <Table.Cell>{player.plusMinus}</Table.Cell>
                </Table.Row>
            )
        })
    }

    const renderOffCourtPlayers = () => {
        const offCourtPlayers = props.players.filter(player => !player.isOnCourt)

        return offCourtPlayers.map(player => {
            return (
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.teamId}/2019/260x190/${player.personId}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`} alt={`${player.firstName} ${player.lastName}`}/>
                            <Header.Content>
                                <a href={`/players/${player.personId}`}>{player.firstName} {player.lastName}</a>
                                <Header.Subheader>{player.pos}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{player.min}</Table.Cell>
                    <Table.Cell>{player.points}</Table.Cell>
                    <Table.Cell>{player.fgm}-{player.fga}</Table.Cell>
                    <Table.Cell>{player.tpm}-{player.tpa}</Table.Cell>
                    <Table.Cell>{player.ftm}-{player.fta}</Table.Cell>
                    <Table.Cell>{player.offReb}</Table.Cell>
                    <Table.Cell>{player.defReb}</Table.Cell>
                    <Table.Cell>{player.totReb}</Table.Cell>
                    <Table.Cell>{player.assists}</Table.Cell>
                    <Table.Cell>{player.steals}</Table.Cell>
                    <Table.Cell>{player.blocks}</Table.Cell>
                    <Table.Cell>{player.turnovers}</Table.Cell>
                    <Table.Cell>{player.pFouls}</Table.Cell>
                    <Table.Cell>{player.plusMinus}</Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <div style={{width: '100%'}}>
            <Table style={{background: 'rgb(234, 255, 255)', width: '100%', margin: `10px 5px 10px 5px`}} basic='very' celled collapsing>
                <Table.Header style={{marginLeft: '10px'}}>
                    <Table.Row>
                        <h1 style={{fontSize: '25px', textDecoration: 'underline', fontWeight: 'bold', margin: '15px'}}>{props.team.triCode}</h1>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>ON COURT</Table.HeaderCell>
                        <Table.HeaderCell>MIN</Table.HeaderCell>
                        <Table.HeaderCell>PTS</Table.HeaderCell>
                        <Table.HeaderCell>FG</Table.HeaderCell>
                        <Table.HeaderCell>3PT</Table.HeaderCell>
                        <Table.HeaderCell>FT</Table.HeaderCell>
                        <Table.HeaderCell>ORB</Table.HeaderCell>
                        <Table.HeaderCell>DRB</Table.HeaderCell>
                        <Table.HeaderCell>REB</Table.HeaderCell>
                        <Table.HeaderCell>AST</Table.HeaderCell>
                        <Table.HeaderCell>STL</Table.HeaderCell>
                        <Table.HeaderCell>BLK</Table.HeaderCell>
                        <Table.HeaderCell>TO</Table.HeaderCell>
                        <Table.HeaderCell>PF</Table.HeaderCell>
                        <Table.HeaderCell>+/-</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body style={{marginLeft: '10px'}}>
                    {renderOnCourtPlayers()}
                </Table.Body>

                <Table.Header style={{marginLeft: '10px'}}>
                    <Table.Row>
                        <Table.HeaderCell>OFF COURT</Table.HeaderCell>
                        <Table.HeaderCell>MIN</Table.HeaderCell>
                        <Table.HeaderCell>PTS</Table.HeaderCell>
                        <Table.HeaderCell>FG</Table.HeaderCell>
                        <Table.HeaderCell>3PT</Table.HeaderCell>
                        <Table.HeaderCell>FT</Table.HeaderCell>
                        <Table.HeaderCell>ORB</Table.HeaderCell>
                        <Table.HeaderCell>DRB</Table.HeaderCell>
                        <Table.HeaderCell>REB</Table.HeaderCell>
                        <Table.HeaderCell>AST</Table.HeaderCell>
                        <Table.HeaderCell>STL</Table.HeaderCell>
                        <Table.HeaderCell>BLK</Table.HeaderCell>
                        <Table.HeaderCell>TO</Table.HeaderCell>
                        <Table.HeaderCell>PF</Table.HeaderCell>
                        <Table.HeaderCell>+/-</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body style={{marginLeft: '10px'}}>
                    {renderOffCourtPlayers()}
                </Table.Body>
            </Table>

            
        </div>
    )
}

export default BoxScoreTable