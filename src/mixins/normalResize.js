import { debounce, on, off } from '@/utils'
export default {
  beforeMount() {},
  mounted() {
    this.__resizeHandler = debounce(() => {
      if (this.resizeHandle) {
        this.resizeHandle()
      }
    }, 100)
    on(window, 'resize', this.__resizeHandler)
    this.$_sidebarElm = window.document.getElementsByClassName('sidebar-container')[0]
    this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
  },
  beforeDestroy() {
    off(window, 'resize', this.__resizeHandler)
    this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
  },
  methods: {
    resizeHandle() {},
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    }
  }
}
