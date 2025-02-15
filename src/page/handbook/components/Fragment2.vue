<template>
  <div class="fragment fragment-2">
    <van-cell title="硬件尺寸"
              label="80 mm×80 mm×25 mm，小巧轻便。" />
    <van-cell title="硬件重量"
              label="仅 [X] 克，携带轻松无负担。" />
    <van-cell title="扬声器"
              label="2W*2双声道立体声，更加呵护宝贝的耳朵。" />
    <van-cell title="电池容量"
              label="2600mAh，续航持久，满足小朋友日常玩耍需求。" />
    <van-cell title="蓝牙版本"
              label="支持蓝牙 5.0 版本，连接稳定，传输迅速。" />
    <van-cell title="Wi-Fi支持"
              label="支持 2.4G Wi-Fi 连接，不支持 5G 以及需要进行二次登录确认的 Wi-Fi。" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.fragment-2 {
  .van-cell {
    padding: 1rem 0px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #040000;
    /* text */
  }
  .van-cell:first-child {
    padding-top: 0.5rem;
  }

  .van-cell__label {
    margin-top: 0.375rem;
    font-weight: normal;
  }
}
</style>
