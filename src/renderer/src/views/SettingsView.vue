<template>
  <div class="settings">
    <div class="settings-drag" />
    <div class="settings-head">
      <span class="settings-title">高考倒计时-设置</span>
      <span class="settings-head-btn"
        ><el-icon style="color: rgba(255, 255, 255, 0.95)" size="20" @click="close()">
          <Close /> </el-icon
      ></span>
    </div>
    <div class="settings-body">
      <div class="settings-aside">
        <el-menu
          default-active="1"
          background-color="#00000000"
          active-text-color="#60a0fcf2"
          text-color="#ffffffe2"
          class="settings-aside-menu"
        >
          <el-menu-item index="1" @click="$router.push({ name: 'basicSttings' })">
            <span>基础设置</span>
          </el-menu-item>
          <el-menu-item index="2" @click="$router.push({ name: 'about' })">
            <span>关于我们</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="settings-body-main">
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Settings',
  created() {
    this.$router.push({ name: 'basicSttings' })
  },
  methods: {
    close() {
      window.electron.ipcRenderer.send('close_settings_window')
    }
  }
})
</script>
<style>
.settings {
  position: absolute;
  width: 800px;
  height: 600px;
  left: 0px;
  top: 0px;
  border-radius: 9px;
  background-color: rgba(211, 237, 252, 0.85);
  z-index: 3;
}

.settings-head {
  position: absolute;
  width: 800px;
  height: 30px;
  top: 8px;
  border-radius: 9px 9px 0px 0px;
}

.settings-drag {
  z-index: 4;
  -webkit-app-region: drag;
  width: 800px;
  height: 50px;
}

.settings-title {
  font-size: 15px;
  margin-top: 5px;
  display: inline-block;
  margin-left: 10px;
  color: rgba(255, 255, 255, 0.95);
}

.settings-head-btn {
  float: right;
  margin-right: 10px;
  margin-top: 5px;
  -webkit-app-region: no-drag;
}

.settings-body {
  position: absolute;
  width: 800px;
  height: 550px;
}

.settings-aside {
  position: absolute;
  width: 125px;
  height: 550px;
  z-index: 6;
}

.settings-aside-menu {
  min-height: 550px;
}

.settings-body-main {
  height: 550px;
  width: 675px;
  position: absolute;
  left: 125px;
}
</style>
