import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vuejsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  plugins: [
    vue(),
    vuejsx(),
    eslintPlugin({ include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'] }),
    AutoImport({
      imports: ['vue','vue-router', 'pinia'],
      dirs: ['./src/api']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), //配置@路径
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
          if (id.includes(path.resolve(__dirname, '/src/status/index.js'))) {
            return 'vendor';
          }
        },
      },
    },
  },
})


