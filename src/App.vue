<template>
  <div id="app">
    <navbar :home="true"></navbar>

    <discipline/>
  </div>
</template>

<script>
import Discipline from './components/discipline/Page'
import Navbar from './components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar, Discipline
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

  @media screen and (min-device-width: 480px) {
    html, body {
      max-width: 480px;
      margin: auto;
    }
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
