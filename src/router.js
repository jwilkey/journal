import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Entries from '@/components/Entries'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/entries',
      name: 'entries',
      component: Entries
    }
  ]
})
