<template>
  <header>
      <nav class="wall">
        <div>
          <a @click="goBack" :event="fast" v-show="back" class="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon back" viewBox="0 0 21 28">
              <path d="M18.3 4.7l-8.3 8.3 8.3 8.3c0.4 0.4 0.4 1 0 1.4l-2.6 2.6c-0.4 0.4-1 0.4-1.4 0l-11.6-11.6c-0.4-0.4-0.4-1 0-1.4l11.6-11.6c0.4-0.4 1-0.4 1.4 0l2.6 2.6c0.4 0.4 0.4 1 0 1.4z"/></svg>
          </a>

          <span v-show="semester" class="semester">{{ month }} {{ year }}</span>

          <slot></slot>
        </div>

        <div class="right">
          <router-link :to="{ name: 'settings' }" :event="fast" v-show="settings" class="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 28">
              <path d="M16 14c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zM24 12.3v3.5c0 0.2-0.2 0.5-0.4 0.6l-2.9 0.4c-0.2 0.5-0.4 1-0.6 1.4 0.5 0.8 1.1 1.5 1.7 2.2 0.1 0.1 0.2 0.3 0.2 0.4s0 0.3-0.1 0.4c-0.4 0.5-2.5 2.8-3 2.8-0.1 0-0.3-0.1-0.4-0.1l-2.2-1.7c-0.5 0.2-0.9 0.4-1.4 0.6-0.1 1-0.2 2-0.5 2.9-0.1 0.3-0.3 0.4-0.6 0.4h-3.5c-0.3 0-0.5-0.2-0.6-0.5l-0.4-2.9c-0.5-0.2-1-0.3-1.4-0.6l-2.2 1.7c-0.1 0.1-0.2 0.1-0.4 0.1s-0.3-0.1-0.4-0.2c-0.8-0.7-1.9-1.7-2.6-2.6-0.1-0.1-0.1-0.2-0.1-0.4 0-0.1 0-0.2 0.1-0.4 0.5-0.7 1.1-1.4 1.6-2.1-0.3-0.5-0.5-1-0.6-1.5l-2.9-0.4c-0.3 0-0.5-0.3-0.5-0.6v-3.5c0-0.2 0.2-0.5 0.4-0.6l2.9-0.4c0.2-0.5 0.4-1 0.6-1.4-0.5-0.7-1.1-1.5-1.7-2.2-0.1-0.1-0.2-0.2-0.2-0.4s0.1-0.2 0.1-0.4c0.4-0.5 2.5-2.8 3-2.8 0.1 0 0.3 0.1 0.4 0.2l2.2 1.7c0.5-0.2 0.9-0.4 1.4-0.6 0.1-1 0.2-2 0.5-2.9 0.1-0.2 0.3-0.4 0.6-0.4h3.5c0.3 0 0.5 0.2 0.6 0.5l0.4 2.9c0.5 0.2 1 0.3 1.4 0.6l2.2-1.7c0.1-0.1 0.2-0.1 0.4-0.1s0.3 0.1 0.4 0.2c0.8 0.8 1.9 1.7 2.6 2.7 0.1 0.1 0.1 0.2 0.1 0.3 0 0.1 0 0.3-0.1 0.4-0.5 0.7-1.1 1.4-1.6 2.1 0.3 0.5 0.5 1 0.6 1.5l2.9 0.4c0.3 0 0.5 0.3 0.5 0.6z"/></svg>
          </router-link>

          <router-link :to="{ name: 'help' }" :event="fast" v-show="help" class="button">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 28">
              <path d="M14 21.5v-3c0-0.3-0.2-0.5-0.5-0.5h-3c-0.3 0-0.5 0.2-0.5 0.5v3c0 0.3 0.2 0.5 0.5 0.5h3c0.3 0 0.5-0.2 0.5-0.5zM18 11c0-2.9-3-5-5.7-5-2.5 0-4.5 1.1-5.8 3.3-0.1 0.2-0.1 0.5 0.1 0.7l2.1 1.6c0.1 0.1 0.2 0.1 0.3 0.1 0.1 0 0.3-0.1 0.4-0.2 0.7-0.9 1-1.2 1.3-1.4 0.3-0.2 0.8-0.4 1.3-0.4 1 0 1.9 0.6 1.9 1.3 0 0.8-0.4 1.2-1.4 1.7-1.1 0.5-2.6 1.8-2.6 3.3v0.6c0 0.3 0.2 0.5 0.5 0.5h3c0.3 0 0.5-0.2 0.5-0.5v0c0-0.4 0.5-1.1 1.2-1.5 1.2-0.7 2.8-1.6 2.8-4zM24 14c0 6.6-5.4 12-12 12s-12-5.4-12-12 5.4-12 12-12 12 5.4 12 12z"/>
            </svg>
          </router-link>
        </div>
      </nav>
  </header>
</template>

<script>
export default {
  name: 'navbar',
  props: { },
  data: () => ({
    fast: ['mousedown', 'touchstart']
  }),
  computed: {
    back() { return this.$route.name !== 'main' },
    help() { return ['settings', 'support'].indexOf(this.$route.name) >= 0 },
    settings() { return ['main', 'dis'].indexOf(this.$route.name) >= 0 },
    semester() { return this.$route.name === 'main' },

    month() {
      let month = new Date().getMonth() + 1
      return (month === 1 || month >= 9) ? 'Осень' : 'Весна'
    },
    year() { return new Date().getFullYear().toString().slice(2) }
  },
  methods: {
    goBack() { window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/') }
  }
}
</script>

<style scoped>
  .semester {
    font-size: 0.8em;
    vertical-align: 10%;
    font-variant: small-caps;
  }

  .icon {
    width: auto;
    height: 1.1em;
    vertical-align: -10%;
    fill: currentColor;
  }

  .icon.back { vertical-align: -15% }

  header {
    background: #777;
    box-shadow: 0 5px 5px #e1e2e2;
    margin-bottom: 5px;
  }

  nav {
    padding: 0.35em 0.6em;
    color: hsla(180, 2%, 100%, 1);
    vertical-align: middle;
    font-size: 1.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .right > * {
    padding-left: 0;
  }

  .right {
    margin-left: auto;
  }
</style>
