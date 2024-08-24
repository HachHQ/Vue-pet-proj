import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import GamesCalendarPage from '../views/GamesCalendarPage.vue'
import Standings from '../views/StandingsPage.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/games_calendar',
        name: 'GamesCalendarPage',
        component: GamesCalendarPage
    },
    {
        path: '/standings',
        name: 'StandingsPage',
        component: Standings
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router