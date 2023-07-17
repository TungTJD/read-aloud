import http from './axios.js'

export function saveUserInfo(data) {
  return http.request({
    url: '/save-data',
    method: 'post',
    data
  })
}

export function getUserInfo(params) {
  return http.request({
    url: '/get-data',
    method: 'get',
    params
  })
}

export function getCsrf(params) {
  return http.request({
    url: '/get-csrf',
    method: 'get',
    params
  })
}
