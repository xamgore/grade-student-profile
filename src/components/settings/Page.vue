<template>
  <div class="page">

    <opt @input="simplifyColors" v-model="sColors">Упрощённая схема цветов для зачётов</opt>
    <opt @input="changeFontSize" v-model="bigFont">Увеличенные шрифты</opt>
    <opt disabled>Сделать ПМ лучше ИТ</opt>

    <div style="display:flex;justify-content:center; margin-top:2em">
      <button class="exit">
        Выйти из аккаунта
      </button>
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
    sColors: false
  }),
  methods: {
    changeFontSize: v => bus.$emit('changeFontSize', v),
    simplifyColors: v => bus.$emit('simplifyColors', v)
  },
  created() {
    this.bigFont = bus.bigFont
    this.sColors = bus.sColors
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
