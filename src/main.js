import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

import Help from './components/help/Page'
import MainPage from './components/summary/Page'
import Settings from './components/settings/Page'
import Discipline from './components/discipline/Page'

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { name: 'dis', path: '/dis/:id(\\d+)', component: Discipline, props: true },
    { name: 'settings', path: '/settings', component: Settings },
    { name: 'help', path: '/help', component: Help },
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
