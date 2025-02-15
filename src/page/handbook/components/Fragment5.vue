<template>
  <div class="fragment fragment-5">
    <div class="fragment-title"
         style="margin-top:0.375rem">
      定时主动唤起对话
    </div>
    <p class="desc"
       style="margin-top:0.75rem">
      1. 设备会在固定的3个时间主动启动话题，内容包括新闻、趣事、古诗词等，丰富孩子的知识面。
    </p>
    <p class="desc">
      2. 默认情况下，设备在晚上6:30启动话题，家长可以在小程序中根据孩子的年龄和兴趣爱好对具体话题进行时间和内容的调整，确保内容的适宜性和吸引力。
    </p>
    <div class="fragment-title"
         style="margin-top:1rem">
      音量控制
    </div>
    <p class="desc"
       style="margin-top:1rem">
      1. 您可以通过语音指令调节设备的音量大小，例如说“声音大一点”或“声音小一点”，设备会根据指令调整音量。
    </p>
    <p class="desc">
      2. 您可以取出硬件设备，使用音量控制按钮调节音量
    </p>
    <div class="image image1"
         style="margin-top:1rem"
         @click="onPreViewClick('/img/bearbuddy/fp5_1.png')">
      <img src="/img/bearbuddy/fp5_1.png"
           draggable="false" />
    </div>
    <p class="desc">
      3. 小程序也提供了音量调节功能，家长可以根据孩子的使用环境和需求，在小程序中精确调节音量大小。
    </p>
    <div class="image image1"
         style="margin-top:1rem"
         @click="onPreViewClick('/img/bearbuddy/fp5_2.png')">
      <img src="/img/bearbuddy/fp5_2.png"
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
.image {
  position: relative;
}
.fragment-5 {
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