import React, {Component} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {getAllPlayers, weLoading} from '../redux/actions'
import {withRouter} from 'react-router-dom'
import { Container, Card , Image, Search, Header, Label, Table} from 'semantic-ui-react'
import useAutocomplete from '@material-ui/lab/useAutocomplete';

const initialState = { isLoading: false, results: [], value: '' }

class Players extends Component {
    state = initialState


    componentDidMount() {
        this.props.callAllPlayers()
    }

    resultRenderer = (result) => {
        return (
            <div>
                <Header as='h4' image>
                    <Image src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${result.team_ref_id}/2019/260x190/${result.ref_id}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${result.ref_id}.png`} alt={`${result.first_name} ${result.last_name}`}/>
                </Header>
                <Label>
                    {result.first_name} {result.last_name}
                </Label>
            </div>


        )
    }

    handleResultSelect = (e, {result}) => {
        this.props.history.push(`/players/${result.ref_id}`)
    }

    handleSearchChange = (e, { value }) => {
        const source = this.props.players
        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (this.state.value.length < 1) return this.setState(initialState)
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = (result) => re.test(`${result.first_name} ${result.last_name}`)
    
          this.setState({
            isLoading: false,
            results: _.filter(source, isMatch),
          })
        }, 300)
      }

    renderPlayers = (players = this.props.players) => {
        if (players === []) {
            return (
                <h1>No players found</h1>
            )
        }
        const playerCards = players.map(player => {
            if(player.first_name === 'Robert' && player.last_name === "Franks"){
                return
            }
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
                        
                        {/* <Card.Header style={{fontSize: '18px'}}> Points: {player.pts} </Card.Header>
                        <Card.Header style={{fontSize: '18px'}}> Rebounds: {player.reb} </Card.Header>
                        <Card.Header style={{fontSize: '18px'}}> Assists: {player.ast} </Card.Header>
                        <Card.Header style={{fontSize: '18px'}}> Steals: {player.stl} </Card.Header>
                        <Card.Header style={{fontSize: '18px'}}> Blocks: {player.blk} </Card.Header> */}
                    </div>
                </div>
            </Card>
            )
        })

        return (
            <Card.Group itemsPerRow={6} id="all-player-cards" style={{display: 'flex', justifyContent: 'center', paddingTop: '15px'}}>
                {playerCards}
            </Card.Group>
        )
    }

    handlePlayerClick = player => {
        this.props.history.push(`players/${player.ref_id}`)
    }

    handleSearch = event => {
        event.preventDefault()
        console.log(event.target[0].value)
    }

    renderSearch = () => {
        const { isLoading, value, results } = this.state
        return (
            <Search
                fluid
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
                })}
                results={results.slice(0, 5)}
                value={value}
                resultRenderer={this.resultRenderer}
                {...this.props}
          />
        )
    }

    render() {
        return (
            <div>
                {this.props.players === undefined
                ?
                <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-gif-orange-4.gif"/>
                :
                <div>
                    <div style={{background: '#3281B3', height: '210px'}}>
                        <h1 style={{textAlign: 'center', color: 'white', paddingTop: '30px'}}>Search All Players</h1>
                        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '30px'}}>
                            {this.renderSearch()}
                        </div>
                    </div>
                    
                    {this.renderPlayers()}
                </div>
                }  
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {players: state.players}
}

const mapDispatchToProps = dispatch => {
    return {callAllPlayers: () => dispatch(getAllPlayers()), timeToLoad: () => dispatch(weLoading())}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Players))