<template>
  <div class="fragment fragment-0">
    <div class="fragment-title"
         style="margin-top: 0.375rem">熊小伴</div>
    <div class="bearbuddy">
      <BearBuddy />
    </div>
    <p class="desc">
      是一款专为儿童设计的硬件AI设备，旨在通过智能互动、故事播放等功能，为孩子提供一个寓教于乐、安全陪伴的伙伴。设备采用先进的AI技术，能够根据孩子的年龄、兴趣爱好等信息，提供个性化的互动体验，同时帮助家长更好地了解孩子的成长情况。
    </p>
    <div class="desc-image van-hairline--bottom"></div>
    <div class="image"
         @click="onPreViewClick('/bearbuddy/fp1_1.png')">
      <img src="/bearbuddy/fp1_1.png"
           draggable="false" />
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import BearBuddy from './bearbuddy.vue'
export default {
  components: {
    BearBuddy
  },
  methods: {
    onPreViewClick(image) {
      ImagePreview([image])
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bearbuddy {
  margin-top: 1rem;
  height: 1.625rem;
  z-index: 1;
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
.desc-image {
  margin-top: 0.5rem;
  margin-bottom: 1.625rem;
}
.image {
  margin: 0px;
}
</style>
