<template>
  <div class="fragment fragment-7">
    <div class="fragment-title"
         style="margin-top:0.375rem">
      请联系我们的客服团队！
    </div>
    <div class="fragment-title"
         style="margin-top:0.3rem">
      在使用过程中如遇任何问题
    </div>
    <div style="margin-top:1rem; width:100%">
      客服电话：<span class="highlight">13215873452</span>
    </div>
    <div style="width:100%">客服微信：</div>
    <div class="image image1"
         style="margin-top:1rem"
         @click="onPreViewClick('/img/bearbuddy/fp7.png')">
      <img src="/img/bearbuddy/fp7.png"
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
.fragment-7 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>