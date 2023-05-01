<template>
  <div
    class="home-body"
    :style="BodyStyle"
    @mousemove.stop=";(Mouse as any) = true"
    @mouseleave.stop=";(Mouse as any) = false"
  >
    <div class="home-body-head" style="-webkit-app-region: drag">
      <span class="home-body-head-close"
        ><el-icon :color="Mouse ? 'black' : '#828282'" :size="20" @click="openSettingsWin"
          ><Setting /></el-icon
        ><el-icon :color="Mouse ? 'black' : '#828282'" :size="20" @click="close">
          <Close /> </el-icon
      ></span>
    </div>
    <div style="text-align: center; margin-top: 3px">
      <span class="home-body-title" :style="TitleStyle">
        {{ Title }}
      </span>
    </div>
    <div style="text-align: center">
      <span class="home-body-day" :style="DayStyle">
        {{ Day }}
      </span>
      <span :style="Mouse ? 'color: Black;' : 'color: #ffffff3e;'"> 天 </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Home',
  data() {
    return {
      /**鼠标悬浮在上方 */
      Mouse: false,
      /**主界面的css */
      BodyStyle: 'background-color: #f1f1f125;',
      Title: '',
      TitleStyle: 'color: #ffffff3e;',
      Day: '',
      DayStyle: 'color: #ffffff5e;'
    }
  },
  computed: {
    year: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      set() {},
      get() {
        return this.$store.state.config.read().year
      }
    }
  },
  watch: {
    Mouse: {
      handler(newVal) {
        if (newVal) {
          this.BodyStyle = 'background-color: #f1f1f1c5;'
          this.TitleStyle = 'color: black;'
          this.DayStyle = 'color: black'
        } else {
          this.BodyStyle = 'background-color: #f1f1f115;'
          this.TitleStyle = 'color: #ffffff3e;'
          this.DayStyle = 'color: #ffffff5e;'
        }
      }
    },
    year: {
      handler() {
        this.time()
      }
    }
  },
  created() {
    this.time()
    setInterval(this.time, 12 * 60 * 60 * 1000)
  },
  methods: {
    close() {
      window.electron.ipcRenderer.send('close')
    },
    time() {
      const t = new Date()
      this.Title = `距${this.$store.state.config.read().year}年高考仅剩`
      t.setDate(7)
      t.setFullYear(this.$store.state.config.read().year)
      t.setMonth(5)

      this.Day = String(Math.floor((t.getTime() - new Date().getTime()) / 1000 / (60 * 60 * 24)))
    },
    openSettingsWin() {
      window.electron.ipcRenderer.send('open_settings_win')
    }
  }
})
</script>
<style>
.home-body-head {
  width: 160px;
  height: 20px;
}

.home-body {
  position: absolute;
  width: 160px;
  height: 100px;
  left: 0px;
  top: 0px;
  border-radius: 8px;
}

.home-body-head-close {
  margin-left: 120px;
  -webkit-app-region: no-drag;
}

.home-body-title {
  margin-left: 10px;
  font-size: 15px;
}

.home-body-day {
  margin-left: 10px;
  font-size: 38px;
}
</style>
