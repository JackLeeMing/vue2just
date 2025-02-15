<template>
  <div class="fragment fragment-4">
    <div class="fragment-title"
         style="margin-top:0.375rem">
      启动设备
    </div>
    <p class="desc"
       style="margin-top:1rem">设备默认处于关闭状态，短按一次开关按钮开启设备，此时设备会发出语音提示。</p>
    <div class="image image1"
         style="margin-top:1rem"
         @click="onPreViewClick('/bearbuddy/fp4_1.png')">
      <img src="/bearbuddy/fp4_1.png"
           draggable="false" />
    </div>
    <div class="fragment-title"
         style="margin-top:1rem">
      设备连接
    </div>
    <p class="desc"
       style="margin-top:1rem">
      步骤一：打开小程序，点击“我的-连接设备”。
    </p>
    <div class="image image2"
         style="margin-top:2rem"
         @click="onPreViewClick('/bearbuddy/fp4_2.png')">
      <img src="/bearbuddy/fp4_2.png"
           draggable="false" />
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  methods: {
    onPreViewClick(image) {
      ImagePreview([image])
    }
  }
}
</script>

<style lang="scss" scoped>
.fragment-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image {
  position: relative;
}
.desc {
  /* text */
  margin: 0px;
  margin-top: 0.5rem;
  width: 100%;
  /* Body/Medium */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: #040000;
  z-index: 2;
}
</style>