import Axios from "axios"

const { VITE_BACKEND_URL } = import.meta.env

const Http = Axios.create({
  baseURL: VITE_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

export default Http