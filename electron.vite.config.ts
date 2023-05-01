import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: [
        {
          find: '@renderer',
          replacement: resolve(__dirname, 'src/renderer/src')
        },
        {
          find: '@electron',
          replacement: resolve(__dirname, 'src/main')
        },
        {
          find: '@',
          replacement: resolve(__dirname, 'src/renderer/src')
        }
        , {
          find: '@views',
          replacement: resolve(__dirname, 'src/renderer/src/views')
        },
        {
          find: '@comps',
          replacement: resolve(__dirname, 'src/renderer/src/components')
        },
        {
          find: '@assets',
          replacement: resolve(__dirname, 'src/renderer/src/assets')
        },
        {
          find: '@logic',
          replacement: resolve(__dirname, 'src/logic')
        }
      ]
    },
    plugins: [vue()]
  }
})
