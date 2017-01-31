<template>
  <div class="page" v-if="name">

    <h2 class="title">{{ name }}</h2>

    <ul>
      <li v-for="teacher in teachers">
        <small>{{ teacher }}</small>
      </li>
    </ul>

    <module v-for="m in modules" :submodules="m.submodules">
      {{ m.name }}
    </module>

    <module v-if="type === 'exam'" :submodules="examModule.submodules">
      {{ examModule.name }}
    </module>

    <module :submodules="[{rate: final, maxRate: 100}]" :threshold="0.6" style="padding: 0">
      Итоговый рейтинг: {{ final }} / 100
    </module>

  </div>
</template>

<script>
import Module from './Module'

let timerId

export default {
  props: ['id'],
  name: 'discipline',
  components: { Module },
  data: () => ({
    name: null,
    type: '',
    teachers: [],
    extraRate: null,
    modules: [],
    exam: {},
    bonus: null
  }),
  created() {
    const getDiscipline = () =>
      axios.get(`http://${window.location.hostname}:3001/disciplines/${this.id}`)  // eslint-disable-line
        .then(res => {
          delete res.data.id
          Object.assign(this, res.data)

          timerId = setTimeout(getDiscipline, 1000)
        })

    getDiscipline()
  },
  destroyed() {
    clearTimeout(timerId)
  },
  computed: {
    total() {
      let sum = 0
      this.modules.forEach(m => m.submodules.forEach(s => { sum += s.rate || 0 }))
      return sum
    },

    final() {
      return (this.exam && this.exam.rate || 0) +
             (this.bonus && this.bonus.rate || 0) + this.total
    },

    examModule() {
      let subs = []

      if (this.extraRate) {
        subs.push(Object.assign({ name: 'Добор баллов' }, { rate: this.extraRate, maxRate: 0 }))
      }

      subs.push(Object.assign({ name: 'Экзамен по курсу' }, this.exam))
      subs.push(Object.assign({ name: 'Бонусные баллы' }, this.bonus))

      let tip = this.total + (this.extraRate || 0) < 38 ? '(допуска нет)' : ''
      return { name: `Экзамен ${tip}`, submodules: subs }
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
