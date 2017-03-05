<template>
  <div class="item">

    <router-link :to="{ path: '/dis/' + id }" :event="['mousedown']" class="row">
      <score :mark="mark" v-text="score"/>
      <div class="name"><slot></slot></div>
    </router-link>

  </div>
</template>

<script>
import Score from './Circle'

export default {
  components: { Score },
  props: ['score', 'mark', 'id', 'type'],
  name: 'discipline-item'
}
</script>

<style scoped>
  .item { padding: 0 8px }

  .item:hover, .item:focus {
    background: #f0f0f0;
  }

  .row {
    display: flex;
    padding: 8px 0;
    border-bottom: 1.5px solid rgba(238, 238, 238, 0.75);
    color: #616161;
    font-size: 1.25em;
    line-height: 1.1em;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  .item:last-child .row {
    border-bottom: 0
  }

  .name {
    margin: auto 0 auto 11px;
    font-family: 'PT Sans', sans-serif;
  }
</style>
