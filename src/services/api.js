import axios from 'axios'

export const api = axios.create({ baseURL: 'https://fit-stock-api.herokuapp.com/api/' })