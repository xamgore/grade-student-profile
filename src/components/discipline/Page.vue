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

      <module v-if="type === 'exam'" :submodules="examModule.submodules">
        {{ examModule.name }}
      </module>

      <module :submodules="[{rate: finalRate, maxRate: 100}]" :threshold="0.6" style="padding: 0">
        Итоговый рейтинг: {{ finalRate }} / 100
      </module>
    </template>

    <div v-else style="color:#455a64;text-align:center;margin-top:100px;overflow:hidden">
      <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
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
    }
  }
}
</script>

<style scoped>
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
