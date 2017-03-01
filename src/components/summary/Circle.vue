<template>
  <div :class="['circle', mark, {small}]"><slot></slot></div>
</template>

<script>
export default {
  name: 'circle',
  props: {
    mark: { required: true },
    small: { default: false } }
}
</script>

<style scoped>
  .circle {
    display: block;
    min-width: 48px;
    min-height: 48px;
    line-height: 48px;
    border-radius: 50%;
    background-color: #ccc;
    color: #eef1f2;
    vertical-align: middle;
    text-align: center;
    font-size: 1rem;
  }

  .small {
    min-width: 40px;
    min-height: 40px;
    line-height: 40px;
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
