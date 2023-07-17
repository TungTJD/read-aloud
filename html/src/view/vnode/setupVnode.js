import { h, ref } from 'vue'
export default {
  setup() {
    const count  = ref(1)
    return () => h('div', count.value)
  },
}
