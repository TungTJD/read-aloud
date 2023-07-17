import FilterComp from '../components/FilterComp.vue'

const components = [FilterComp];
export default {
  install: app => {
    components.forEach(item => {
      app.component(item['__name'], item)
    })
  },
}
