<template>
  <div class="heavy-page">
    <template v-for="v in 21">
      <div v-if="defer(v)"
           :key="v"
           class="block">
        <HeavyComp />
      </div>
    </template>
  </div>
</template>

<script>
import HeavyComp from './components/HeavyComp.vue'
import defer from './defer.js'
export default {
  mixins: [defer(21)],
  components: {
    HeavyComp
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.heavy-page {
  background-color: white;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  overflow: auto;
}
.block {
  border: 3px solid #f40;
}
</style>