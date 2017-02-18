<template>
  <div class="page">
    <template v-if="name">
      <h2 class="title">{{ name }}</h2>

      <ul>
        <li v-for="teacher in teachers">
          <small>{{ teacher }}</small>
        </li>
      </ul>

      <module v-for="m in regular" :submodules="m.submodules" :showRate="mRating">
        {{ m.name }}
      </module>

      <module v-if="type === 'exam'" :submodules="examModule.submodules" :threshold="examThreshold">
        {{ examModule.name }}
      </module>

      <module :submodules="[{rate: finalRate, maxRate: 100}]" :threshold="0.6" style="padding: 0">
        Итоговый рейтинг: {{ finalRate }} / 100
      </module>
    </template>

    <div v-else style="text-align:center;margin-top:100px;overflow:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 28">
        <path d="M23.6 16.5c0 0 0 0.1 0 0.1-1.3 5.5-5.9 9.4-11.7 9.4-3 0-6-1.2-8.2-3.3l-2 2c-0.2 0.2-0.4 0.3-0.7 0.3-0.5 0-1-0.5-1-1v-7c0-0.5 0.5-1 1-1h7c0.5 0 1 0.5 1 1 0 0.3-0.1 0.5-0.3 0.7l-2.1 2.1c1.5 1.4 3.4 2.2 5.4 2.2 2.8 0 5.4-1.4 6.8-3.8 0.4-0.6 0.6-1.2 0.8-1.8 0.1-0.2 0.2-0.4 0.5-0.4h3c0.3 0 0.5 0.2 0.5 0.5zM24 4v7c0 0.5-0.5 1-1 1h-7c-0.5 0-1-0.5-1-1 0-0.3 0.1-0.5 0.3-0.7l2.2-2.2c-1.5-1.4-3.4-2.1-5.5-2.1-2.8 0-5.4 1.4-6.8 3.8-0.4 0.6-0.6 1.2-0.8 1.8-0.1 0.2-0.2 0.4-0.5 0.4h-3.1c-0.3 0-0.5-0.2-0.5-0.5v-0.1c1.3-5.5 6-9.4 11.7-9.4 3.1 0 6 1.2 8.3 3.3l2-2c0.2-0.2 0.4-0.3 0.7-0.3 0.5 0 1 0.5 1 1z"/></svg>
    </div>
  </div>
</template>

<script>
import Module from './Module'
import { getDisc } from '../../api'
import bus from '../../events'

export default {
  props: ['id'],
  name: 'discipline',
  components: { Module },
  data: () => ({
    name: null, type: '', teachers: [], modules: []
  }),
  created() {
    this.mRating = bus.mRating

    getDisc(this.id).then(data => { Object.assign(this, data) })
      .catch(err => this.name || window.alert('Ошибка на сервере') || this.$router.go(-1))

    let data = window.localStorage.getItem(`dis${this.id}`)
    if (data !== null) Object.assign(this, JSON.parse(data))
  },
  methods: {
    getModule(type) {
      let m = this.modules.filter(m => m.type === type)[0]
      return m && m.submodules[0] || {}
    }
  },
  computed: {
    exam() {
      return Object.assign(this.getModule('exam'), { name: 'Экзамен по курсу' })
    },

    bonus() {
      return Object.assign(this.getModule('bonus'), { name: 'Бонусные баллы' })
    },

    extra() {
      return Object.assign(this.getModule('extra'), { name: 'Добор баллов', maxRate: 0 })
    },

    regular() {
      return this.modules.filter(m => m.type === 'regular') || 0
    },

    regularRate() {
      let sum = 0
      this.regular.forEach(m => m.submodules.forEach(s => { sum += s.rate || 0 }))
      return sum
    },

    finalRate() {
      return (this.exam.rate || 0) + (this.bonus.rate || 0) + (this.extra.rate || 0) + this.regularRate
    },

    examModule() {
      let noextra = this.extra.rate === null
      let tip = this.regularRate + (this.extra.rate || 0) < 38 ? '(допуска нет)' : ''
      return { name: `Экзамен ${tip}`, submodules: [this.extra, this.exam, this.bonus].slice(noextra, 3) }
    },

    examThreshold() {
      return (22 + (this.bonus.rate || 0)) / (40 + this.bonus.maxRate || 0)
    }
  }
}
</script>

<style scoped>
  .icon {
    animation: spin 2s infinite linear;
    fill: #455a64;
    width: auto;
    height: 3em;
  }

  @keyframes spin {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(359deg) }
  }

  .strip {
    font-weight: 400;
    line-height: 1.2em;
    margin: 0;
    margin-bottom: 6px;
    padding: 10px;
    background-color: rgba(3, 169, 244, 0.14);
  }

  .title {
    margin-top: 0;
    margin-bottom: 0px;
    font-size: 1.8em;
  }

  .page {
    overflow: auto;
    margin-top: 10px;
  }

  .page > * {
    padding: 10px;
  }

  .page ul {
    margin: 0;
    list-style: none;
  }

  .page li {
    padding-bottom: 5px;
  }
</style>
