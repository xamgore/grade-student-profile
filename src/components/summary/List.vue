<template>
  <div :class="['disciplines', !list.length ? 'message' : '']" v-if="info">

    <template v-if="list.length">
      <item v-for="d in list" :score="d.score" :mark="d.mark" :id="d.id">
        {{ d.name }}
      </item>
    </template>

    <template v-else>
      <div class="notfound"></div>
      <!-- TODO <img src="/static/girlBrown2.png"/> -->

      <h1>Курсов нет :(</h1>
      <span>
        Возможно, семестр ещё не начался или о вас просто забыли.
        <br><br>
        Не расстраивайтесь.
      </span>
    </template>

  </div>
</template>

<script>
import Item from './Item'
import api from '../../api'

export default {
  name: 'disciplines-list',
  components: { Item },
  data: () => ({
    info: null
  }),
  computed: {
    list() {
      const pos = ch => ['A', 'B', 'C', 'D', 'E', 'FX', 'F', ''].indexOf(ch)
      const byMark = (a, b) => pos(a.mark) - pos(b.mark) || b.score - a.score
      return this.info.sort(byMark)
    }
  },
  created() {
    api.get(`/summary`)
      .then(res => { this.info = res.data })
  }
}
</script>

<style scoped>
  .disciplines {

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

</style>
