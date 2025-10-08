import axios from 'axios'
import Cookies from 'js-cookie'
const instance = axios.create({
  baseURL: 'http://192.168.0.111:3000/snapmart',
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('access')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

export default instance
