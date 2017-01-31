<template>
  <div class="module">
    <h3 class="strip" :class="{ warning: moduleIsBad }"><slot></slot></h3>

    <submodule v-for="s in submodules" :s="s" />
  </div>
</template>

<script>
import Submodule from './Submodule'

export default {
  name: 'module',
  components: { Submodule },
  props: {
    'threshold': { default: 0.5 },
    'submodules': { type: Array, default: () => [] }
  },
  computed: {
    moduleIsBad() { return !this.submodules.length || this.progress < this.threshold },
    progress() {
      const sum = ([maxRate, rate], s) => [maxRate + s.maxRate || 0, rate + s.rate || 0]
      const [total, student] = this.submodules.reduce(sum, [0, 0])
      return student / (total || 1)
    }
  }
}
</script>

<style scoped>
  .module {
    padding-left: 0;
    padding-right: 0;
    margin-bottom: 0px;
  }

  .strip {
    font-weight: 400;
    line-height: 1.2em;
    margin: 0;
    margin-bottom: 6px;
    padding: 10px;
    background-color: rgba(3, 169, 244, 0.14);
    background-color: rgba(8, 175, 21, 0.14);
    transition: background 0.5s ease-in;
  }

  .strip.danger {
    background-color: rgba(242, 2, 2, 0.14);
  }

  .strip.warning {
    background-color: rgba(242, 179, 2, 0.2);
  }
</style>
