import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Calendar from '../components/Calendar.vue'
import Services from '../components/Services.vue'
import Dining from '../components/services/Dining.vue'
import Events from '../components/services/Events.vue'
import Spa from '../components/services/Spa.vue'
import AdminDashboard from '../components/mgmt/AdminDashboard.vue'
import SpaManagement from '../components/mgmt/SpaManagement.vue'
<<<<<<< HEAD
import Login from '../components/pages/LoginPage.vue'
import Register from '../components/pages/RegisterPage.vue'
=======
import EventsManagement from '../components/mgmt/EventsManagement.vue'
>>>>>>> main

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/services',
      name: 'services',
      component: Services
    },
    {
      path: '/dining',
      name: 'dining',
      component: Dining
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/spa',
      name: 'spa',
      component: Spa
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard
    },
    {
      path: '/mgmt/spa',
      name: 'spa-mgmt',
      component: SpaManagement
    },
    {
<<<<<<< HEAD
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
=======
      path: '/mgmt/events',
      name: 'events-mgmt',
      component: EventsManagement
>>>>>>> main
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
