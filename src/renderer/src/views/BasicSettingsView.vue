<template>
  <div class="basicsettings-body">
    <el-form>
      <el-form-item label="高考年份">
        <el-input-number v-model="Year" :min="minYear" :max="2099" />
      </el-form-item>
      <el-form-item style="margin: 60px 0px 0px 250px">
        <el-button type="primary" @click="applySettings">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Config from '@/config'
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'BasicSettings',
  computed: {
    minYear: {
      get(): number {
        return new Config('').read().year
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      set() {}
    },
    Year: {
      get(): number {
        return this.$store.state.config.read().year
      },
      set(year: number) {
        this.$store.commit('setconfig', new Config(`{"year":${year}}`))
      }
    }
  },
  methods: {
    applySettings() {
      window.electron.ipcRenderer.send('write_config_file', {
        res: 'config_file_write_result',
        data: new Config(`{"year":${this.Year}}`).read()
      })
      window.electron.ipcRenderer.once('config_file_write_result', (_, data) => {
        if (data.success == 'undefined') {
          ElMessage({
            type: 'error',
            message: '保存失败'
          })
        } else {
          ElMessage({
            type: 'success',
            message: '保存成功'
          })
          this.$store.commit('setconfig', new Config(`{"year":${this.Year}}`))
          window.electron.ipcRenderer.send('updata_config_file')
        }
      })
    }
  }
})
</script>
<style>
.basicsettings-body {
  margin: 10px;
}
</style>
