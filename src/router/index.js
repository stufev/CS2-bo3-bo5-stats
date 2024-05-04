import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home/index.vue"
import Player from "../views/Player/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/player/:name',
      name: 'player',
      component: Player,
      props: true,
    },
  ]
})

export default router
