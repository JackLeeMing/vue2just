<template>
  <div v-show="showLoading"
       class="sdk-global-toast">
    <svg class="loading"
         role="img"
         aria-label="loading"
         width="16"
         height="16"
         viewBox="0 0 16 16">
      <g fill="none">
        <g clip-path="url(#clip0_19498_1351)">
          <path d="M8.00013 4.19995C5.90145 4.19995 4.20013 5.90126 4.20013 7.99995C4.20013 10.0986 5.90145 11.7999 8.00013 11.7999V13.5333C4.94415 13.5333 2.4668 11.0559 2.4668 7.99995C2.4668 4.94397 4.94415 2.46661 8.00013 2.46661C11.0561 2.46661 13.5335 4.94397 13.5335 7.99995H11.8001C11.8001 5.90126 10.0988 4.19995 8.00013 4.19995Z"
                fill="#1989fa"
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill-opacity="0.9">
          </path>
        </g>
        <defs>
          <clipPath id="clip0_19498_1351">
            <rect width="16"
                  height="16"
                  fill="white"
                  transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 16 16)">
            </rect>
          </clipPath>
        </defs>
      </g>
    </svg>
    <span>{{loadingHint}}</span>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app', ['globalLoading', 'loadingText']),
    ...mapGetters('project', ['projectLoading', 'projectLoadError', 'deviceLoading']),
    showLoading() {
      const projectLoadError = this.projectLoadError
      return !projectLoadError && (this.globalLoading || this.projectLoading || this.deviceLoading)
    },
    loadingHint() {
      const hint = '正在加载...'
      const loadingText = this.loadingText
      return loadingText || hint
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
.sdk-global-toast {
  z-index: 2002;
  position: fixed;
  height: 35px;
  display: inline-flex;
  align-items: center;
  text-align: left;
  min-width: 80px;
  top: 5px;
  left: 50%;
  transform: translate(-50%);
  line-height: 32px;
  padding: 0 20px;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-word;
  border: 1px solid #e6e9ef;
  border-radius: 0px;
  font-size: 0;
  background-color: #fff;
  color: #000000;
  box-shadow: 0 2px 4px 0 rgba(54, 58, 80, 0.16);
  .error {
    width: 20px;
    height: 20px;
  }
}
.sdk-global-toast .loading {
  animation: loadSpin 1s linear infinite;
}

.sdk-global-toast span {
  margin-left: 6px;
  font-size: 12px;
}
</style>
