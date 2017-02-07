<template>
  <div id="app" @touchstart="start" @touchmove="move">
    <navbar></navbar>

    <div id="content">
      <transition :name="direction">
        <router-view class="child-view" :style="{ 'font-size': bigFont ? '1.1em' : '1em' }"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import bus from './events'

let lastX, lastY, lastTime

export default {
  name: 'app',
  components: { Navbar },
  data: () => ({ direction: 'fade' }),
  computed: {
    bigFont() { return bus.bigFont }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      const toRight = from.name === 'settings' || from.name === 'dis' && to.name !== 'settings'
      this.direction = toRight ? 'slide-right' : 'slide-left'
      next()
    })
  },
  methods: {
    start(e) {
      const touch = e.changedTouches[0]
      lastX = touch.pageX
      lastY = touch.pageY
      lastTime = new Date().getTime()
    },
    move(e) {
      const touch = e.changedTouches[0]
      const dx = touch.pageX - lastX
      const dy = touch.pageY - lastY

      const now = new Date().getTime()
      const time = now - lastTime
      const velocityX = Math.abs(dx) / time

      const correctAngle = Math.abs(dx) / Math.abs(dy) > 2
      const enoughPower = velocityX >= 0.6
      const enoughDistance = dx >= 15

      lastX = touch.pageX
      lastY = touch.pageY
      lastTime = now

      const swiperight = correctAngle && enoughPower && enoughDistance
      if (!swiperight) return

      if (this.$route.name === 'settings' && window.history.length > 2) {
        return this.$router.go(-1)
      }

      this.$router.push('/')
    }
  }
}
</script>

<style>
  *, *::before, *::after {
    box-sizing: inherit;
  }

  html, body, #app {
    height: 100%;
  }

  @media screen and (min-device-width: 480px) {
    html, body {
      max-width: 480px;
      margin: auto;
    }
  }

  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: PT Sans,sans-serif;
    background-color: rgba(231, 231, 231, 0.29);
  }

  #app, #content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  #app > * {
    flex-shrink: 0;
  }

  #content {
    position: relative;
    flex-grow: 1;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .child-view {
    width: 100%;
    position: absolute;
    /*transition: all .5s cubic-bezier(.55,0,.1,1);*/
    transition: all .3s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translate(30px, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translate(-30px, 0);
  }
</style>
