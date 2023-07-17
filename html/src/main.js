import App from './App.vue'
import router from '../src/router/config'
import 'ant-design-vue/dist/antd.css';
import comp from './utils/component'
import { registerStore } from './status'

createApp(App)
  .use(router)
  .use(comp)
  .use(createPinia())
  .mount('#app')

registerStore()
