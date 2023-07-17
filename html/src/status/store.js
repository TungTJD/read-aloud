import { defineStore } from "pinia";
import { computed, ref } from 'vue'

const useStore = defineStore('user', {
  state: () => ({
    name: 'lay',
    sex: 'boy',
    isAdmin: true,
    items: [],
    count: 1,
  }),
  getters: {
    info: (state) => state.name + state.sex,
    doubleCount: (state) => {
      return state.count * 2
    },
  },
  actions: {
    editInfo(name) {
      this.name = name;
    },
    getInfo() {
      return this.name + this.sex
    },
  },
});
const useMain = defineStore('main', {
  state: () => ({
    name: 'main',
    count: 1,
    info: {
      '1': 'admin',
      '2': 'system',
      '3': 'super',
    },
  }),
  getters: {
    getUserById: (state) => {
      return (id) => {
        return state.info[id]
      }
    },
    getCountNum: (state) => {
      return state.count
    },
  },
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
});
const useLogin = defineStore('login', () => {
  let count = ref(0);
  const doubles = computed(() => {
    return count.value * 2
  });
  const increment = () => {
    count.value++;
    sessionStorage.setItem('count', count.value);
  };
  return {
    count,
    doubles,
    increment,
  }
});

export {
  useStore,
  useMain,
  useLogin,
}
