import axios from 'axios'

const envBase = import.meta.env.VITE_API_BASE_URL
const baseURL = envBase ? envBase.replace(/\/$/, '') : 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.handleError = (err) => {
  if (err.response) {
    console.error('API error', err.response.status, err.response.data)
    return err.response.data
  }
  console.error('Network/API error', err.message)
  return { detail: 'Network error / server unreachable' }
}

export default api
