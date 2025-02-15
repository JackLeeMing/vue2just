<template>
  <div class="fragment fragment-3">
    <div class="fragment-title"
         style="margin-top: 0.375rem">设备取出</div>
    <p class="desc"
       style="margin-top: 0.75rem">
      打开包装盒，包装盒里包含小熊和卡片。拉开小熊的头部拉链，取出设备。短按
      <span class="highlight">开关按钮</span>
      开启设备。然后扫描卡片上的小程序码，按照步骤进行设备连接。
    </p>
    <div class="image image1"
         @click="onPreViewClick('/bearbuddy/fp3.png')">
      <img src="/bearbuddy/fp3.png" />
    </div>
    <div class="fragment-title"
         style="margin-top: 0.5rem">初始电量</div>
    <p class="desc"
       style="margin-top: 0.75rem">
      设备在首次开箱时电量约为50%，建议充满电后再使用，以确保设备能够正常启动并完成初始化设置。
    </p>
    <div class="image image2"
         @click="onPreViewClick('/bearbuddy/fp3.png')">
      <img src="/bearbuddy/fp3.png"
           draggable="false" />
    </div>
    <div class="fragment-title"
         style="margin-top: 0.5rem">小程序二维码</div>
    <p class="desc"
       style="margin-top: 0.75rem">请您通过扫描二维码或在应用市场搜索小程序名称的方式打开小程序。</p>
    <div class="image image3"
         style="margin-top: 0.75rem"
         @click="onPreViewClick('/bearbuddy/frq3.png')">
      <img src="/bearbuddy/frq3.png"
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
.fragment-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.desc {
  width: 100%;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: #040000;
  z-index: 1;
}
.image1 {
  position: relative;
}

.image2 {
  position: relative;
}
</style>
