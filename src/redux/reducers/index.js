const initialState = {
    teams: [],
    loading: true,
    games: [],
    date: ""
  };

  function rootReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case "SET_TEAMS":
            return {teams: action.teams }
        case "SET_GAMES":
            return {games: action.games, loading: action.loading, date: action.date}
        case "SET_DATE":
            return {date: action.date}
        case "WE_LOADING":
            return {loading: true}
        default:
            return state
    }
  };

  export default rootReducer;
  