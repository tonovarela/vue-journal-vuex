import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

import dayBookRouter from  '../modules/daybook/router'
import authRouter from '../modules/auth/router'
import isAuthenticatedGuard from "@/modules/auth/router/authGuard";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',    
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/auth',
    ...authRouter      
  },
  {
    path:'/daybook',
    beforeEnter:[isAuthenticatedGuard],
    ...dayBookRouter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
