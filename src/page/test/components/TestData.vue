<template>
  <div class="test-data">
    test1
  </div>
</template>

<script>
import data from '@/utils/testModule.js'
export default {
  data: function () {
    return {
      count: 12,
      testData: window.__testData,
      array: window.__array
    }
  },
  activated() {},
  deactivated() {},
  methods: {
    getData() {
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.test-data {
  border: 1px solid #0fb6c6;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px;
}
</style>