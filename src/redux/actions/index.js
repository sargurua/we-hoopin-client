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
export const weLoading = () => ({type: "WE_LOADING"})

export const getTodaysGames = (date) => {
    return async dispatch => {
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const response = await fetch(proxyurl +  `http://data.nba.net/data/10s/prod/v1/${date}/scoreboard.json`)
            const json = await response.json()
            const games = json.games

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