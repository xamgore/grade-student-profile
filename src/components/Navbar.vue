<template>
  <header>

    <div>
      <a v-show="home" class="button" href="/" title="На главную">
        <i class="fa fa-home fa-bg fa-fw"></i>
      </a>

      <slot></slot>
    </div>

    <div class="right">
      <a v-show="settings" class="button" href="#" title="Настройки">
        <i class="fa fa-cog fa-bg fa-fw"></i>
      </a><a v-show="exit" class="button" href="/sign/out" title="Выход">
        <i class="fa fa-sign-out fa-bg fa-fw"></i>
      </a>
    </div>

  </header>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    home: { default: false },
    exit: { default: true },
    settings: { default: true }
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
