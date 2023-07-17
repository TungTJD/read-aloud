import { h, ref } from 'vue'

let hello = ref('hello');
const helloHandle = () => {
  hello.value = 'godbay'
}
const vnode = h(
  'div', { class: 'vnode' },
  [
    h( 'div', { innerHTML: 'vnode' }),
    h('span', { '.name': 'bar', '^width': '100', innerHTML: '自定义参数' }),
    h('div', { class: hello.value, onClick: helloHandle }, hello.value),
  ],
)

export default vnode
