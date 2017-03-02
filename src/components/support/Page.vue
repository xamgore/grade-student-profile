<template>
  <div style="padding: 1em 0.5em 0 0.7em">
    <form @submit.prevent="send">
      <input class="input" type="text" required placeholder="Тема сообщения"/>
      <textarea class="input" type="text" required placeholder="Описание вопроса или проблемы."/>

      <input type="submit" class="button" value="Отправить"/>
    </form>
  </div>
</template>

<script>
export default {
  name: 'support',
  methods: {
    send() {
      window.alert('Не работает :(')
    }
  }
}
</script>

<style scoped>
  .input {
    all: initial;
    font: inherit;
    width: 100%;
    margin: 1 0em;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-collapse: collapse;
    background: white;
    box-sizing: border-box;
  }

  textarea.input {
    min-height: 200px;
    resize: vertical;
  }

  input, textarea:not(:first-child) { border-top: 0 }

  .button {
    display: block;
    padding: 0.5em 1em;
    outline: none;
    border: 0;
    border-radius: 0.3em;
    color: white;
    font: inherit;
    margin-bottom: 0.5em;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    background-color: #2196F3;
  }

  .button:focus, .button:active {
    background-color: #0c85e9;
  }
</style>
