<template>
  <div :class="['disciplines', !list.length ? 'message' : '']">

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

export default {
  name: 'disciplines-list',
  components: { Item },
  data: () => ({
    info: [
      { id: 1, name: 'Интеллектуальные системы', score: 100, mark: 'A' },
      { id: 2, name: 'Компьютерная графика', score: 97, mark: 'B' },
      { id: 3, name: 'Функциональное программирование', score: 61, mark: 'C' },
      { id: 3, name: 'Функциональное программирование', score: 61, mark: 'D' },
      { id: 3, name: 'Функциональное программирование', score: 61, mark: 'E' },
      { id: 4, name: 'Компиляторостроение, философия и ерундистика', score: 97, mark: 'FX' },
      { id: 4, name: 'Теория формальных языков и автоматных грамматик и какая-нибудь курсовая к этому ещё', score: 38, mark: 'F' },
      { id: 4, name: 'Левый курс', score: '', mark: '' },
      { id: 4, name: 'Средний курс', score: '', mark: '' },
      { id: 4, name: 'Правый курс', score: '', mark: '' }
    ]
  }),
  computed: {
    list() {
      const pos = ch => ['A', 'B', 'C', 'D', 'E', 'FX', 'F', ''].indexOf(ch)
      const byMark = (a, b) => pos(a.mark) - pos(b.mark) || b.score - a.score
      return this.info.sort(byMark)
    }
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
