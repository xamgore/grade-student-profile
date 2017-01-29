<template>
  <div class="page" style="">
    <button style="position: fixed; right: 5px; top: 8px; background: #00bcd4; color: #fff; border: 0" @click="add">add</button>

    <h2 class="title">{{ name }}</h2>

    <ul>
      <li v-for="teacher in teachers">
        <small>{{ teacher }}</small>
      </li>
    </ul>

    <module v-for="m in modules" :submodules="m.submodules">
      {{ m.name }}
    </module>

    <module v-show="type === 'exam'" :submodules="examModule.submodules">
      {{ examModule.name }}
    </module>

    <module :submodules="[{rate: final, maxRate: 100}]" :threshold="0.6" style="padding: 0">
      Итоговый рейтинг: {{ final }} / 100
    </module>

  </div>
</template>

<script>
import Module from './Module'

const rand = (to, from = 0) => (Math.random() * (to - from) + from) | 0

export default {
  name: 'discipline',
  components: { Module },
  methods: {
    add() {
      let m = this.modules[rand(this.modules.length)]
      let s = m.submodules[rand(m.submodules.length)]

      this.modules.forEach(mx => mx.submodules.forEach(sx => { sx.oldRate = NaN }))

      s.oldRate = s.rate
      s.rate = (s.rate !== s.maxRate) ? s.maxRate : 0
    }
  },
  data: () => ({
    name: 'Функциональное программирование',
    type: 'exam',
    teachers: [
      'Брагилевский Виталий Николаевич',
      'Непучкин Максим Валентинович',
      'Barnaby Marmaduke Aloysius Benjy'
    ],
    extraRate: 0,
    modules: [
      {
        name: 'Введение в функциональное программирование и язык Haskell',
        submodules: [
          {
            name: 'Лабораторные занятия',
            maxRate: 5,
            oldRate: 0,
            rate: 3,
            date: '25.10.2016'
          },
          {
            name: 'Домашние задания',
            maxRate: 10,
            rate: 0,
            date: '22.12.2016'
          },
          {
            name: 'Контрольная работа №1',
            maxRate: 8,
            rate: 0,
            date: '27.10.2016'
          }
        ]
      },
      {
        name: 'Классы типов и обобщённые вычисления',
        submodules: [
          {
            name: 'Лабораторные занятия',
            maxRate: 4,
            rate: 0,
            date: '23.12.2016'
          },
          {
            name: 'Домашние задания',
            maxRate: 8,
            rate: 0,
            date: '23.12.2016'
          },
          {
            name: 'Контрольная работа №2',
            maxRate: 8,
            rate: 0,
            date: '19.12.2016'
          }
        ]
      },
      {
        name: 'Продвинутый Haskell',
        submodules: [
          {
            name: 'Лабораторные занятия',
            maxRate: 4,
            rate: 0
          },
          {
            name: 'Домашние задания',
            maxRate: 2,
            rate: 0
          },
          {
            name: 'Проектное задание',
            maxRate: 11,
            rate: 0
          }
        ]
      }
    ],
    exam: {
      maxRate: 40,
      rate: 0,
      date: '17.01.2017'
    },
    bonus: {
      maxRate: 10,
      rate: 10,
      date: '16.01.2017'
    }
  }),
  computed: {
    total() {
      let sum = 0
      this.modules.forEach(m => m.submodules.forEach(s => { sum += s.rate }))
      return sum
    },

    final() {
      return this.exam.rate + this.bonus.rate + this.total
    },

    examModule() {
      let subs = []

      if (this.extraRate) {
        subs.push(Object.assign({ name: 'Добор баллов' }, { rate: this.extraRate, maxRate: 0 }))
      }

      subs.push(Object.assign({ name: 'Экзамен по курсу' }, this.exam))
      subs.push(Object.assign({ name: 'Бонусные баллы' }, this.bonus))

      let tip = this.total + this.extraRate < 38 ? '(допуска нет)' : ''
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
