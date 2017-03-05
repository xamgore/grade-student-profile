<template>
  <label :for="uniqName" class="line">
    <div class="desc" :class="{ disabled: disabled !== false }"><slot></slot></div>
    <switcher class="switch" :id="uniqName" :value="value" @input="update" :disabled="disabled"/>
  </label>
</template>

<script>
import Switcher from './Switcher'

export default {
  name: 'option',
  components: { Switcher },
  methods: { update(e) { this.$emit('input', e) } },
  props: { value: { default: '' }, disabled: { default: false } },
  data: () => ({ uniqName: 'id' + Math.random().toString().slice(2) })
}
</script>

<style scoped>
  .line {
    display: flex;
    align-items: center;
    color: #333;
    padding: 0.5em 0;
    margin-bottom: 0.5em;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  .line .switch {
    flex-shrink: 0;
    margin-left: 1em;
  }

  .line .desc {
    margin-right: auto;
    font-size: 1.08em;
  }

  .disabled { color: #999 }
</style>
