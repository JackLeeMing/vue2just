<template>
  <div class="p-item-top-title"
       style="margin-bottom:30px">
    <div class="p-item-h5-title">
      <img class="p-item-h5-title-img"
           src="@/assets/logo.png" />
      <span class="p-item-h5-title-label">{{title}}</span>
    </div>
    <div class="p-border-bottom"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.p-item-top-title {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
  height: 1px;
  position: relative;
  background-color: #dcdfe6;
  .p-item-h5-title {
    position: absolute;
    // background-color: #1989fa;
    background-color: #edeff0;
    border-radius: 5px;
    padding: 0 20px 0 40px;
    font-weight: bold;
    text-align: center;
    font-size: 16px;
    line-height: 25px;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    // color: #fff;
    color: #1989fa;
  }
  .p-border-bottom {
    position: absolute;
    bottom: 0px;
    height: 1px;
    width: 150px;
    left: 50%;
  }
}
.p-item-h5-title-img {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
}
.p-item-h5-title-label {
  margin-left: 10px;
}
</style>