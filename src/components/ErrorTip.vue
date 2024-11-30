<template>
  <div v-if="showTips"
       class="sdk-global-tips"
       @click="onRetryClick">
    <i class="el-icon-error"
       style="color:#E42320">
    </i>
    <span>项目加载失败，点此重试</span>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app', ['globalLoading']),
    ...mapGetters('project', ['projectLoading', 'projectLoadError']),
    showTips() {
      const projectLoadError = this.projectLoadError
      return projectLoadError
    }
  },
  methods: {
    onRetryClick() {
      this.$store.commit('project/SET_LOAD_ERROR', false)
      this.$store.commit('project/SET_LOADING', true)
      setTimeout(() => {
        this.$store.dispatch('project/loadProjects')
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes loadSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.sdk-global-tips {
  z-index: 2012;
  border: 1px solid #e6e9ef;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(54, 58, 80, 0.16);
  min-width: 80px;
  position: fixed;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5px;
  left: 50%;
  transform: translate(-50%);
  line-height: 32px;
  padding: 0 20px;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-word;
  cursor: pointer;
}

.sdk-global-tips span {
  margin-left: 6px;
  font-size: 12px;
}
</style>
