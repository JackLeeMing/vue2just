export default function (maxFrameCount) {
  return {
    data() {
      return {
        frameCount: 0
      }
    },
    mounted() {
      const updateFrameCount = () => {
        requestAnimationFrame(() => {
          this.frameCount += 1
          if (this.frameCount < maxFrameCount) {
            updateFrameCount()
          }
        })
      }
      updateFrameCount()
    },
    methods: {
      defer(showFrameCount) {
        return this.frameCount >= showFrameCount
      }
    }
  }
}
