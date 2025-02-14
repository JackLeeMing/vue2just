<template>
  <div class="fragment fragment-1">
    <div class="fragment-title"
         style="margin-top:6px">
      设备对话教程
    </div>
    <p class="desc"
       style="margin-top: 8px;">
      设备需要按照视频教程放入玩具中，并且在需要与设备对话时，通过按压小熊头部后脑勺位置即可。如单独使用硬件设备，则按压设备中心的圆圈即可。具体请看下方视频。
    </p>
    <video style="width:100%;height:200px;margin-top: 12px;object-fit: cover;"
           controls>
      <source src="/bearbuddy/movie.mp4"
              type="video/mp4">
      您的浏览器不支持 HTML5 video 标签。
    </video>
    <div class="fragment-title"
         style="margin-top: 12px;">设备配对教程</div>
    <p class="desc"
       style="margin-top: 12px;">
      请参考如下视频进行设备连接，连接成功后就能个性化定制互动体验。
    </p>
    <video style="width:100%;height:200px;margin-top: 12px;object-fit: cover;"
           controls>
      <source src="/bearbuddy/movie.mp4"
              type="video/mp4">
      您的浏览器不支持 HTML5 video 标签。
    </video>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.desc {
  /* text */
  width: 100%;
  /* Body/Medium */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  /* or 157% */
  color: #040000;
  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  z-index: 1;
}
video {
  object-fit: cover;
}
</style>