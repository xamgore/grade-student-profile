<template>
  <div class="page">

    <opt v-model="val">Упрощённая схема цветов для зачётов</opt>
    <opt disabled>Здравый смысл у преподавателей</opt>
    <opt disabled>Повышенная стипендия</opt>
    <opt disabled>ПМ лучше ИТ</opt>

    <div style="display:flex;justify-content:center; margin-top:2em">
      <button class="exit">
        Выйти из аккаунта
      </button>
    </div>
  </div>
</template>

<script>
import Opt from './Option'

export default {
  name: 'settings',
  components: { Opt },
  data: () => ({ val: false })
}
</script>

<style scoped>
  .page {
    margin: 10px;
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
