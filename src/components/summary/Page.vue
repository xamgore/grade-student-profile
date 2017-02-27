<template>
  <div :class="['disciplines', !list.length ? 'message' : '']" v-if="info.length || serverAnswered">

    <template v-if="!info.length && serverError">
      <img src="~assets/404.png" class="errorImage" alt=""/>

      <h1>Сервер недоступен :(</h1>
      <span>
        Возможно, он сломался или ведутся технические работы.
        <br><br>
        Не расстраивайтесь.
      </span>
    </template>

    <template v-else-if="!info.length && serverAnswered">
      <img src="~assets/nosummary.png" class="errorImage" alt=""/>

      <h1>Курсов нет :(</h1>
      <span>
        Возможно, семестр ещё не начался или о вас просто забыли.
        <br><br>
        Не расстраивайтесь.
      </span>
    </template>

    <template v-else-if="grItems">
      <div v-if="exams.length">
        <div class="disclaimer">Экзамены</div>
        <item v-for="d in exams" :score="d.rate" :mark="d.mark" :type="d.type" :id="d.id">{{ d.name }}</item>
      </div>

      <div v-if="gr_credits.length">
        <div class="disclaimer credit">Диф. зачёты</div>
        <item v-for="d in gr_credits" :score="d.rate" :mark="d.mark" :type="d.type" :id="d.id">{{ d.name }}</item>
      </div>

      <div v-if="credits.length">
        <div class="disclaimer credit">Зачёты</div>
        <item v-for="d in credits" :score="d.rate" :mark="d.mark" :type="d.type" :id="d.id">{{ d.name }}</item>
      </div>
    </template>

    <template v-else>
      <item v-for="d in list" :score="d.rate" :mark="d.mark" :type="d.type" :id="d.id">{{ d.name }}</item>
    </template>

  </div>
</template>

<script>
import Item from './Item'
import { getSummary } from '../../api'
import bus from '../../events'
import getECTSMark from './marks'

export default {
  name: 'disciplines-list',
  components: { Item },
  data: () => ({
    info: [],
    serverError: false,
    serverAnswered: false,
    sColors: false,
    sByName: false,
    grItems: false
  }),
  computed: {
    exams() {
      return this.list.filter(d => d.type === 'exam')
    },
    gr_credits() {
      return this.list.filter(d => d.type === 'grading_credit')
    },
    credits() {
      return this.list.filter(d => d.type !== 'exam' && d.type !== 'grading_credit')
    },
    list() {
      const pos = ch => ['A', 'B', 'C', 'D', 'E', 'FX', 'F', ''].indexOf(ch)
      const by = {
        mark: (a, b) => pos(a.mark) - pos(b.mark) || b.rate - a.rate,
        name: (a, b) => a.name.localeCompare(b.name)
      }

      return this.markedList.sort(by[this.sByName ? 'name' : 'mark'])
    },
    markedList() {
      const creditPassed = (type, mark) => this.sColors && type === 'credit' && mark <= 'D'
      return this.info.map(d => {
        let mark = getECTSMark(d.rate, d.maxRate)
        d.mark = creditPassed(d.type, mark) ? 'A' : mark
        return d
      })
    }
  },
  created() {
    this.sColors = bus.sColors
    this.sByName = bus.sByName
    this.grItems = bus.grItems

    getSummary().then(info => { this.info = info })
      .catch(err => { this.serverError = true })
      .then(() => { this.serverAnswered = true })

    let data = window.localStorage.getItem(`summary`)
    if (data !== null) this.info = JSON.parse(data)
  }
}
</script>

<style scoped>
  .disclaimer {
    background-color: #eff0f0;
    padding: 3px 8px 5px;
    color: #5a5a5a;
  }

  .disclaimer.credit {
    margin-top: 4px;
    padding: 4px 8px 6px
  }

  .message {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .message h1 {
    color: #444;
    font-weight: lighter;
    font-family: Verdana;
    font-size: 1.5em;
    font-weight: 400;
  }

  .message span {
    color: #555;
    letter-spacing: 0.5px;
    font-size: 0.95em;
    font-family: Helvetica;
    text-align: center;
    width: 18em;
  }

  .errorImage {
    image-rendering: pixelated;
  }

</style>
