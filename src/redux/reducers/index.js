const initialState = {
    teams: undefined,
    loading: true,
    games: [],
    date: "",
    displayPlayer: undefined,
    user: undefined
  };

  function rootReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case "SET_TEAMS":
            return {...state, teams: action.teams, loading: false}
        case "SET_GAMES":
            return {...state, games: action.games, loading: false, date: action.date}
        case "SET_DATE":
            return {...state, date: action.date}
        case "WE_LOADING":
            return {...state, loading: true}
        case "SET_PLAYERS":
            return {...state, players: action.players, loading: false}
        case "LOG_IN":
            return {token: action.token}
        case "SET_DISPLAY_PLAYER":
            return {...state, displayPlayer: action.displayPlayer, loading: false}
        case "SET_USER":
            console.log(action.user)
            return {...state, user: action.user}
        case "LOGOUT":
            localStorage.clear()
            return {...state, user: undefined, token: undefined}
        case "SET_HOME_DISPLAY":
            return {...state, homeDisplay: action.homeDisplay}
        case "SET_BOXSCORE":
            return {...state, boxscore: action.boxscore}
        case "SET_PREVIOUS_GAME":
            return {...state, previousGame: action.previousGame}
        case "SET_USER_DISPLAY":
            return {...state, userDisplay: action.userDisplay}
        case "SET_ALL_USERS":
            return {...state, users: action.users}
        case "SET_DISPLAY_TEAM":
            return {...state, displayTeam: action.team}
        case "SET_LEADERS":
            return{...state, leaders: action.leaders}
        case "SET_LEADERS_HOME":
                return{...state, leadersHome: action.leaders}
        case "SET_LEADERS_AWAY":
            return{...state, leadersAway: action.leaders}
        default:
            return state
    }
  };

  export default rootReducer;
  