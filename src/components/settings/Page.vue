<template>
  <div class="page">

    <opt v-model="val">Упрощённая схема цветов для зачётов</opt>
    <opt disabled>Здравый смысл у преподавателей</opt>
    <opt disabled>Повышенная стипендия</opt>
    <opt disabled>ПМ лучше ИТ</opt>

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
</style>
