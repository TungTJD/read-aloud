import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './index'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
