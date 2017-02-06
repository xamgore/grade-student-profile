import axios from 'axios'

const api = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:3001/`,
  timeout: 3000
})

const getDisc = id =>
  api.get(`/disciplines/${id}`)
    .then(res => {
      delete res.data.id
      window.localStorage.setItem(`dis${id}`, JSON.stringify(res.data))
      return res.data
    })

const getSummary = () =>
  api.get(`/summary`)
    .then(res => {
      // cache disciplines
      res.data.forEach(d => {
        let cached = window.localStorage.getItem(`dis${d.id}`)
        if (cached === null) getDisc(d.id)
      })

      window.localStorage.setItem(`summary`, JSON.stringify(res.data))
      return res.data
    })

export { api, getDisc, getSummary }
