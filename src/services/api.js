import axios from 'axios'

const api = axios.create({ baseURL: 'https://fit-stock-api.herokuapp.com/api/' })

export default api