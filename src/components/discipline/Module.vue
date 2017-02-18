<template>
  <div class="module">
    <div class="strip" :class="{ warning: moduleIsBad }">
      <h3 class="name"><slot></slot></h3>
      <span v-if="showRate" class="rate">{{ studentRate }} / {{ maxPossibleRate }}</span>
    </div>

    <submodule v-for="s in submodules" :s="s" />
  </div>
</template>

<script>
import Submodule from './Submodule'

export default {
  name: 'module',
  components: { Submodule },
  props: {
    'showRate': { default: false },
    'threshold': { default: 0.5 },
    'submodules': { type: Array, default: () => [] }
  },
  computed: {
    moduleIsBad() { return !this.submodules.length || this.progress < this.threshold },

    score() {
      const sum = ([maxRate, rate], s) => [maxRate + s.maxRate || 0, rate + s.rate || 0]
      return this.submodules.reduce(sum, [0, 0])
    },

    studentRate() { return this.score[1] },

    maxPossibleRate() { return this.score[0] },

    progress() {
      return this.studentRate / (this.maxPossibleRate || 1)
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
    margin: 0;
    margin-bottom: 6px;
    padding: 10px;
    background-color: rgba(3, 169, 244, 0.14);
    background-color: rgba(0, 195, 15, 0.14);
    transition: background 0.5s ease-in;
    display: flex;
    align-items: center;
  }

  .strip.danger {
    background-color: rgba(242, 2, 2, 0.14);
  }

  .strip.warning {
    background-color: rgba(242, 179, 2, 0.2);
  }

  .strip .name {
    font-weight: 400;
    line-height: 1.2em;
    padding: 0;
    margin: 0;
    margin-right: auto;
    align-self: center;
  }

  .strip .rate {
    color: #626262;
    font-size: 0.66em;
    line-height: 1.22em;
    white-space: nowrap;
    flex-shrink: 0;
    font-weight: bold;
    margin-left: 0.5em;
    padding: 0.3em;
    border-radius: 4px;
    background-color: white;
  }
</style>
