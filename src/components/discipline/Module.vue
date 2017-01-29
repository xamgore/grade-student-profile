<template>
  <div class="module">
    <h3 class="strip" :class="{ warning: progress < 0.5 }"><slot></slot></h3>

    <div v-for="s in submodules" v-if="!!s.name" class="submodule">
      <span class="name">{{ s.name }}</span>
      <span class="change" v-if="s.rate == 5">+3</span>
      <span class="change bad" v-if="s.rate == 3">−5
      </span>
      <div class="rates" style="padding-left: 0.5em; display: flex; flex-direction: column">
        <span style="text-align: right">{{ s.rate }} / {{ s.maxRate }}</span>
        <span class="date">{{ s.date | shortDate }}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'module',
  props: ['submodules'],
  data: () => ({ }),
  computed: {
    progress() {
      let total = 0, student = 0

      for (let s of this.submodules) {
        student += s.rate
        total += s.maxRate
      }

      return student / total
    }
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
  }

  .strip.danger {
    background-color: rgba(242, 2, 2, 0.14);
  }

  .strip.warning {
    background-color: rgba(242, 179, 2, 0.2);
  }

  .submodule {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #333;
    padding: 4px 10px 4px;
    min-height: 2.66em;
  }

  .submodule .rates {
    white-space: nowrap;
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
  }

  .change.bad {
    background-color: #F44336;
    background-color: #f49836;
  }

  .date {
    color: #bbb;
    font-size: 0.7em;
    text-align: right;
  }
</style>
