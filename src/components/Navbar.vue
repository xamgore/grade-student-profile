<template>
  <header>

    <div>
      <a @click="goBack" :event="fast" v-show="back" class="button">
        <i class="fa fa-chevron-left fa-bg fa-fw" style="font-size: 0.9em"></i>
      </a>

      <slot></slot>
    </div>

    <div class="right">
      <router-link :to="{ name: 'settings' }" :event="fast" v-show="settings" class="button">
        <i class="fa fa-cog fa-bg fa-fw"></i>
      </router-link>
    </div>

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
    settings() { return this.$route.name !== 'settings' }
  },
  methods: {
    goBack() { window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/') }
  }
}
</script>

<style scoped>
  header {
    height: 52px;
    background: #777;
    box-shadow: 0 5px 5px #e1e2e2;
    color: hsla(180, 2%, 100%, 1);
    vertical-align: middle;
    font-size: 1.5rem;
    line-height: 52px;
    overflow: hidden;
    margin-bottom: 5px;
    display: flex;
  }

  .button {
    padding: 0 0.5em;
  }

  .right > * {
    padding-left: 0;
  }

  .right {
    margin-left: auto;
  }
</style>
