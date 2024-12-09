<template>
  <div class="heavy-item-container">
    <div v-for="co in number"
         :key="co"
         class="item">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: 5000
    }
  }
}
</script>

<style lang="scss" scoped>
.heavy-item-container {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
}
.item {
  width: 5px;
  height: 3px;
  margin: 0.1em;
  background-color: #ccc;
}
</style>