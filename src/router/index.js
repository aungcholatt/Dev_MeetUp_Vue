import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/HomeView.vue'
import CreateMeetup from '@/components/Meetup/CreateMeetup.vue'
import Meetup from '@/components/Meetup/MeetupView.vue'
import Meetups from '@/components/Meetup/MeetupsView.vue'
import Profile from '@/components/User/ProfileView.vue'
import Signin from '@/components/User/SignIn.vue'
import SignUp from '@/components/User/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/acct',
    name: 'meetupsview',
    component: Meetups
  },
  {
    path: '/meetup/new',
    name: 'createmeetup',
    component: CreateMeetup
  },
  {
    path: '/meetups/:id',
    name: 'meetupview',
    props: true,
    component: Meetup
  },
  {
    path: '/profile',
    name: 'profileview',
    component: Profile
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
