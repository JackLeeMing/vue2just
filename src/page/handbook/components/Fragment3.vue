<template>
  <div class="fragment fragment-3">
    <div class="fragment-title"
         style="margin-top:6px">
      设备取出
    </div>
    <p class="desc"
       style="margin-top:12px">
      打开包装盒，包装盒里包含小熊和卡片。拉开小熊的头部拉链，取出设备。短按<span class="highlight">开关按钮</span>开启设备。然后扫描卡片上的小程序码，按照步骤进行设备连接。
    </p>
    <div class="image image1">
      <img src="/bearbuddy/fp3.png" />
      <div class="image1-tip">
        开关按钮
      </div>
      <img class="pointer"
           src="/bearbuddy/pointer.png"
           draggable="false" />
    </div>
    <div class="fragment-title"
         style="margin-top:8px">
      初始电量
    </div>
    <p class="desc"
       style="margin-top:12px">
      设备在首次开箱时电量约为50%，建议充满电后再使用，以确保设备能够正常启动并完成初始化设置。
    </p>
    <div class="image image2">
      <img src="/bearbuddy/fp3.png"
           draggable="false" />
      <div class="image2-tip">
        tye-C充电口
      </div>
      <img class="pointer"
           src="/bearbuddy/pointer.png" />
    </div>
    <div class="fragment-title"
         style="margin-top:8px">
      小程序二维码
    </div>
    <p class="desc"
       style="margin-top:12px">
      请您通过扫描二维码或在应用市场搜索小程序名称的方式打开小程序。
    </p>
    <div class="image image3"
         style="margin-top:12px">
      <img src="/bearbuddy/frq3.png"
           draggable="false" />
    </div>
  </div>
</template>

<script>
export default {}
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
  font-size: 14px;
  line-height: 22px;
  color: #040000;
  z-index: 1;
}
.image1 {
  position: relative;
  .image1-tip {
    position: absolute;
    background-color: var(--colorPrimary);
    width: 80px;
    height: 27px;
    border-radius: 999px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #ffffff;
    /* number */
    align-items: center;
    text-align: center;
    position: absolute;
    height: 22px;
    left: 62%;
    top: 43%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 55;
  }
  .pointer {
    width: 30px;
    position: absolute;
    left: 45%;
    top: 39%;
    transform: translateX(-50%);
    z-index: 100;
  }
}

.image2 {
  position: relative;
  .image2-tip {
    position: absolute;
    background-color: var(--colorPrimary);
    width: 105px;
    height: 27px;
    border-radius: 999px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #ffffff;
    /* number */
    align-items: center;
    text-align: center;
    position: absolute;
    height: 22px;
    left: 55%;
    top: 38%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 55;
  }
  .pointer {
    width: 30px;
    position: absolute;
    left: 35%;
    top: 43%;
    transform: translateX(-50%);
    z-index: 100;
  }
}
</style>