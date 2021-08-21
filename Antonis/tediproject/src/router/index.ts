import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import AdminPage from '../views/AdminPage.vue'
import UserMainPage from '../views/UserMainPage.vue'
import Communications from '../views/Communications.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage
  },
  {
    path: '/user',
    name: 'User',
    component: UserMainPage
  },
  {
    path: '/communication',
    name: 'Communication',
    component: Communications
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
