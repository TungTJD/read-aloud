import axios from "axios";
const API_BASE_URL = process.env.NODE_ENV === 'development'? '/api' : ''
const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': sessionStorage.getItem('csrf')
  },
})
instance.interceptors.request.use(config => {
  console.log(config);
  return config;
},error => {

})

instance.interceptors.response.use(response => {
  return response
},error => {

})

export default instance
