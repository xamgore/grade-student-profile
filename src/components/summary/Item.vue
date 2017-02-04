<template>
  <div class="item">
    <router-link :to="{ path: '/dis/' + id }" :event="['mousedown']" class="row">
      <div :class="['circle', mark]">{{ score }}</div>

      <div class="name"><slot></slot></div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['score', 'mark', 'id', 'type'],
  name: 'discipline-item'
}
</script>

<style scoped>
  .item {
    padding: 0 8px;
  }

  .item:hover, .item:focus {
    background: #f0f0f0;
  }

  .row {
    display: flex;
    padding: 8px 0;
    border-bottom: 1.5px solid #eee;
    color: #616161;
    font-size: 1.25em;
    line-height: 1.1em;
  }

  .item:last-child .row {
    border-bottom: 0
  }

  .name {
    margin: auto 0;
    font-family: 'PT Sans', sans-serif;
  }

  .circle {
    display: block;
    margin: auto 11px auto 0;
    min-width: 48px;
    min-height: 48px;
    border-radius: 50%;
    background-color: #ccc;
    color: #eef1f2;
    vertical-align: middle;
    text-align: center;
    font-size: 1rem;
    line-height: 48px;
  }

  /*#43A047 #7eba3c #349920*/
  .A  { background: #388e3c; }
  .B  { background: #60b635; }
  .C  { background: #9acd0e; }
  .D  { background: #fdd835; color: #212121; }
  .E  { background: #fb8c00; }
  .FX { background: #f4511e; }
  .F  { background: #e53935; }
</style>
