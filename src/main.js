import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

import MainPage from './components/summary/List'
import Discipline from './components/discipline/Page'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/dis/:id(\\d+)', component: Discipline, props: true },
    { path: '*', component: MainPage }
  ]
})

new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
