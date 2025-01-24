<template>
  <div class="taobao">
    <el-input v-model="textareaUrl"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入有效的网址">
    </el-input>
    <div class="buttons">
      <el-button type="primary"
                 size="small"
                 @click="parseUrl">
        解析
      </el-button>
    </div>
    {{queryParams}}
  </div>
</template>

<script>
import { parseRawUrl } from './utils'
export default {
  data() {
    return {
      textareaUrl:
        'https://detail.tmall.com/item.htm?abbucket=19&id=577772384641&ns=1&pisk=gZkjeb6GgVHy9qLiZqxzRkG4J2w_C3JFlGZtxcBVX-eYWbin5r-Mi-l75437kt-Di5Uso-FigPz45RiiR38eLpommR228eJFyrZY1JbYWtQayzETCopXUQ-xmR295gW9TpimJCSzdsET23ZabtExWSeRwl48DtUtWzF8vk5TBVe9V8E_bOETBPnJelaRMZBAHaF8XoBO6PFvV0UuXRUtWShZ5CE1GriXcXkA4bYTTmU5BOHvnSaBZzEu4YsLMyixhOBOjoNbJmUJ8eskf5gbGYJf-oG-AqrjSpX0H5Gx9-H6RKw-xbuYVVLC1zhInANEhe13kx4iR-hWytwTHxGUtROCmukj2vVsnE68l4m-T-DprOgK4Dk0ZATCyPc4x8EjNhC8k5Ird9zQ6m11VWX_Vy-WV1fMoxgHpjubDrVYqoiDV3_bsSEuVRKWV1fgMuqb13t5l5f..&priceTId=undefined&skuId=3990374782230&spm=a21n57.1.item.3.27ab523cWST1yh&utparam=%7B%22aplus_abtest%22%3A%22339043cd2866a7bd4f69c910449d0c7f%22%7D&xxc=taobaoSearch',
      updatedUrl: {}
    }
  },
  computed: {
    queryParams() {
      const updatedUrl = this.updatedUrl || {}
      return updatedUrl.queryParams
    }
  },
  methods: {
    parseUrl() {
      const urlStr = this.textareaUrl
      this.updatedUrl = parseRawUrl(urlStr)
    }
  }
}
</script>

<style lang="scss" scoped>
.taobao {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}
.buttons {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>