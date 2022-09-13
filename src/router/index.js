import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {protectedRoute: true}
  },
  {
    path: '/register',
    name: 'EditView',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/calculate',
    name: 'SalaryForecast',
    component: () => import('../views/SalaryForecast.vue'),
    meta: {protectedRoute: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.meta.protectedRoute){
    store.getters.authUser ? next() : next('login')
  } else {
    next()
  }
})

export default router
