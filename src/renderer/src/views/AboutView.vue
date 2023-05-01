<template>
  <div class="about-body">
    <span class="about-title"
      ><img class="about-icon" :src="ICON" alt="" /><br /><span class="about-title-text"
        >高考倒计时ctcee</span
      ></span
    >
    <div class="about-body-main">
      <span class="about-body-main-text-1"
        >高考倒计时ctcee 是Github上的开源项目, 详情请看https://github.com/taidixiong233/ctcee</span
      ><br />
      <span class="about-body-main-text-2">CopyRight © 2023 maohaoji.com</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ICON from '../assets/icon.png'
export default defineComponent({
  name: 'About',
  data() {
    return {
      ICON
    }
  }
})
</script>
<style>
.about-body {
  margin: 10px;
}
.about-icon {
  height: 100px;
  width: 100px;
  margin-left: 250px;
  margin-top: 100px;
  user-select: none;
}
.about-title-text {
  margin-left: 240px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.9);
}
.about-body-main {
  position: revert;
  min-height: 250px;
  margin-top: 50px;
}
.about-body-main-text-1 {
  font-size: 14px;
  margin-left: 30px;
  color: rgba(0, 0, 0, 0.8);
  user-select: text;
}
.about-body-main-text-2 {
  font-size: 14px;
  margin-left: 190px;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 200px;
  display: inline-block;
}
</style>
