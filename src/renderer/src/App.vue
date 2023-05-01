<template>
  <RouterView />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Config from './config'
export default defineComponent({
  created() {
    this.init()
    window.electron.ipcRenderer.on('config_init', () => {
      this.init()
    })
  },
  methods: {
    init() {
      window.electron.ipcRenderer.send('read_config_file')
      window.electron.ipcRenderer.once('config_file', (_, data) => {
        if (data != 'undefined') {
          this.$store.commit('setconfig', new Config(data))
        } else {
          //没有配置文件，自己写个
          window.electron.ipcRenderer.send('write_config_file', {
            res: 'config_file_write_result',
            data: new Config('').read()
          })
          window.electron.ipcRenderer.once('config_file_write_result', (_, data) => {
            const { success } = data
            if (success == 'undefined') {
              throw '写入文件错误'
            } else {
              this.$store.commit('setconfig', new Config(''))
            }
          })
        }
      })
    }
  }
})
</script>
