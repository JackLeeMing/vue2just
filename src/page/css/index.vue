<template>
  <div class="css">
    <div class="box"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.css {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  // overflow: hidden;

  .box {
    width: 200px;
    height: 200px;
    margin: 10px auto;
    background-color: aqua;
    transform: perspective(1000px) translateZ(-100px);
  }
}
</style>