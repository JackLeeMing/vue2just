<template>
  <div>
    <el-button type="primary"
               :loading="loading"
               size="small"
               @click="onLoginClick">
      登录
    </el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onLoginClick() {
      this.login()
    },
    async login() {
      const loginData = {
        hostname: ' server-65521.ssh.smartbow.cn',
        port: 22,
        username: 'root',
        password: 'root',
        passphrase: '',
        totp: '',
        term: 'xterm-256color',
        _xsrf: '2|5ecf9ab3|886171e28059889bc0ed6026295b4d21|1734413016'
      }
      const requestConfig = {
        url: 'http://localhost:8888/',
        method: 'post',
        withCredentials: false,
        data: new URLSearchParams(loginData)
      }
      try {
        const res = await axios(requestConfig)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>