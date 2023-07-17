<template>
  <div>{{ msg }}</div>
</template>

<script setup>
const msg = ref('公共的过滤框');
defineExpose({
  msg
})
</script>
