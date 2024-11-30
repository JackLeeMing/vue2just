<template>
  <div class="data-form">
    <div class="url">url: {{url}}</div>
    <div v-if="!recording && audioURL"
         class="video-ppo">
      <audio :src="audioURL"
             controls />
    </div>
    <van-form validate-first
              style="margin-top:8px"
              label-width="8.2em"
              @submit="onSubmit"
              @failed="onFailed">
      <van-field name="useProxy"
                 label="使用代理"
                 placeholder="useProxy"
                 clearable>
        <template #input>
          <van-switch v-model="useProxy"
                      :disabled="isHttps" />
        </template>
      </van-field>
      <van-field name="audoType"
                 label="录音格式"
                 placeholder="audoType"
                 clearable>
        <template #input>
          <van-popover v-model="showPopover"
                       trigger="click"
                       :actions="audoTypes"
                       @select="onSelect">
            <template #reference>
              <el-button type="text"
                         :disabled="recording">
                {{audoType}}&nbsp;&nbsp;<van-icon name="arrow-down" />
              </el-button>
            </template>
          </van-popover>
        </template>
      </van-field>
      <van-field v-model="form.host"
                 name="host"
                 label="host"
                 placeholder="Host"
                 required
                 clearable
                 :rules="[{required: true, message: '请填写Host'}]">
        <template v-if="useProxy"
                  #input>
          {{locHost}}
        </template>
      </van-field>
      <van-field v-model="form.path"
                 name="path"
                 label="path"
                 placeholder="path"
                 required
                 clearable
                 :rules="[{ required: true, message: '请填写path' }]">
      </van-field>
      <van-field v-model="form.stt_type"
                 name="stt_type"
                 label="stt_type"
                 placeholder="stt_type"
                 required
                 clearable
                 :rules="[{ required: true, message: '请填写stt_type' }]">
      </van-field>
      <van-field v-model="form.tts_type"
                 name="tts_type"
                 label="tts_type"
                 placeholder="tts_type"
                 required
                 clearable
                 :rules="[{ required: true, message: '请填写tts_type' }]">
      </van-field>
      <van-field v-model="form.user_id"
                 name="user_id"
                 label="user_id"
                 placeholder="user_id"
                 required
                 clearable
                 :rules="[{ required: true, message: '请填写user_id' }]">
      </van-field>
      <van-field v-model="form.bot_id"
                 name="bot_id"
                 label="bot_id"
                 placeholder="bot_id"
                 required
                 clearable
                 :rules="[{ required: true, message: '请填写bot_id' }]">
      </van-field>
      <van-field v-model="form.conversation_id"
                 name="conversation_id"
                 label="conversation_id"
                 placeholder="conversation_id"
                 clearable>
      </van-field>
      <van-field name="sound_file"
                 label="sound_file"
                 placeholder="sound_file"
                 clearable>
        <template #input>
          <el-button size="small"
                     :disabled="posting"
                     :type="recording ? 'danger':'primary'"
                     @click="onRecordStart">
            {{recording ? 'STOP':'START'}}
            <van-icon v-if="recording"
                      name="stop-circle-o" />
          </el-button>
          <el-button v-if="posting"
                     size="small"
                     type="danger"
                     @click="onCancelClick">
            CANCEL
          </el-button>
        </template>
      </van-field>
      <div class="submit-button">
        <van-button class="van-button-r4"
                    block
                    type="primary"
                    :loading="posting"
                    :disabled="!form.sound_file"
                    native-type="submit">
          发 送
        </van-button>
      </div>
      <div v-if="backUrl"
           class="back-video video-ppo">
        <audio :src="backUrl"
               controls />
      </div>
    </van-form>
    <div v-if="resData"
         class="resData">
      {{resData}}
    </div>
  </div>
</template>

<script>
export function blobToFile(blob, fileName) {
  return new File([blob], fileName, { type: blob.type })
}
import request from '@/utils/request/index.js'
import { Toast, Notify } from 'vant'
import axios from 'axios'
const CancelToken = axios.CancelToken
const proxyAPI = 'https://audio.h5lego.cn/audioapi'
const isHttps = () => {
  return location.protocol === 'https:'
}
export default {
  computed: {
    url() {
      const useProxy = this.useProxy
      const { host, path } = this.form
      return useProxy ? `${proxyAPI}/${path}` : `${host}/${path}`
    },
    locHost() {
      return proxyAPI
    }
  },
  data() {
    return {
      isHttps: isHttps(),
      form: {
        path: 'dev/agent/speak',
        host: 'http://121.43.189.187:8080',
        stt_type: 'stt1',
        tts_type: 'tts1',
        user_id: 'mihua001',
        bot_id: '11',
        conversation_id: '',
        sound_file: null
      },
      //raw / wav / mp3 / ogg
      audoType: 'audio/mp3',
      audoTypes: [
        { text: 'audio/mp3', key: 'audio/mp3', suffix: 'mp3' },
        { text: 'audio/wav', key: 'audio/wav', suffix: 'wav' },
        { text: 'audio/raw', key: 'audio/raw', suffix: 'raw' },
        { text: 'audio/ogg', key: 'audio/ogg', suffix: 'ogg' }
      ],
      recording: false,
      showPopover: false,
      audioURL: null,
      fileUrl: '',
      uploading: false,
      posting: false,
      ging: false,
      resData: null,
      useProxy: isHttps(),
      backUrl: ''
    }
  },
  methods: {
    onCancelClick() {
      Toast.clear()
      this.stopRequest()
    },
    onSelect(item) {
      this.audoType = item.key
    },
    onSubmit() {
      if (this.posting) return
      const { sound_file } = this.form
      if (!sound_file) {
        Notify({ type: 'danger', message: '你还没录音!' })
        return
      }
      this.uploadFileRequest(this.form)
    },
    onFailed() {},
    onRecordStart() {
      if (this.recording) {
        this.stopRecord()
      } else {
        this.startRecord()
      }
    },
    onDownloadClick() {
      window.open(this.fileUrl, '__blank')
    },
    async startRecord() {
      this.blobChunks = []
      this.audioURL = ''
      this.fileUrl = ''
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.mediaRecorder = new MediaRecorder(stream)
        this.mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            this.blobChunks.push(event.data)
          }
        }
        const audoType = this.audoTypes.find(_item => _item.key === this.audoType)
        if (!audoType) return
        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.blobChunks, { type: audoType.key })
          const url = URL.createObjectURL(blob)
          this.audioURL = url
          const file = blobToFile(blob, `${Date.now()}.${audoType.suffix}`)
          this.form.sound_file = file
        }
        this.mediaRecorder.start()
        this.recording = true
        Toast('开始录音')
      } catch (error) {
        console.error('Error accessing microphone:', error)
      }
    },
    async stopRecord() {
      Toast('录音结束!')
      if (this.mediaRecorder && this.recording) {
        this.mediaRecorder.stop()
        Toast('录音结束!')
      }
      this.recording = false
    },
    stopRequest() {
      if (this.cancelSource) {
        this.cancelSource.cancel('stop_dataView_request')
      }
      this.cancelSource = null
    },
    // 上传文件
    async uploadFileRequest(form) {
      this.posting = true
      this.backUrl = ''
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: false,
        message: '请求发送中...'
      })
      const { path, host, sound_file } = form
      const audoType = this.audoType
      const useProxy = this.useProxy
      const url = useProxy ? `${proxyAPI}/${path}?audo_type=${audoType}` : `${host}/${path}?audo_type=${audoType}`
      const formData = new FormData()
      formData.append('sound_file', sound_file)
      const keys = Object.keys(form)
      const igs = ['path', 'host', 'sound_file']
      for (const key of keys) {
        if (!igs.includes(key)) {
          formData.append(key, form[key])
        }
      }
      this.stopRequest()
      try {
        this.cancelSource = CancelToken.source()
        const res = await request({ type: 'upload_mpeg', url, data: formData, source: this.cancelSource })
        console.error(res)
        const audioBlob = res.data
        const audioUrl = URL.createObjectURL(audioBlob)
        this.backUrl = audioUrl
        Toast.success('请求成功!')
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message)
          Toast('请求取消!')
        } else {
          if (error.response && error.response.data) {
            this.resData = error.response.data
          } else {
            this.resData = error
          }
          Toast.fail('请求报错!')
        }
      } finally {
        this.posting = false
        this.cancelSource = null
      }
    }
  },
  created() {
    this.blobChunks = []
  }
}
</script>
<style lang="scss">
.data-form {
  .van-cell:first-child {
    border-radius: 4px 4px 0px 0px;
  }
  .van-cell:nth-child(9) {
    border-radius: 0px 0px 4px 4px;
  }
}
</style>
<style lang="scss" scoped>
.data-form {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}
.test-audio {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 15vh;
}
.audios {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.submit-button {
  padding: 16px 0;
}
.video-ppo {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  audio {
    height: 38px;
  }
}
.resData {
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid #acacac;
  border-radius: 4px;
}
.url {
  padding: 16px;
  border: 1px solid #acacac;
  border-radius: 4px;
  overflow: hidden;
}
.back-video {
  border: 1px solid #0fb6c6;
  border-radius: 4px;
}
</style>