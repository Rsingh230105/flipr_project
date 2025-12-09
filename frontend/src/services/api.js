import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

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
