<template>
  <div ref="dragVerify"
       class="drag_verify"
       :style="dragVerifyStyle"
       @mousemove="dragMoving"
       @mouseup="dragFinish"
       @mouseleave="dragFinish"
       @touchmove="dragMoving"
       @touchend="dragFinish">
    <div ref="progressBar"
         class="dv_progress_bar"
         :class="{goFirst2:isOk}"
         :style="progressBarStyle">
    </div>
    <div ref="message"
         class="dv_text"
         :style="textStyle">
      <slot v-if="$slots.textBefore"
            name="textBefore"></slot>
      {{message}}
      <slot v-if="$slots.textAfter"
            name="textAfter"></slot>
    </div>
    <div ref="handler"
         class="dv_handler dv_handler_bg"
         :class="{goFirst:isOk}"
         :style="handlerStyle"
         @mousedown="dragStart"
         @touchstart="dragStart">
      <i :class="handlerIcon"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DragVerify',
  props: {
    isPassing: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 250
    },
    height: {
      type: Number,
      default: 40
    },
    text: {
      type: String,
      default: 'swiping to the right side'
    },
    successText: {
      type: String,
      default: 'success'
    },
    background: {
      type: String,
      default: '#eee'
    },
    progressBarBg: {
      type: String,
      default: '#76c61d'
    },
    completedBg: {
      type: String,
      default: '#76c61d'
    },
    circle: {
      type: Boolean,
      default: false
    },
    radius: {
      type: String,
      default: '4px'
    },
    handlerIcon: {
      type: String
    },
    successIcon: {
      type: String
    },
    handlerBg: {
      type: String,
      default: '#fff'
    },
    textSize: {
      type: String,
      default: '14px'
    },
    textColor: {
      type: String,
      default: '#333'
    }
  },
  mounted() {
    const dragEl = this.$refs.dragVerify
    dragEl.style.setProperty('--textColor', this.textColor)
    dragEl.style.setProperty('--width', Math.floor(this.width / 2) + 'px')
    dragEl.style.setProperty('--pwidth', -Math.floor(this.width / 2) + 'px')
  },
  computed: {
    handlerStyle() {
      return {
        width: this.height + 'px',
        height: this.height + 'px',
        background: this.handlerBg
      }
    },
    message() {
      return this.isPassing ? this.successText : this.text
    },
    dragVerifyStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        lineHeight: this.height + 'px',
        background: this.background,
        borderRadius: this.circle ? this.height / 2 + 'px' : this.radius
      }
    },
    progressBarStyle() {
      return {
        background: this.progressBarBg,
        height: this.height + 'px',
        borderRadius: this.circle ? this.height / 2 + 'px 0 0 ' + this.height / 2 + 'px' : this.radius
      }
    },
    textStyle() {
      return {
        height: this.height + 'px',
        width: this.width + 'px',
        fontSize: this.textSize
      }
    }
  },
  data() {
    return {
      isMoving: false,
      x: 0,
      isOk: false
    }
  },
  methods: {
    dragStart(e) {
      e.preventDefault()
      if (!this.isPassing) {
        this.isMoving = true
        this.x = e.pageX || e.touches[0].pageX
      }
      this.$emit('handlerMove')
    },
    dragMoving(e) {
      e.preventDefault()
      if (this.isMoving && !this.isPassing) {
        var _x = (e.pageX || e.touches[0].pageX) - this.x
        var handler = this.$refs.handler
        if (_x > 0 && _x <= this.width - this.height) {
          handler.style.left = _x + 'px'
          this.$refs.progressBar.style.width = _x + this.height / 2 + 'px'
        } else if (_x > this.width - this.height) {
          handler.style.left = this.width - this.height + 'px'
          this.$refs.progressBar.style.width = this.width - this.height / 2 + 'px'
          this.passVerify()
        }
      }
    },
    dragFinish(e) {
      e.preventDefault()
      if (this.isMoving && !this.isPassing) {
        var _x = (e.pageX || e.changedTouches[0].pageX) - this.x
        if (_x < this.width - this.height) {
          this.isOk = true
          var that = this
          setTimeout(() => {
            that.$refs.handler.style.left = '0'
            that.$refs.progressBar.style.width = '0'
            that.isOk = false
          }, 500)
          this.$emit('passfail')
        } else {
          var handler = this.$refs.handler
          handler.style.left = this.width - this.height + 'px'
          this.$refs.progressBar.style.width = this.width - this.height / 2 + 'px'
          this.passVerify()
        }
        this.isMoving = false
      }
    },
    passVerify() {
      this.$emit('update:isPassing', true)
      this.isMoving = false
      var handler = this.$refs.handler
      handler.children[0].className = this.successIcon
      this.$refs.progressBar.style.background = this.completedBg
      this.$refs.message.style['-webkit-text-fill-color'] = 'unset'
      this.$refs.message.style.animation = 'slidetounlock2 3s infinite'
      this.$refs.message.style.color = '#fff'
      this.$emit('passcallback')
    },
    reset() {
      const oriData = this.$options.data()
      for (const key in oriData) {
        if (Object.prototype.hasOwnProperty.call(oriData, key)) {
          this[key] = oriData[key]
        }
      }
      var handler = this.$refs.handler
      var message = this.$refs.message
      handler.style.left = '0'
      this.$refs.progressBar.style.width = '0'
      handler.children[0].className = this.handlerIcon
      message.style['-webkit-text-fill-color'] = 'transparent'
      message.style.animation = 'slidetounlock 3s infinite'
      message.style.color = this.background
    }
  }
}
</script>
<style lang="scss"  scoped>
.drag_verify {
  position: relative;
  background-color: #e8e8e8;
  text-align: center;
  overflow: hidden;
  border: 1px solid #dcdfe6;
}
.drag_verify .dv_handler {
  position: absolute;
  top: 0px;
  left: 0px;
  cursor: move;
}
.drag_verify .dv_handler i {
  color: #666;
  padding-left: 0;
  font-size: 16px;
}
.drag_verify .dv_handler .el-icon-circle-check {
  color: #6c6;
  margin-top: 9px;
}
.drag_verify .dv_progress_bar {
  position: absolute;
  height: 34px;
  width: 0px;
}
.drag_verify .dv_text {
  position: absolute;
  top: 0px;
  color: transparent;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, var(--textColor)),
    color-stop(0.4, var(--textColor)),
    color-stop(0.5, #fff),
    color-stop(0.6, var(--textColor)),
    color-stop(1, var(--textColor))
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-size-adjust: none;
  animation: slidetounlock 3s infinite;
}
.drag_verify .dv_text * {
  -webkit-text-fill-color: var(--textColor);
}
.goFirst {
  left: 0px !important;
  transition: left 0.5s;
}
.goFirst2 {
  width: 0px !important;
  transition: width 0.5s;
}
</style>
<style lang="scss" >
@keyframes slidetounlock {
  0% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--width) 0;
  }
}
@-webkit-keyframes slidetounlock {
  0% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--width) 0;
  }
}
@keyframes slidetounlock2 {
  0% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--pwidth) 0;
  }
}

@-webkit-keyframes slidetounlock2 {
  0% {
    background-position: var(--pwidth) 0;
  }
  100% {
    background-position: var(--pwidth) 0;
  }
}
</style>
