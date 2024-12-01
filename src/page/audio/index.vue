<template>
  <div class="data-form">
    <div v-show="false"
         class="download">
      <a id="fileSys-download"
         ref="fileSys-download"></a>
    </div>
    <p class="url">url: {{url}}</p>
    <div v-if="!recording && audioURL"
         class="video-ppo">
      <audio :src="audioURL"
             controls />
      <div>
        <el-button v-if="form.sound_file"
                   size="small"
                   type="text"
                   @click="onDownloadRecordClick">
          下载录音
        </el-button>
        &nbsp;
        <span v-if="fileSize">
          {{fileSize}}kb
        </span>
      </div>
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
            {{recording ? 'STOP': form.sound_file ? 'RESTART':'START'}}
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
      <div v-if="backUrl"
           class="back-video video-ppo">
        <audio :src="backUrl"
               controls />
        <div>
          <el-button v-if="resFile"
                     size="small"
                     type="text"
                     @click="onDownloadResultClick">
            下载结果
          </el-button>
          &nbsp;
          <span v-if="resSize">{{resSize}}kb</span>
        </div>
      </div>
      <div class="submit-button">
        <van-button class="van-button-r4"
                    block
                    type="primary"
                    :loading="posting"
                    :disabled="!form.sound_file"
                    native-type="submit">
          【{{browerType}}】发 送
        </van-button>
      </div>
    </van-form>
    <div v-if="resData"
         class="resData">
      {{resData}}
    </div>
    <div class="agent">{{agent}}</div>
  </div>
</template>

<script>
export function blobToFile(blob, fileName) {
  return new File([blob], fileName, { type: blob.type })
}
import { getBrowserType } from '@/utils/lib.js'
import request from '@/utils/request/index.js'
import { Toast, Notify } from 'vant'
import axios from 'axios'
const CancelToken = axios.CancelToken
const proxyAPI = 'https://audio.h5lego.cn/audioapi'
const isHttps = () => {
  return location.protocol === 'https:'
}
const formateFileSize = size => {
  const kb = size / 1024
  if (kb > 800) {
    return (kb / 1024).toFixed(2)
  }
  return kb.toFixed(2)
}
export default {
  components: {},
  computed: {
    url() {
      const useProxy = this.useProxy
      const { host, path } = this.form
      return useProxy ? `${proxyAPI}/${path}` : `${host}/${path}`
    },
    locHost() {
      return proxyAPI
    },
    isSafari() {
      const browerType = this.browerType
      return browerType === 'Safari'
    },
    isFirefox() {
      const browerType = this.browerType
      return browerType === 'Firefox'
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
        conversation_id: '',
        sound_file: null
      },
      audoType: 'audio/webm',
      audoTypes: [
        { text: 'audio/webm [ALL]', key: 'audio/webm', suffix: 'webm' },
        { text: 'audio/ogg [Firefox]', key: 'audio/ogg', suffix: 'ogg' },
        { text: 'audio/mp3 [Safari]', key: 'audio/mp3', suffix: 'mp3' },
        { text: 'audio/wav', key: 'audio/wav', suffix: 'wav' },
        { text: 'audio/raw', key: 'audio/raw', suffix: 'raw' }
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
      backUrl: '',
      fileSize: '',
      resSize: '',
      ppoerror: '',
      browerType: '',
      agent: '',
      resFile: null
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
    onDownloadRecordClick() {
      //  window.open(this.fileUrl, '__blank')
      const { sound_file } = this.form
      this.saveAudio(sound_file)
    },
    onDownloadResultClick() {
      this.saveAudio(this.resFile)
    },
    async startRecord() {
      this.resFile = null
      this.form.sound_file = null
      this.audioURL = ''
      this.fileUrl = ''
      const audoType = this.audoTypes.find(_item => _item.key === this.audoType)
      if (!audoType) return
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        // { mimeType: audoType.key }
        // const isSafari = this.isSafari
        const isFirefox = this.isFirefox
        this.mediaRecorder = isFirefox
          ? new MediaRecorder(stream, { mimeType: audoType.key })
          : new MediaRecorder(stream)
        const chunks = []
        this.mediaRecorder.ondataavailable = event => {
          console.error(event)
          if (event.data.size > 0) {
            chunks.push(event.data)
          }
          console.error('ondataavailable')
        }
        this.mediaRecorder.onstop = () => {
          if (chunks.length > 0) {
            const blob = new Blob(chunks, { type: audoType.key })
            const url = URL.createObjectURL(blob)
            this.audioURL = url
            const file = blobToFile(blob, `${Date.now()}.${audoType.suffix}`)
            console.error('file', file)
            this.form.sound_file = file
            this.fileSize = formateFileSize(file.size)
            Toast('录音结束!')
          } else {
            Toast('录音无效!')
          }
        }
        this.mediaRecorder.start()
        this.recording = true
        Toast('开始录音')
      } catch (error) {
        Notify({ type: 'danger', message: '录音初始化失败!录音格式不支持!' })
        console.error('Error accessing microphone:', error)
      }
    },
    async stopRecord() {
      if (this.mediaRecorder && this.recording) {
        this.mediaRecorder.stop()
      }
      this.recording = false
    },
    stopRequest() {
      if (this.cancelSource) {
        this.cancelSource.cancel('stop_dataView_request')
      }
      this.cancelSource = null
    },
    saveAudio(sound_file) {
      // 假设你有一个File对象
      // 创建一个Blob URL来作为下载链接的href
      const blobUrl = URL.createObjectURL(sound_file)
      // 创建一个a标签并设置其href和下载属性
      const downloadLink = document.createElement('a')
      downloadLink.href = blobUrl
      downloadLink.download = sound_file.name
      // 触发下载
      downloadLink.click()
      // 除Blob URL
      URL.revokeObjectURL(blobUrl)
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
      console.error('-- sound_file --', sound_file.size)
      formData.append('sound_file', sound_file)
      // this.saveAudio(sound_file)
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
        const res = await request({ type: 'UPLOAD_MPEG', url, data: formData, source: this.cancelSource })
        Toast.success('请求成功!')
        this.form.conversation_id = res.headers['conversation_id'] || ''
        const blob = new Blob([res.data], {
          type: 'audio/mpeg'
        })
        const _url = URL.createObjectURL(blob)
        this.backUrl = _url
        const resFile = blobToFile(blob, `${Date.now()}.mpeg`)
        const resSize = resFile ? resFile.size : 0
        if (resSize) {
          this.resSize = formateFileSize(resSize)
          this.resFile = resFile
        } else {
          Toast.fail('响应失败，返回内容为空!')
        }
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
    },
    async downloadFile() {
      try {
        const url =
          'http://filesystem-api.sdhscloud.com/api/v1/filesystem/download/603eb664-aeec-11ef-8592-daa9a34ec6a1?container_name=audio&isCeche=1'
        const res = await request({ type: 'download', url, data: {}, source: null })
        let aLink = window.document.getElementById('fileSys-download')
        console.log(aLink)
        if (!aLink) {
          aLink = document.createElement('a')
          document.body.appendChild(aLink)
        }
        const blob = new Blob([res.data], {
          type: 'audio/mp3'
        })
        const resFile = blobToFile(blob, `${Date.now()}.mp3`)
        this.resSize = resFile ? resFile.size : 0
        aLink.href = URL.createObjectURL(blob)
        aLink.download = `${Date.now()}.mp3`
        aLink.click()
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {},
  mounted() {
    this.browerType = getBrowserType()
    let audoType = 'audio/webm'
    switch (this.browerType) {
      case 'Firefox':
        audoType = 'audio/ogg'
        break
      case 'Safari':
        audoType = 'audio/mp3'
        break
    }
    this.agent = navigator.userAgent || ''
    this.audoType = audoType
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
  margin-top: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  audio {
    height: 38px;
  }
  border: 1px solid #0fb6c6;
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
}
.resData {
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid #c60c0c;
  border-radius: 4px;
}
.url {
  padding: 5px;
  border: 1px solid #acacac;
  border-radius: 4px;
  overflow: hidden;
  font-size: 12px;
  margin: 0px;
}
.back-video {
  margin-top: 8px;
  border: 1px solid #0fb6c6;
  border-radius: 4px;
}
.agent {
  color: #acacac;
  margin-top: 16px;
  padding: 5px;
  box-sizing: border-box;
  text-align: center;
  font-size: 12px;
}
</style>