import axios from 'axios'
const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : ''

const headers = {
  'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': process.env.REACT_APP_PROD_API_URL,
  // 'Access-Control-Request-Headers': 'Content-Type, Authorization'
}

export default axios.create({
  baseURL: apiUrl,
  headers,
  mode: 'no-cors',
})
