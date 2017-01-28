<template>
  <div id="app">
    <navbar :home="true"></navbar>

    <disciplines/>
  </div>
</template>

<script>
import Disciplines from './components/summary/List'
import Navbar from './components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar, Disciplines
  }
}
</script>

<style>
  *, *::before, *::after {
    box-sizing: inherit;
  }

  html, body, #app {
    height: 100%;
  }

  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: PT Sans,sans-serif;
    background-color: rgba(231, 231, 231, 0.29);
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  #app > * {
    flex-shrink: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>
