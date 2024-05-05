import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home/index.vue"
import Player from "../views/Player/index.vue";
import Login from "../views/Login/index.vue";
import Signup from "../views/Signup/index.vue";

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
  ]
})

export default router
