<template>
  <div id="app">
    <navbar></navbar>

    <div id="content" class="wall">
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
      const goBack = [
        from.name === 'dis' && to.name !== 'settings',
        from.name === 'settings' && to.name !== 'help' && to.name !== 'support',
        from.name === 'support' && to.name !== 'help',
        from.name === 'help'
      ].some(Boolean)

      this.direction = goBack ? 'slide-right' : 'slide-left'
      next()
    })
  }
}
</script>

<style>
  *, *::before, *::after {
    box-sizing: inherit;
  }

  html { box-sizing: border-box }

  html, body, #app { height: 100% }

  body {
    margin: 0;
    padding: 0;
    font-family: PT Sans,sans-serif;
    background-color: rgba(231, 231, 231, 0.2);
  }

  .wall {
    margin: 0 auto;
    width: 100%;
  }

  @media screen and (min-width: 560px) {
    .wall { max-width: 560px }
  }

  #app, #content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  #app > * { flex-shrink: 0 }

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
    transition: all .3s ease;
  }

  .fade-enter, .fade-leave-active { opacity: 0 }

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
