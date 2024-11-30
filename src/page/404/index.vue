<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent"
             src="@/assets/image/404_images/404.png"
             alt="404" />
        <img class="pic-404__child left"
             src="@/assets/image/404_images/404_cloud.png"
             alt="404" />
        <img class="pic-404__child mid"
             src="@/assets/image/404_images/404_cloud.png"
             alt="404" />
        <img class="pic-404__child right"
             src="@/assets/image/404_images/404_cloud.png"
             alt="404" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">哎呀!</div>
        <div class="bullshit__info">
          保留所有权利
          <a style="color:#20a0ff"
             href="http://www.smartbow.net/"
             target="_blank">smartbow</a>
        </div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的URL是否正确，或单击下面的按钮返回主页。</div>
        <a class="bullshit__return-home"
           @click="toHome">返回首页</a>
        <a class="bullshit__return-home"
           style="margin-left:20px"
           @click="logout">注销登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '@/config/index.js'
export default {
  name: 'Page404',
  computed: {
    ...mapGetters('project', ['code_name']),
    message() {
      return '网站管理员说您无法进入此页面...'
    }
  },
  data() {
    return {
      serverUrl: config.server || {}
    }
  },
  methods: {
    toHome() {
      const code_name = this.code_name
      if (code_name) {
        this.$router
          .replace(`/home?code_name=${code_name}`)
          .then(() => {})
          .catch(() => {})
      } else {
        this.$router
          .replace('/')
          .then(() => {})
          .catch(() => {})
      }
    },
    async logout() {
      await this.$store.dispatch('user/resetToken')
      this.$router
        .replace('/')
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.wscn-http404-container {
  width: 100%;
  height: 100%;
}
.wscn-http404 {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .pic-404 {
    width: 360px;
    overflow: hidden;
    &__parent {
      width: 100%;
    }
    &__child {
      position: absolute;
      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }
      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }
        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }
        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }
        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }
      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }
        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }
        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }
        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }
      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }
        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }
        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }
        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }
  .bullshit {
    width: 300px;
    padding: 30px 0;
    margin-top: -50px;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
