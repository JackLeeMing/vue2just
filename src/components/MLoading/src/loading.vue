<template>
  <transition name="el-loading-fade"
              @after-leave="handleAfterLeave">
    <div v-show="visible"
         class="el-loading-mask"
         :style="{ backgroundColor: background || '' }"
         :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class='smart-dv-loading'>
        <SvgLoading :outerColor="loadingColors[0]"
                    :innerColor="loadingColors[1]" />
        <div v-if="true"
             class='loading-tip'>{{ text }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
import SvgLoading from './anims/doubeCircle.vue'
const colorMap = {
  sdgs: ['#E85524', '#1C9349']
}
export default {
  components: {
    SvgLoading
  },
  computed: {
    componentId() {
      const webhost = window.location.host
      if (webhost && webhost.includes('sdhscloud')) {
        return 'sdgs'
      }
      return 'normal'
    },
    loadingColors() {
      const componentId = this.componentId
      return colorMap[componentId] || ['#1989fa', '#1989fa']
    }
  },
  data() {
    return {
      text: '',
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: ''
    }
  },

  methods: {
    handleAfterLeave() {
      this.$emit('after-leave')
    },
    setText(text) {
      this.text = text
    }
  }
}
</script>
<style lang="scss" scoped>
.smart-dv-loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  position: relative;
}
.loading-tip {
  margin-top: 10px;
  font-size: 13px;
  color: #1989fa;
}
</style>
