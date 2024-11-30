export default {
  data() {
    return {}
  },
  methods: {
    showUpdate() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '有新的应用版本发布了，需要刷新界面!(必要时请关闭窗口重新打开)'
        })
        .then(() => {
          this.onConfirm()
        })
        .catch(() => {})
    },
    onHidden() {
      window.showUpdateTips = 0
    },
    onCancel() {
      window.showUpdateTips = 1
    },
    onConfirm() {
      window.showUpdateTips = 0
      this.$nextTick(() => {
        window.location.reload()
      })
    },
    parserScript(html) {
      const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi) // script正则
      return html.match(reg) // 匹配script标签
    },
    async getHtml() {
      const html = await fetch('/').then(res => res.text()) // 读取index html
      return html
    },
    async updateInit() {
      const html = await this.getHtml()
      this.oldScript = this.parserScript(html)
    },
    async updateWorking() {
      const newHtml = await this.getHtml()
      this.newScript = this.parserScript(newHtml)
      this.compare(this.oldScript, this.newScript)
    },
    compare(oldArr, newArr) {
      const _arr = Array.from(new Set([...oldArr, ...newArr]))
      if (oldArr.length === 0 || _arr.length === oldArr.length) {
        this.onNoUpdate()
      } else {
        // 否则通知更新
        this.onUpdate()
      }
    },
    timingCheck(time = 10000) {
      // 轮询
      clearInterval(this.interval)
      this.interval = setInterval(async () => {
        this.updateWorking()
      }, time)
    },
    async createUpdater() {
      this.oldScript = [] // 存储第一次值也就是script 的hash 信息
      this.newScript = [] // 获取新的值 也就是新的script 的hash信息
      this.interval = null
      window.showUpdateTips = 0
      await this.updateInit()
      clearInterval(this.interval)
      this.updateWorking()
      this.timingCheck(45000)
    },
    onUpdate() {
      const showUpdateTips = window.showUpdateTips || 0
      window.loggerError && window.loggerError('|-- 发现新版本1 --|:' + showUpdateTips)
      if (`${showUpdateTips}` === '0') {
        window.showUpdateTips = 1
        // this.$message({
        //   type: 'success',
        //   message: '检测到有新版本'
        // })
        this.showUpdate()
      }
    },
    onNoUpdate() {}
  },
  mounted() {
    this.createUpdater()
  },
  beforeDestroy() {
    window.showUpdateTips = 0
    this.interval = null
    clearInterval(this.interval)
  }
}
