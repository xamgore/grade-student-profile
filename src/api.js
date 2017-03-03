import axios from 'axios'

let api

if (process.env.NODE_ENV === 'production') {
  api = axios.create({
    params: { token: document.cookie.match(/token=([^;]+)/) },
    baseURL: `/api/v2017/student/`,
    timeout: 5000
  })
} else {
  api = axios.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}:3001/`,
    timeout: 3000
  })
}

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

const sendIssue = (msg) =>
  api.post(`/support`, { message: msg })

export { api, getDisc, getSummary, sendIssue }
