<template>
  <div :class="['disciplines', !list.length ? 'message' : '']">

    <template v-if="!list.length && serverError">
      <div class="notfound err404"></div>
      <h1>Сервер недоступен :(</h1>
      <span>
        Возможно, он сломался или ведутся технические работы.
        <br><br>
        Не расстраивайтесь.
      </span>
    </template>

    <template v-else-if="!list.length">
      <div class="notfound"></div>
      <!-- TODO <img src="/static/girlBrown2.png"/> -->

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
    sColors: false,
    sByName: false,
    grItems: false
  }),
  computed: {
    exams() {
      return this.list.filter(d => d.type === 'exam')
    },
    credits() {
      return this.list.filter(d => d.type !== 'exam')
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

  .notfound {
    width: 244px;
    height: 238px;
    background: url(/static/notfound.png) no-repeat;
    background-position: 0 -262px;
    image-rendering: pixelated;
  }

  .notfound.err404 {
    background-position: 0 -500px;
    height: 250px;
    width: 210px
  }

</style>
