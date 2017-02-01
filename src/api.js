import axios from 'axios'

const api = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:3001/`,
  timeout: 3000
})

export default api
