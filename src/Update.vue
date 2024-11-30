<template>
  <transition name="custom-classes-transition"
              enter-active-class="animated zoomIn"
              :duration="200">
    <div tabindex="-1"
         role="dialog"
         aria-modal="true"
         aria-label="标题名称"
         class="el-message-box__wrapper"
         style="background:rgba(0,0,50,0.5);z-index: 2016;">
      <div class="el-message-box el-message-box-2">
        <div class="el-message-box__header">
          <div class="el-message-box__title">
            <span>更新提示</span>
          </div>
          <button type="button"
                  aria-label="Close"
                  class="el-message-box__headerbtn"
                  @click="onConfirm('temp')">
            <i class="el-message-box__close el-icon-close">
            </i>
          </button>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__container">
            <div class="el-message-box__message">
              <p>有新的应用版本发布了，需要刷新界面!</p>
              <p class="important-text">
                <i class="el-icon-message-solid"></i>
                为避免不必要的异常请立即刷新
              </p>
            </div>
          </div>
          <div class="el-message-box__input"
               style="display: none;">
            <div class="el-input">
              <input type="text"
                     autocomplete="off"
                     placeholder=""
                     class="el-input__inner">
            </div>
            <div class="el-message-box__errormsg"
                 style="visibility: hidden;"></div>
          </div>
        </div>
        <div class="el-message-box__btns">
          <el-button size="small"
                     @click="onConfirm('cancel')">
            取消
          </el-button>
          <el-button size="small"
                     type="primary"
                     @click="onConfirm('ok')">
            立即刷新
          </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'WebUpdate',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    onConfirm(action) {
      if (action === 'ok') {
        this.$emit('confirm')
      } else if (action === 'cancel') {
        this.$emit('cancel')
      } else {
        this.$emit('hidden')
      }
    }
  },

  computed: {}
}
</script>
<style lang="scss" scoped>
.important-text {
  text-decoration: underline;
  color: #e6a23c;
  font-size: 0.75rem;
}
</style>
