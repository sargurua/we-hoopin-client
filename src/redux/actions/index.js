export const setTeams = teams => ({type: "SET_TEAMS", teams})

export const fetchTeams = () => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = "http://data.nba.net/data/10s/prod/v1/current/standings_all.json"
            const response = await fetch(proxyurl + url);
            const json = await response.json();
            const teams = json.league.standard.teams
            console.log(teams)
            dispatch(setTeams(teams));    
        } catch (error) {
          console.error("Error fetching teams", error);
        }
      };
}

export const setGames = (games, date) => ({type: "SET_GAMES", games, date, loading: false })
export const setDate = date => ({type: "SET_DATE",date})
export const setDisplayPlayer = displayPlayer => ({type: "SET_DISPLAY_PLAYER", displayPlayer})
export const setPlayers = players => ({type: "SET_PLAYERS", players})
export const weLoading = () => ({type: "WE_LOADING"})
export const login = token => ({type: "LOG_IN", token})
export const setUser = user => ({type: "SET_USER", user})
export const logout = (history) => ({type: "LOGOUT", history})
export const setHomeDisplay = homeDisplay => ({type: "SET_HOME_DISPLAY", homeDisplay})
export const setBoxscore = boxscore => ({type: "SET_BOXSCORE", boxscore})
export const setPreviousGame = previousGame => ({type: 'SET_PREVIOUS_GAME', previousGame})
export const setUserDisplay = userDisplay => ({type: 'SET_USER_DISPLAY', userDisplay})
export const setAllUsers = users => ({type: 'SET_ALL_USERS', users})
export const setDisplayTeam = team => ({type: 'SET_DISPLAY_TEAM', team})
export const setLeaders = leaders => ({type: 'SET_LEADERS', leaders})
export const setLeadersHome = leaders => ({type: 'SET_LEADERS_HOME', leaders})
export const setLeadersAway = leaders => ({type: 'SET_LEADERS_AWAY', leaders})

export const getTodaysGames = (date) => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const response = await fetch(proxyurl +  `http://data.nba.net/data/10s/prod/v1/${date}/scoreboard.json`)
            const json = await response.json()
            let games = json.games

            if (games.length === 0){
                games = null
            }
            console.log(games)

            dispatch(setGames(games, date))

        } catch(error) {
            console.log(error)
            console.log(date)
            const games = null
            dispatch(setGames(games, date))
        }
    }
}

export const getAllPlayers = () => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const response = await fetch(`http://localhost:3000/players`)
            const players = await response.json()

            console.log(players)

            dispatch(setPlayers(players))

        } catch(error) {
            console.log(error)
            const players = null
            dispatch(setPlayers(players))
        }
    }
}

export const getAllTeams = () => {
    return async dispatch => {
        try {
            const response = await fetch(`http://localhost:3000/players`)
            const teams = await response.json()

            console.log(teams)

            dispatch(setPlayers(teams))
        } catch (err) {
            console.log(err)
        }
    }
}

export const displayPlayer = player_id => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const response = await fetch(`http://localhost:3000/players`)
            const players = await response.json()


            const displayPlayer = await players.find(player => player.ref_id === player_id)

            const teamResponse = await fetch("http://localhost:3000/teams")
            const teams = await teamResponse.json()

            const newResponse = await fetch(`https://www.balldontlie.io/api/v1/players?search=${displayPlayer.first_name}%20${displayPlayer.last_name}`)
            const newPlayer = await newResponse.json()
            console.log(newPlayer.data[0].last_name === "Melli")
            if (newPlayer.data[0].last_name === "Melli"){
                newPlayer.data[0].id = 667302
            }
            const otherInfo = newPlayer.data[0]
            const seasonAverages = []

            for(let i = parseInt(displayPlayer.seasonDebut); i <= 2019; i++){
                const seasonResponse = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${i}&player_ids[]=${newPlayer.data[0].id}`)
                const season = await seasonResponse.json()
                console.log(season.data)
                if (season.data[0] === undefined){
                    season.data[0] = i
                }
                seasonAverages.push(season.data[0])
            }

            const configResponse = await fetch(proxyurl + "http://data.nba.net/data/1h/prod/2019/teams_config.json")
            const configJson = await configResponse.json()

            const displayConfig  = configJson.teams.config.find(team => team.teamId === displayPlayer.team_ref_id)

            displayPlayer.seasonAverages = seasonAverages
            displayPlayer.otherInfo = otherInfo
            displayPlayer.config = displayConfig

            const displayTeam = teams.find(team => team.ref_id == displayPlayer.team_ref_id)
            displayPlayer.team = displayTeam;
            // displayPlayer.latestGames = latestGames.data

            dispatch(setDisplayPlayer(displayPlayer))

        } catch(error) {
            console.log(error)
            const players = null
            dispatch(setPlayers(players))
        }
    }
}

export const getUser = token => {
    return async dispatch => {
        try {
            const response = await fetch("http://localhost:3000/api/findToken", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            })

            const json = await response.json()
            
            console.log(json)

            const user = await json.user

            console.log('======================', user)
            dispatch(setUser(user))
        } catch (err) {
            console.alert("naw")
        }
    }
}

export const homeDisplay = () => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";

            let d = new Date()
            d.setDate(d.getDate() - 1)
            const ar = d.toLocaleDateString().split("/")
            ar[1].length < 2 ? ar[1] = "0" + ar[1] : ar[1] = ar[1]

            const date = `${ar[2]}-${ar[0]}-${ar[1]}`
            
            const resp = await fetch(`https://www.balldontlie.io/api/v1/stats?start_date=${date}&end_date=${date}&per_page=100`)
            const json = await resp.json()

            console.log(json)
            const total_pages = json.meta.total_pages
            const current_page = json.meta.current_page
            const fullJson = []

            fullJson.push(json.data)
            for (let i = current_page + 1; i <= total_pages; i++){
                const nextResp = await fetch(`https://www.balldontlie.io/api/v1/stats?start_date=${date}&end_date=${date}&per_page=100&page=${i}`)
                const nextJson = await nextResp.json()

                fullJson.push(nextJson.data)
            }

            const array = fullJson.flat().sort((a, b) => {
                return (b.pts + b.reb + b.stl + b.ast + b.blk) - (a.pts + a.reb + a.stl + a.ast + a.blk)
            })

            console.log(date.split("-").join(""))

            const gamesResponse = await fetch(proxyurl + `http://data.nba.net/data/10s/prod/v1/${date.split("-").join("")}/scoreboard.json`)
            const gamesJson = await gamesResponse.json()

            console.log(gamesJson.games)

            const dbPlayersResponse = await fetch('http://localhost:3000/players')
            const dbPlayersJson = await dbPlayersResponse.json()

            array.slice(0, 5).map(player => {
                const foundPlayer = dbPlayersJson.find(dbPlayer => {
                    return  (player.player.first_name === dbPlayer.first_name) && (player.player.last_name === dbPlayer.last_name)
                })
                player.team_ref_id = foundPlayer.team_ref_id
                player.ref_id = foundPlayer.ref_id
            })

            dispatch(setHomeDisplay({topPerformances: array.slice(0, 5), games: gamesJson.games}))

        } catch (err) {
            console.log(err)
        }
    }
}

export const bandwagonPlayer = (user, player) => {
    return async dispatch => {
        try {
            const response = await fetch("http://localhost:3000/playerbandwagon", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ 
                    user,
                    player
                })
            })

            const json = await response.json()

            dispatch(setUser(json))
        }
        catch (err) {
            console.log(err)
        }
    }
} 

export const unBandwagonPlayer = (user, player) => {
    return async dispatch => {
        try {
            const response = await fetch("http://localhost:3000/playerbandwagon/unlike", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ 
                    user,
                    player
                })
            })

            const json = await response.json()

            await dispatch(setUser(json))

        } catch (err) {
            console.log(err)
        }
    }
}

export const boxscore = (gameId, date) => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";

            const response = await fetch(proxyurl + `http://data.nba.net/data/10s/prod/v1/${date}/${gameId}_boxscore.json`)
            const json = await response.json()

            await dispatch(setBoxscore(json))
        } catch (err) {
            console.log(err)
        }
    }
}

export const previousGame = (gameId, date) => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";

            const response = await fetch(proxyurl + `http://data.nba.net/data/10s/prod/v1/${date}/${gameId}_boxscore.json`)
            const json = await response.json()

            dispatch(setPreviousGame(json))
        } catch (err) {
            console.log(err)
        }
    }
}

export const findUser = (user) => {
    return async dispatch => {
        try {
            console.log('megbgshchsvcshv')
            const bandwagonsResponse = await fetch("http://localhost:3000/playerbandwagon")
            const bandwagonJson = await bandwagonsResponse.json()

            console.log('BANDWAGONS', bandwagonJson.length)

            const userResponse = await fetch("http://localhost:3000/users/find", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user
                })
            })
            const userJson = await userResponse.json()

            console.log("USER", userJson)

            const playersResponse = await fetch("http://localhost:3000/players")
            const playersJson = await playersResponse.json()

            console.log("PLAYERS", playersJson.length)

            const userBandwagons = bandwagonJson.filter(bndwgn => bndwgn.user_id === userJson.id)
            const newBandwagons = userBandwagons.map(bandwagon => {
                return playersJson.find(player => {
                    if (player.ref_id === bandwagon.player_ref_id){
                        player.created = bandwagon.start_date
                        return true
                    }
                })
            })

            console.log("NEW BANDWAGONS", newBandwagons)

            let i = 0

            const userDisplay = userJson

            userDisplay.players = []

            if(newBandwagons.length === 0) {
                dispatch(setUserDisplay(userDisplay))
            }

            const newPlayers = newBandwagons.map(async player => {
                fetch(`https://www.balldontlie.io/api/v1/players?search=${player.first_name}%20${player.last_name}`)
                .then(res => res.json())
                .then(json => {
                    return fetch(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${json.data[0].id}&seasons[]=2019`)
                })
                .then(next => next.json())
                .then(it => {
                    console.log(it)
                    it.data.sort((a, b) => {
                        console.log(new Date(a.game.date) > new Date(b.game.date))
                        return new Date(a.game.date) < new Date(b.game.date) ? -1 : new Date(a.game.date) < new Date(b.game.date) ? 1 : 0
                    })
                    console.log(it)
                    player.lastGame = it.data[it.data.length - 1]
                    userDisplay.players.push(player)
                    console.log(user)
                    if (userDisplay.players.length === newBandwagons.length){
                        dispatch(setUserDisplay(userDisplay))
                    }
                })
            })
        } catch(err) {
            alert('too many requests')
        }
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        try {
            const res = await fetch('http://localhost:3000/users')
            const json = await res.json()

            console.log("USERS", json)

            dispatch(setAllUsers(json))
        } catch (err) {

        }
    }
}

export const teamLeadersAway = (inTeam) => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";

            const teamsRes = await fetch('http://localhost:3000/teams')
            const teamsJson = await teamsRes.json()

            const playersRes = await fetch('http://localhost:3000/players')
            const playerJson = await playersRes.json()

            console.log(inTeam)
            console.log(teamsJson)
            const foundTeam = teamsJson.find(team => team.ref_id === inTeam.teamId)

            console.log(foundTeam)

            const leadersRes = await fetch(proxyurl + `http://data.nba.net/data/10s/prod/v1/2019/teams/${foundTeam.url_name}/leaders.json`)
            const leadersJson = await leadersRes.json()

            leadersJson.league.standard.updated = {}


            const keys = Object.keys(leadersJson.league.standard)


            console.log(keys)


            keys.map(key => {
                console.log(Object.keys(leadersJson.league.standard.updated).length)

                if (Array.isArray(leadersJson.league.standard[key])){
                    leadersJson.league.standard[key][0].player = playerJson.find(player => {
                        if (player.ref_id === leadersJson.league.standard[key][0].personId) {
                            leadersJson.league.standard.updated[key] = {value: leadersJson.league.standard[key][0].value, player: player}
                        }
                    })
                }
                if(Object.keys(leadersJson.league.standard.updated).length === keys.length - 2) {
                    dispatch(setLeadersAway(leadersJson.league.standard.updated))
                }
            })

            console.log(leadersJson.league.standard)
        } catch(err) {
            console.log(err)
        }
    }
}

export const teamLeadersHome = (inTeam) => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";

            const teamsRes = await fetch('http://localhost:3000/teams')
            const teamsJson = await teamsRes.json()

            const playersRes = await fetch('http://localhost:3000/players')
            const playerJson = await playersRes.json()

            console.log(inTeam)
            console.log(teamsJson)
            const foundTeam = teamsJson.find(team => team.ref_id === inTeam.teamId)

            console.log(foundTeam)

            const leadersRes = await fetch(proxyurl + `http://data.nba.net/data/10s/prod/v1/2019/teams/${foundTeam.url_name}/leaders.json`)
            const leadersJson = await leadersRes.json()

            leadersJson.league.standard.updated = {}


            const keys = Object.keys(leadersJson.league.standard)


            console.log(keys)


            keys.map(key => {
                console.log(Object.keys(leadersJson.league.standard.updated).length)

                if (Array.isArray(leadersJson.league.standard[key])){
                    leadersJson.league.standard[key][0].player = playerJson.find(player => {
                        if (player.ref_id === leadersJson.league.standard[key][0].personId) {
                            leadersJson.league.standard.updated[key] = {value: leadersJson.league.standard[key][0].value, player: player}
                        }
                    })
                }
                if(Object.keys(leadersJson.league.standard.updated).length === keys.length - 2) {
                    dispatch(setLeadersHome(leadersJson.league.standard.updated))
                }
            })

            console.log(leadersJson.league.standard)
        } catch(err) {
            console.log(err)
        }
    }
}

export const teamLeaders = (inTeam) => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";

            const teamsRes = await fetch('http://localhost:3000/teams')
            const teamsJson = await teamsRes.json()

            const playersRes = await fetch('http://localhost:3000/players')
            const playerJson = await playersRes.json()

            console.log(inTeam)
            console.log(teamsJson)
            const foundTeam = teamsJson.find(team => team.ref_id === inTeam.teamId)

            console.log(foundTeam)

            const leadersRes = await fetch(proxyurl + `http://data.nba.net/data/10s/prod/v1/2019/teams/${foundTeam.url_name}/leaders.json`)
            const leadersJson = await leadersRes.json()

            leadersJson.league.standard.updated = {}


            const keys = Object.keys(leadersJson.league.standard)


            console.log(keys)


            keys.map(key => {
                console.log(Object.keys(leadersJson.league.standard.updated).length)

                if (Array.isArray(leadersJson.league.standard[key])){
                    leadersJson.league.standard[key][0].player = playerJson.find(player => {
                        if (player.ref_id === leadersJson.league.standard[key][0].personId) {
                            leadersJson.league.standard.updated[key] = {value: leadersJson.league.standard[key][0].value, player: player}
                        }
                    })
                }
                if(Object.keys(leadersJson.league.standard.updated).length === keys.length - 2) {
                    dispatch(setLeaders(leadersJson.league.standard.updated))
                }
            })

            console.log(leadersJson.league.standard)
        } catch(err) {
            console.log(err)
        }
    }
}

export const displayTeam = (inTeam) => {
    return async dispatch => {
        try {
            console.log("we here")

            const proxyurl = "https://cors-anywhere.herokuapp.com/";

            const res = await fetch(proxyurl + "https://data.nba.net/data/10s/prod/v1/2019/team_stats_rankings.json")
            const json = await res.json()

            const configResponse = await fetch(proxyurl + "http://data.nba.net/data/1h/prod/2019/teams_config.json")
            const configJson = await configResponse.json()

            const displayConfig = configJson.teams.config.find(team => team.teamId === inTeam.teamId)

            const foundTeam = json.league.standard.regularSeason.teams.find(team => team.teamId === inTeam.teamId)

            const moreyExpectation = Math.round((Math.round(parseFloat(foundTeam.ppg.avg) * (parseInt(inTeam.win) + parseInt(inTeam.loss))) ** 13.91) / ((Math.round(parseFloat(foundTeam.ppg.avg) * (parseInt(inTeam.win) + parseInt(inTeam.loss))) ** 13.91) + (Math.round(parseFloat(foundTeam.oppg.avg) * (parseInt(inTeam.win) + parseInt(inTeam.loss))) ** 13.91)) * 82)
            const pctExpectation = Math.round(((parseInt(inTeam.win) / (parseInt(inTeam.win) + parseInt(inTeam.loss))) * 82))

            const userRes = await fetch("http://localhost:3000/players")
            const userJson = await userRes.json()


            const players = userJson.filter(player => player.team_ref_id === inTeam.teamId)

            foundTeam.expectation = moreyExpectation
            foundTeam.pctExpectation = pctExpectation
            foundTeam.config = displayConfig
            foundTeam.info = inTeam

            foundTeam.players = []

            await players.map( async player => {
                const res = await fetch(proxyurl + `http://data.nba.net/data/10s/prod/v1/2019/players/${player.ref_id}_profile.json`)
                const json = await res.json()
                player.avgs = json

                foundTeam.players.push(player)
                if(foundTeam.players.length === players.length) {
                    foundTeam.players.sort((a, b) => parseFloat(b.pts) - parseFloat(a.pts))
                    dispatch(setDisplayTeam(foundTeam))
                }
            })




        } catch(err) {

        }
    }
}