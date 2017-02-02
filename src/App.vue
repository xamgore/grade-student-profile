<template>
  <div id="app">
    <navbar></navbar>

    <div id="content">
      <transition :name="direction">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'app',
  components: { Navbar },
  data: () => ({ direction: 'fade' }),
  created() {
    this.$router.beforeEach((to, from, next) => {
      const toRight = from.name === 'settings' || from.name === 'dis' && to.name !== 'settings'
      this.direction = toRight ? 'slide-right' : 'slide-left'
      next()
    })
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
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .child-view {
    width: 100%;
    position: absolute;
    /*transition: all .5s cubic-bezier(.55,0,.1,1);*/
    transition: all .5s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
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
