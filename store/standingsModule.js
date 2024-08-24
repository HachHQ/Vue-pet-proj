export const standingsModule = {
    state: () => ({
        allStandings: [],
        allLeagues: [],
        allCategories: [],
        allTeams: [],
        standingsIsLoading: false
    }),
    getters: {

    },
    mutations: {
        setStandings(state, standings) {
            state.allStandings = standings;
        },
        setAllLeagues(state, leagues) {
            state.allLeagues = leagues;
        },
        setAllCategories(state, categories) {
            state.allCategories = categories;
        },
        setAllTeams(state, teams) {
            state.allTeams = teams;
        },
        setStandingsLoading(state, bool) {
            state.standingsIsLoading = bool;
        }
    },
    actions: {
        async fetchLeagues({ commit }) {
            try {
                commit('setStandingsLoading', true);
                const response = await fetch("/data/modifyStandingData.json");
                const data = await response.json();
                const dataFlat = data.tournamentSchemeArray.flatMap((scheme) => scheme.standingArray);

                const leagues = [...new Set(dataFlat.map(team => team.league))];
                const categories = [...new Set(dataFlat.map(team => team.teamCategory))];
                const teams = [...new Set(dataFlat.map(team => team.teamName))];

                commit('setStandings', dataFlat);
                commit('setAllLeagues', leagues);
                commit('setAllCategories', categories);
                commit('setAllTeams', teams);
            } catch (e) {
                console.log('Error fetching data:', e);
            } finally {
                commit('setStandingsLoading', false);
                console.log("standings are loaded");
            } 
        },
    },
    namespaced: true
}

// const standingsModule = {
//     state: {
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
//     },
//     actions: {
//         async fetchLeagues({ commit }) {
//             const response = await fetch("/data/modifyStandingData.json");
//         const data = await response.json();

//     // Извлекаем уникальные лиги
//         const leagues = [...new Set(data.map(team => team.league))];

//     // Извлекаем уникальные категории
//         const categories = [...new Set(data.map(team => team.category))];

//     // Извлекаем все команды
//         const teams = data.map(team => ({
//         teamName: team.teamName,
//     }));

//     commit('SET_LEAGUES', leagues);
//     commit('SET_CATEGORIES', categories);
//     commit('SET_TEAMS', teams);
//         },
//         async fetchGames({ commit }) {
//             const response = await fetch("/data/gamesCalendarData.json");
//             const games = await response.json();
//             commit('SET_GAMES', games);
//         }
//     }
    // state: () => ({
    //     standings: [],
    //     leagues: [],
    //     categories: [],
    //     teams: [],
    // }),
    // getters: {
    //     allLeagues: state => state.leagues,
    //     allTeams: state => state.teams,
    //     getTeamsByLeague: state => leagueName => state.teams.filter(team => team.leagueName === leagueName)
    // },
    // mutations: {
    //     SET_LEAGUES(state, leagues) {
    //         state.leagues = leagues;
    //     },
    //     SET_TEAMS(state, teams) {
    //         state.teams = teams;
    //     },
    //     SET_CATEGORIES(state, categories) {
    //         state.categories = categories;
    //     }
    // },
    // actions: {
    //     async fetchLeagues({ commit }) {
    //         const response = await fetch("/data/modifyStandingData.json");
    //         const data = await response.json();
    //         commit('SET_LEAGUES', data.leagues);
    //         commit('SET_TEAMS', data.teams);
    //         commit('SET_CATEGORIES', data.categories);
    //     }
    // }
//};

//export default standingsModule;
