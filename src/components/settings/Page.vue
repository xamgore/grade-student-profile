<template>
  <div class="page">

    <opt @input="simplifyColors" v-model="sColors">Упрощённая схема цветов для зачётов</opt>
    <opt @input="changeSortings" v-model="sByName">Сортировать дисциплины по названию</opt>
    <opt @input="changeGrouping" v-model="grItems">Разделять экзамены от зачётов</opt>
    <opt @input="showModuleRate" v-model="mRating">Подсчитывать баллы в модуле</opt>
    <opt disabled v-show="flipCoin">Сделать ПМ лучше ИТ</opt>

    <div style="margin:2em 0">
      <router-link to="/support" tag="button" class="blue" @click.native="exit">
        Выйти из аккаунта</router-link>

      <router-link to="/support" tag="button" class="gray">
        Написать в поддержку</router-link>
    </div>
  </div>
</template>

<script>
import Opt from './Option'
import bus from '../../events'

export default {
  name: 'settings',
  components: { Opt },
  data: () => ({
    bigFont: false,
    sColors: false,
    sByName: false,
    grItems: false,
    flipCoin: Math.random().toString().slice(2) % 5 === 0
  }),
  methods: {
    changeFontSize: v => bus.$emit('changeFontSize', v),
    simplifyColors: v => bus.$emit('simplifyColors', v),
    changeSortings: v => bus.$emit('changeSortings', v),
    changeGrouping: v => bus.$emit('changeGrouping', v),
    showModuleRate: v => bus.$emit('showModuleRate', v),
    exit() { window.localStorage.clear() }
  },
  created() {
    this.bigFont = bus.bigFont
    this.sColors = bus.sColors
    this.sByName = bus.sByName
    this.grItems = bus.grItems
    this.mRating = bus.mRating
  }
}
</script>

<style scoped>
  .page {
    padding: 10px;
  }

  button {
    display: block;
    padding: 0.5em 1em;
    outline: none;
    border: 0;
    border-radius: 0.3em;
    color: white;
    font: inherit;
    margin-bottom: 0.5em;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
  }

  .blue {
    background-color: #2196F3;
  }

  .blue:focus, .blue:active {
    background-color: #0c85e9;
  }

  .gray {
    background-color: #ccc;
  }
</style>
