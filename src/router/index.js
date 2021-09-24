import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

import dayBookRouter from  '../modules/daybook/router'

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
    path:'/daybook',
    ...dayBookRouter    
  //component:()=> import(/* webpackChunkName: "daybook" */'../modules/daybook/layouts/DayBookLayout')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
