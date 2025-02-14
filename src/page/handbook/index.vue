<template>
  <div class="bear-buddy-handbook">
    <div ref="scrollTop"
         class="handbook-top van-hairline--bottom">
      <van-tag v-for="(feature, index) in features"
               :id="`tag-${index}`"
               :key="`tag-${feature.key}`"
               :type="current === index ? 'primary':'danger'"
               @click="onFeatureClick(feature, index)">
        {{feature.label}}
      </van-tag>
    </div>
    <div class="handbook-content">
      <van-swipe ref="swipper"
                 class="my-swipe"
                 :loop="false"
                 :touchable="true"
                 :show-indicators="false"
                 indicator-color="white"
                 @change="onSwiperChange">
        <van-swipe-item v-for=" feature in features"
                        :key="`info-${feature.key}`">
          <component :is="`Fragment${feature.key}`" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
const baseComponents = require.context('./components', false, /\.vue$/)
// 制作组件数组，在下方components中注册使用
const resbaseComponents = {}
baseComponents.keys().forEach(comName => {
  const comp = baseComponents(comName)
  resbaseComponents[comName.replace(/^\.\/(.*)\.\w+$/, '$1')] = comp.default
})
export default {
  components: {
    ...resbaseComponents
  },
  data() {
    return {
      features: [
        { label: '产品简介', key: 0 },
        { label: '新手教程', key: 1 },
        { label: '设备参数', key: 2 },
        { label: '开箱设置', key: 3 },
        { label: '设备连接配置', key: 4 },
        { label: '硬件设备功能', key: 5 },
        { label: '小程序管理功能', key: 6 },
        { label: '售后服务', key: 7 }
      ],
      current: 0,
      left: 0,
      offsetMap: null
    }
  },
  methods: {
    computeScroll() {
      const scrollTop = this.$refs.scrollTop
      const features = this.features || []
      const map = {}
      if (scrollTop) {
        const parentRect = scrollTop.getBoundingClientRect()
        for (let i = 0; i < features.length; i++) {
          const tagId = `tag-${i}`
          const tagDiv = document.getElementById(tagId)
          if (tagDiv) {
            const tagRect = tagDiv.getBoundingClientRect()
            const x = tagRect.left - parentRect.left
            const maxX = x + tagRect.width
            if (maxX <= parentRect.width) {
              map[tagId] = 0
            } else {
              map[tagId] = Math.abs(maxX - parentRect.width)
            }
          } else {
            map[tagId] = 0
          }
        }
      }
      this.offsetMap = map
    },
    onSwiperChange(info) {
      this.current = isNaN(info * 1) ? 0 : info * 1
      this.scrollTopTag()
    },
    onFeatureClick(feature, index) {
      this.current = index
      this.$nextTick(() => {
        const swipper = this.$refs.swipper
        if (swipper) {
          swipper.swipeTo({ index: index * 1 })
          swipper.swipeTo(index * 1)
          console.error(index * 1)
        }
      })
    },
    scrollTopTag() {
      const index = this.current
      const offsetMap = this.offsetMap
      if (!offsetMap) {
        this.computeScroll()
      }
      const scrollTop = this.$refs.scrollTop
      const tagID = `tag-${index}`
      const offset = offsetMap[tagID] || 0
      if (scrollTop) {
        this.$nextTick(() => {
          scrollTop.scrollLeft = offset
        })
      }
    }
  },
  mounted() {
    document.title = '产品说明'
    this.$nextTick(() => {
      this.computeScroll()
    })
  }
}
</script>

<style lang="scss" scoped>
.test-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
}
.bear-buddy-handbook {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.handbook-top {
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  flex: 0 0 56px;
}
.handbook-content {
  margin-top: 8px;
  box-sizing: border-box;
  width: 100%;
  flex: 1;
}
</style>
<style lang="scss">
.van-tag {
  line-height: 26px;
  height: 26px;
  padding: 0 8px;
  flex-shrink: 0;
  text-align: center;
  display: inline-block;
}
.van-tag--danger {
  background-color: #f3f3f3;
  color: rgba(0, 0, 0, 0.9);
}
.van-swipe {
  height: 100%;
}
.fragment-title {
  /* text */
  width: 100%;
  height: 24px;
  line-height: 24px;
  /* Mark/Large */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  /* identical to box height, or 150% */
  color: #040000;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  z-index: 0;
}
.bear-buddy-handbook {
  p {
    margin: 0px;
    padding: 0px;
  }
  .handbook-top::-webkit-scrollbar {
    display: block;
    width: 0px;
    height: 0px;
    display: none;
  }
  .fragment {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 16px;
    padding-right: 16px;
  }
  .highlight {
    color: var(--colorPrimary);
    text-decoration: underline;
  }
  .image {
    user-select: none;
    img {
      user-select: none;
    }
  }
}
</style>