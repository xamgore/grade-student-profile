<template>
  <div class="page">

    <opt @input="simplifyColors" v-model="sColors">Упрощённая схема цветов для зачётов</opt>
    <opt @input="changeSortings" v-model="sByName">Сортировать дисциплины по названию</opt>
    <opt @input="changeGrouping" v-model="grItems">Разделять экзамены от зачётов</opt>
    <opt @input="showModuleRate" v-model="mRating">Подсчитывать баллы в модуле</opt>
    <opt @input="changeFontSize" v-model="bigFont">Увеличенные шрифты</opt>
    <opt disabled>Сделать ПМ лучше ИТ</opt>

    <div style="display:flex;justify-content:center; margin:2em 0">
      <button class="exit" @click="exit">Выйти из аккаунта</button>
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
    grItems: false
  }),
  methods: {
    changeFontSize: v => bus.$emit('changeFontSize', v),
    simplifyColors: v => bus.$emit('simplifyColors', v),
    changeSortings: v => bus.$emit('changeSortings', v),
    changeGrouping: v => bus.$emit('changeGrouping', v),
    showModuleRate: v => bus.$emit('showModuleRate', v),
    exit() { window.localStorage.clear() || this.$router.replace('/') }
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

  .exit {
    display: block;
    padding: 0.5em 1em;
    outline: none;
    border: 0;
    border-radius: 0.3em;
    background-color: #2196F3;
    color: white;
    font: inherit;
  }

  .exit:focus, .exit:active {
    background-color: #0c85e9;
  }
</style>
