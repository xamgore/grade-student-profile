import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

import MainPage from './components/summary/List'
import Settings from './components/settings/Page'
import Discipline from './components/discipline/Page'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/dis/:id(\\d+)', component: Discipline, props: true },
    { name: 'settings', path: '/settings', component: Settings },
    { name: 'main', path: '/', component: MainPage },
    { path: '*', redirect: { name: 'main' } }
  ]
})

new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
