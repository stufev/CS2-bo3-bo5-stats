import {createRouter, createWebHistory} from 'vue-router'
import Home from "../views/Home/index.vue"
import Player from "../views/Player/index.vue";
import Login from "../views/Login/index.vue";
import Signup from "../views/Signup/index.vue";
import CreateGame from "../views/CreateGame/index.vue";
import Edit from "../views/Edit/index.vue";
import {projectAuth} from '../firebase/config'

//auth guard
const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser;
    const allowedUserUid = [import.meta.env.VITE_MUSE_KEY, import.meta.env.VITE_FROGSTER_KEY]; // UID пользователей

    if (!user || !allowedUserUid.includes(user.uid)) {
        next({name: 'Login'});
    } else {
        next();
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/player/:name',
            name: 'Player',
            component: Player,
            props: true,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
        },
        {
            path: '/create-game',
            name: 'CreateGame',
            component: CreateGame,
        },
        {
            path: '/edit/:id',
            name: 'Edit',
            component: Edit,
            props: true,
            beforeEnter: requireAuth,
        },
    ]
})

export default router
