import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Entries from '@/components/Entries'
import SignIn from '@/components/SignIn'
import google from '@/js/google'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/entries',
      name: 'entries',
      component: Entries
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'sign-in' && !google.isSignedIn()) {
    next('/sign-in')
  } else {
    next()
  }
})

export default router
