<template>
  <div>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      style="width: 200px"
      theme="light"
      @click="menuClick"
    >
      <template v-for="item in navigation" :key="item.key">
        <a-menu-item v-if="!item.child" :key="item.key" :path="item.path">
          <template v-if="item.icon" #icon/>
          {{ item.title }}
        </a-menu-item>
        <a-sub-menu v-else :key="item.key">
          <template v-if="item.icon" #icon></template>
          <template #title>{{ item.title }}</template>
          <a-menu-item v-for="res in item.child" :key="res.key" :path="res.path">{{ res.title }}</a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>

</template>

<script setup>
import { Menu as AMenu, MenuItem as AMenuItem, SubMenu as ASubMenu } from "ant-design-vue";
const { route, router } = reactive({
  router: new useRouter(),
  route: new useRoute()
})
const navigation = ref(router.options.routes[0].children.map(item => {
  return {
    title: item.meta.title,
    key: item.meta.key,
    path: item.path
  }
}))
let { selectedKeys, openKeys } = {
  selectedKeys: ref(['read']),
  openKeys: ref([]),
}

/**
 * @description 菜单路由跳转
 * @param item
 */
const menuClick = (item) => {
  const { path } = item.item
  if (route.path !== path) {
    router.push(path)
  }
}
</script>
