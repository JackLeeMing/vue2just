import { debounce } from '@/utils/index'

export default {
  data() {
    return {}
  },
  mounted() {
    this.myChartInstance = null
    this.$_chartResizeHandler = debounce(() => {
      if (this.myChartInstance) {
        this.myChartInstance.resize()
      }
    }, 200)
    window.addEventListener('resize', this.$_chartResizeHandler)
    this.$_chartResizeHandler()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._chartResizeHandler)
  },
  methods: {
    // 销毁echartDom 子节点
    $_deleteEchartChild(chilren = []) {
      for (let i = 0; i < chilren.length; i++) {
        chilren[i].remove()
      }
    },
    // 销毁echart
    $_diposeEchart() {
      if (this.myChartInstance) {
        this.myChartInstance.clear()
        this.myChartInstance.dispose()
        this.myChartInstance = null
      }
    }
  }
}
