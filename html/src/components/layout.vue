<template>
  <a-layout>
    <a-layout-sider style="background: #fff">
      <Menu></Menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="height: 100vh;">
        <div style="height: 100%;overflow-y: auto;padding: 16px">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Menu from './menu.vue'
import {
  Layout as ALayout,
  LayoutContent as ALayoutContent,
  LayoutSider as ALayoutSider
} from 'ant-design-vue'
</script>
