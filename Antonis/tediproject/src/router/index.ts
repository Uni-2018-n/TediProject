import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import AdminPage from '../views/AdminPage.vue'
import UserMainPage from '../views/UserMainPage.vue'
import Communications from '../views/Communications.vue'
import Network from '../views/Network.vue'
import Settings from '../views/Settings.vue'
import Profile from '../views/Profile.vue'
import NotificationPage from '../views/NotificationPage.vue'
import jobsPage from '../views/jobsPage.vue'
import userList from '../views/userList.vue'
import ProfileOther from '../views/ProfileOther.vue'
import logout from '../views/logout.vue'

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
  },
  {
    path: '/network',
    name: 'Network',
    component: Network
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/notifications',
    name: 'NotificationPage',
    component: NotificationPage
  },
  {
    path: '/jobs',
    name: 'jobsPage',
    component: jobsPage
  },
  {
    path: '/userList/:input',
    name: 'userList',
    component: userList,
    props: true,
  },
  {
    path: '/profileOther',
    name: 'ProfileOther',
    component: ProfileOther
  },
  {
    path: '/logout',
    name: 'logout',
    component: logout
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
