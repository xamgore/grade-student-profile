<template>
  <label class="switch">
    <input type="checkbox" :id="id" :checked="value" @change="update" :disabled="disabled">
    <div class="slider" :class="{ disabled: disabled !== false }"></div>
  </label>
</template>

<script>
export default {
  name: 'settings',
  props: { id: { default: '' }, value: { default: '' }, disabled: { default: false } },
  methods: { update(e) { this.$emit('input', e.target.checked) } }
}
</script>

<style scoped>
  .switch input {
    display: none
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 3.8em;
    height: 2.2em;
    font-size: 0.6rem;
    margin-top: 0.2em;
  }

  .slider {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 1.5em;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.6em;
    width: 1.6em;
    left: 0.33em;
    bottom: 0.33em;
    background-color: white;
    transition: .4s;
    border-radius: 1.5em;
  }

  .slider.disabled:before {
    background-color: #ececec;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(1.6em);
  }
</style>
