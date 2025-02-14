<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { Notify } from 'vant'
import { finishLoading } from '@/utils'
import appUpdate from './appUpdate.js'
export default {
  mixins: [appUpdate],
  components: {},
  computed: {
    currentPath() {
      const route = this.$route
      if (route) {
        return route.path
      }
      return ''
    }
  },
  data() {
    return {}
  },
  watch: {},
  methods: {
    watchToken() {
      window.addEventListener('storage', this.switchToLogin)
    },
    async switchToLogin(event) {
      if (event && event.key === 'access_token') {
        const access_token = localStorage.getItem('access_token')
        if (!access_token) {
          Notify({ type: 'warning', message: '已退出登录!' })
          await this.$store.dispatch('user/resetToken')
          this.$router
            .replace({
              path: '/login'
            })
            .catch(() => {})
        } else {
          const currentPath = this.currentPath
          if (currentPath === '/login') {
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }
        }
      }
    }
  },
  created() {
    this.watchToken()
  },
  mounted() {
    setTimeout(() => {
      finishLoading()
    }, 350)
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.switchToLogin)
  }
}
</script>

<style lang="scss">
:root {
  --colorPrimary: #ff8151;
}
#app {
  background: white;
  width: 100%;
  height: 100vh;
  color: #323233;
  height: calc(var(--vh, 1vh) * 100); /* 需要多少vh就乘多少值,100vh就乘100 */
}
.van-toast {
  width: 120px !important;
}
.BMap_cpyCtrl {
  display: none !important;
}
.anchorBL {
  display: none !important;
}
.van-button {
  border-radius: 4px !important;
}
.van-button-r4 {
  border-radius: 4px !important;
}
</style>
