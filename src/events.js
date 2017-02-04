import Vue from 'vue'

var bus = new Vue({
  data: () => ({
    bigFont: false,
    sColors: false
  }),
  created() {
    var load = () => JSON.parse(window.localStorage.getItem('config'))

    var save = name => val => {
      this[name] = val
      let config = JSON.stringify(this.$data)
      window.localStorage.setItem('config', config)
    }

    Object.assign(this, load() || [])

    this.$on('changeFontSize', save('bigFont'))
    this.$on('simplifyColors', save('sColors'))
  }
})

export default bus
