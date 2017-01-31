<template>
  <div v-if="!!s.name" class="submodule">

    <div class="name">{{ s.name }}</div>

    <transition name="badge">
      <span v-if="showDiff" :class="['change', diff > 0 ? 'good' : 'bad']">
        {{ diff > 0 ? '+' : '−' }}{{ Math.abs(diff) }}
      </span>
    </transition>

    <div v-if="null !== maxRate" class="rates">
      <span style="text-align: right">{{ rate }} / {{ maxRate }}</span>
      <span class="date">{{ date | shortDate }}</span>
    </div>

  </div>
</template>

<script>
export default {
  props: ['s'],
  name: 'submodule',
  computed: {
    date() { return this.s.date || '' },
    rate() { return this.s.rate || 0 },
    oldRate() { return this.s.oldRate || 0 },
    maxRate() { return this.s.maxRate || null },
    diff() { return this.rate - this.oldRate },
    showDiff() { return (this.s.oldRate !== undefined) && this.diff !== 0 }
  },
  filters: {
    shortDate(d) {
      if (!d) return ''

      let [day, mon] = d.split('.').slice(0, 2)
      let short = ['янв', 'февр', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек']

      return `${day} ${short[mon - 1]}`
    }
  }
}
</script>

<style scoped>
  .submodule {
    display: flex;
    align-items: center;
    color: #333;
    padding: 4px 10px 4px;
    min-height: 2.66em;
  }

  .submodule .rates {
    flex-shrink: 0;
    /*flex-basis: auto;*/
    white-space: nowrap;
    padding-left: 0.5em;
    display: flex;
    flex-direction: column;
  }

  .submodule .name {
    margin-right: auto;
  }

  .change {
    margin-left: 0.5em;
    padding: 0 5px;
    border-radius: 7px;
    background-color: #2196f3;
    background-color: #13c000;
    background-color: #44cc75;
    color: white;
    font-size: 0.65em;
    white-space: nowrap;
    text-align: center;
    transition: all .5s;
  }

  .change.bad {
    background-color: #F44336;
    background-color: #f49836;
  }

  .badge-enter, .badge-leave-to {
    opacity: 0;
  }

  .date {
    color: #bbb;
    font-size: 0.7em;
    text-align: right;
  }
</style>
