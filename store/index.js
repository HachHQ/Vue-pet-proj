import {createStore} from "vuex";
import { standingsModule } from "./standingsModule";
import { gamesModule } from "./gamesModule";

export default createStore({
    state: () => ({
        isLoading: true,
      }),
      mutations: {
        SET_LOADING(state, isLoading) {
          state.isLoading = isLoading;
        },
      },
      actions: {
        setLoading({ commit }, isLoading) {
          commit("SET_LOADING", isLoading);
        },
      },
    modules: {
        standings: standingsModule,
        games: gamesModule,
    }
})





// import { createStore } from "vuex";
// //import standingsModule from "./standingsModule";
// //import gamesModule from "./gamesModule";

// export default createStore({
//     state: {
//         isStandingsLoading: false,
//         standings: [],
//         leagues: [],
//         categories: [],
//         teams: [],
//         gamesCalendar: [],
//         selectedLeague: '',
//         selectedCategory: '',
//         selectedTeam: '',
//         selectedDate: null,
//     },
//     getters: {
//         allLeagues: state => state.leagues,
//         allTeams: state => state.teams,
//         getTeamsByLeague: state => leagueName => state.teams.filter(team => team.leagueName === leagueName),
//         allGames: state => state.gamesCalendar,
//         getGamesByTeam: state => teamName => state.gamesCalendar.filter(game => game.homeTeam === teamName || game.guestTeam === teamName),
//     },
//     mutations: {
//         SET_LEAGUES(state, leagues) {
//             state.leagues = leagues;
//         },
//         SET_TEAMS(state, teams) {
//             state.teams = teams;
//         },
//         SET_CATEGORIES(state, categories) {
//             state.categories = categories;
//         },
//         SET_GAMES(state, games) {
//             state.gamesCalendar = games;
//         },
//         SET_SELECTED_LEAGUE(state, league) {
//             state.selectedLeague = league;
//         },
//         SET_SELECTED_TEAM(state, team) {
//             state.selectedTeam = team;
//         },
//         SET_SELECTED_DATE(state, date) {
//             state.selectedDate = date;
//         },
//         SET_STANDINGS(state, standings) {
//             state.standings = standings;
//         },
//         SET_STANDINGS_LOADING(state, bool) {
//             state.isStandingsLoading = bool;
//         }
//     },
//     actions: {
//         async fetchLeagues({ commit }) {
//             try {
//                 commit('SET_STANDINGS_LOADING', true);
//                 const response = await fetch("/data/modifyStandingData.json");
//                 const data = await response.json();
//                 const leagues = [...new Set(data.map(team => team.league))];
//                 const categories = [...new Set(data.map(team => team.category))];

//                 const teams = [...new Set(data.map(team => team.teamName))];
//                 commit('SET_STANINGS', data);
//                 commit('SET_LEAGUES', leagues);
//                 commit('SET_CATEGORIES', categories);
//                 commit('SET_TEAMS', teams);
//             } catch (e) {
//                 console.log(e);
//             } finally {
//                 console.log("standings are loaded");
//                 //commit('SET_STANDINGS_LOADING', false);
//             } 
//         },
//         async fetchGames({ commit }) {
//             const response = await fetch("/data/gamesCalendarData.json");
//             const games = await response.json();
//             commit('SET_GAMES', games);
//         }
//     }
    // modules: {
    //     standingsModule,
    //     gamesModule,
    // }   
//})