import { defineStore } from "pinia";
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  let count = ref(0);
  const increment = () => {
    count.value++
  };
  return { count, increment }

});
