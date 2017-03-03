<template>
  <div style="padding: 0.6em 0.7em">
    <form @submit.prevent="send">
      <textarea class="input" type="text" v-model="msg"
              placeholder="Описание вопроса или проблемы" required />

      <input type="submit" class="button" value="Отправить" :disabled="disabled"/>
    </form>
  </div>
</template>

<script>
import { sendIssue } from '../../api'

export default {
  name: 'support',
  data: () => ({ msg: '', disabled: false }),
  methods: {
    send() {
      this.disabled = true

      sendIssue(this.msg)
        .then(() => { window.alert('Сообщение успешно доставлено!'); this.msg = '' })
        .catch(() => window.alert('Произошёл сбой! Попробуйте отправить сообщение позже, мы его сохранили.'))
        .then(() => { this.disabled = false; this.$router.push('/') })
    }
  },
  watch: {
    msg() { window.localStorage.setItem('support', this.msg) }
  },
  created() {
    this.msg = window.localStorage.getItem('support') || ''
  }
}
</script>

<style scoped>
  textarea {
    all: initial;
    font: inherit;
    font-size: 1.1em;
    width: 100%;
    margin: 1 0em;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-collapse: collapse;
    background: white;
    box-sizing: border-box;
    min-height: 10em;
    resize: vertical;
    word-break: break-word;
  }

  .button {
    display: block;
    padding: 0.5em 1em;
    margin: 0.5em auto;
    outline: none;
    border: 0;
    border-radius: 0.3em;
    color: white;
    font: inherit;
    cursor: pointer;
    background-color: #2196F3;
  }

  .button:focus, .button:active { background-color: #0c85e9; }

  .button[disabled] { background-color: #ccc }
</style>
