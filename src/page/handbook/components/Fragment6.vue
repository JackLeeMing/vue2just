<template>
  <div class="fragment fragment-6">
    <div class="fragment-title"
         style="margin-top:0.375rem">
      查看对话记录
    </div>
    <p class="desc"
       style="margin-top:1rem">
      进入“消息-查看更多聊天记录”界面。<br />
      您可以选择不同的日期，查看孩子与设备之间的对话内容。聊天记录我们将存储X天，该记录仅存储使用，不会外泄确保隐私安全。
    </p>
    <div class="image image1"
         style="margin-top:1rem"
         @click="onPreViewClick('/img/bearbuddy/fp6_1.png')">
      <img src="/img/bearbuddy/fp6_1.png"
           draggable="false" />
    </div>
    <div class="fragment-title"
         style="margin-top:1rem">
      每周总结
    </div>
    <p class="desc"
       style="margin-top:1rem">
      每周小程序会自动生成每周使用总结报告，您可以点击“消息-每周总结”查看详细的对话分析、使用时长和兴趣点总结。
    </p>
    <p class="desc">
      报告内容全面，能够帮助您全面了解孩子一周的使用情况，同时此总结海报还可以分享至微信用户，家庭成员也能随时了解孩子的想法。
    </p>
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
.fragment-6 {
  display: flex;
  flex-direction: column;
  align-items: center;
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