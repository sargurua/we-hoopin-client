import React, {Component} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {findUser, getAllUsers} from '../redux/actions'
import {Table, Card, Search, Header, Label, Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

const initialState = { isLoading: false, results: [], value: '' }

class UserPage extends Component {

    state = initialState

    componentDidMount() {
        this.props.callFindUser(this.props.match.params.user_id)
        this.props.callGetAllUsers()
    }

    componentDidUpdate () {
        if(this.props.displayPlayer){
            if(this.props.displayPlayer.id != this.props.match.params.user_id){
                this.props.callFindUser(this.props.match.params.user_id)    
            }
        }
    }

    handlePlayerClick = player => {
        this.props.history.push(`/players/${player.ref_id}`)
    }

    renderPlayers = () => {
        this.props.userDisplay.players.length > 0 && console.log("stuff-------------", this.props.userDisplay.players.length)
        const stuff = this.props.userDisplay.players.map(player => {
            console.log('PLAYER', player)
            return (
                <Card style={{width: 'auto', background: '#eaffff'}} onClick={() => this.handlePlayerClick(player)}>
                    <div style={{display: 'flex'}}>
                        <img style={{height: 'auto', width: '190px'}} src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${player.team_ref_id}/2019/260x190/${player.ref_id}.png`} onError={e => e.target.src=`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.ref_id}.png`} alt={`${player.first_name} ${player.last_name}`}/>
                        <div style={{float: 'left', textAlign: 'right', width: '100%', marginRight: '40px'}}>
                            <Card.Header style={{fontSize: '30px', textAlign: 'center'}}> {player.first_name} {player.last_name} </Card.Header>
                            <Card.Content style={{fontSize: '20px', textAlign: 'center'}}>Last Game on {player.lastGame.game.date.substring(5, 7)}/{player.lastGame.game.date.substring(8, 10)}/{player.lastGame.game.date.substring(0, 4)}</Card.Content>
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
                                        <Table.Cell style={{fontSize: '18px'}}>{player.lastGame.pts}</Table.Cell>
                                        <Table.Cell style={{fontSize: '18px'}}>{player.lastGame.reb}</Table.Cell>
                                        <Table.Cell style={{fontSize: '18px'}}>{player.lastGame.ast}</Table.Cell>
                                        <Table.Cell style={{fontSize: '18px'}}>{player.lastGame.stl}</Table.Cell>
                                        <Table.Cell style={{fontSize: '18px'}}>{player.lastGame.blk}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div>
                        <div style={{paddingTop: '20px'}}>
                            <h1 style={{fontSize: '20px'}}>Following Since:</h1>
                            <h1 style={{fontSize: '16px'}}>{player.created}</h1>
                        </div>
                    </div>
                </Card>
            )
        })
        console.log(stuff)
        if (stuff.length === 0) {
            return (
            <Card style={{width: 'auto', height: '260px',background: '#eaffff', display: 'flex', justifyContent: 'center'}}>
                <h1 style={{alignSelf: 'center'}}>Not Following Anyone</h1>
            </Card>
            )
        }
        return stuff
    }
    
    handleResultSelect = (e, {result}) => {
        console.log(result)
        this.props.history.push(`/users/${result.id}`)
        window.location.reload()
    }

    resultRenderer = (result) => {
        return (
            <div>
                <Header as='h4' image>
                    <Image src={'https://p7.hiclipart.com/preview/136/314/528/emoji-basketball-road-game-sport-basketball.jpg'}/>
                </Header>
                <Label>
                    {result.username}
                </Label>
            </div>


        )
    }

    handleSearchChange = (e, { value }) => {
        const source = this.props.users
        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (this.state.value.length < 1) return this.setState(initialState)
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = (result) => re.test(result.username)
    
          this.setState({
            isLoading: false,
            results: _.filter(source, isMatch),
          })
        }, 300)
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

    render () {
        return (
            <div style={{paddingTop: '20px'}}>
                {this.props.userDisplay === undefined
                ?
                    <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-gif-orange-4.gif"/>
                :
                    <div>
                        <div style={{background: '#3281B3', height: '210px'}}>
                            <h1 style={{textAlign: 'center', color: 'white', paddingTop: '30px'}}>See who other users are following</h1>
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
    return {userDisplay: state.userDisplay, users: state.users}
}

const mapDispatchToProps = dispatch => {
    return {callFindUser: (user) => dispatch(findUser(user)), callGetAllUsers: () => dispatch(getAllUsers())}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPage))