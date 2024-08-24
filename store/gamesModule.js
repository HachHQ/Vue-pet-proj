

export const gamesModule = {
    state: () => ({
        allGames: [],
        gamesIsLoading: false,
    }),
    getters: {

    },
    mutations: {
        setAllGames(state, allGames) {
            state.allGames = allGames;
        },
        setGamesLoading(state, bool) {
            state.gamesIsLoading = bool;
        }
    },
    actions: {
        async fetchGames({commit}) {
            try {
                commit('setGamesLoading', true);
                const gamesCalendarResponse = await fetch("/data/gamesCalendarData.json");
                const gamesCalendarData = await gamesCalendarResponse.json();
                commit("setAllGames", gamesCalendarData);
            } catch (e) {
                console.log("loading games error: ", e);
            } finally {
                commit('setGamesLoading', false);
                console.log("games are loaded");
            }
        }
    },
    namespaced: true
};