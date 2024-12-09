<template>
  <div class="single-data">
    <div>{{fullName}}</div>
    <div>{{fullName}}</div>
    <div>
      <van-button type="primary"
                  size="mini"
                  @click="changeName($event)">
        改名
      </van-button>
    </div>
    <div>
      <el-pagination ref="pagination"
                     :current-page.sync="currentPage1"
                     :page-size="10"
                     layout="total, prev, pager, next, sizes"
                     :total="80"
                     background
                     :page-sizes="[10, 20, 50, 100]"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     @hello="onPageHello">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: 12,
      firstName: 'Jack',
      lastName: 'Lee',
      currentPage1: 1
    }
  },
  computed: {
    fullName: {
      get() {
        console.error('fullName call')
        return this.firstName + '.' + this.lastName
      },
      set(val) {
        console.error('set', val)
      }
    }
  },
  methods: {
    onPageHello(...args) {
      console.log(args)
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    getFullName() {
      console.log('getFullName call')
      return this.firstName + '.' + this.lastName
    },
    changeName(event) {
      if (!this.event) {
        this.event = event
      } else {
        console.log(Object.is(event, this.event))
      }
      this.firstName = 'Tom'
      this.lastName = 'Jason'
      this.fullName = '哈哈哈😄'
      console.log(event)
      setTimeout(function () {
        console.log(this, event)
      }, 5000)
    }
  },
  mounted() {
    window.pagination = this.$refs.pagination
    document.getElementById('my-button').addEventListener('click', function (event) {
      console.dir(this)
      console.log(event) // 指向被点击的按钮元素
    })
  }
}
</script>

<style lang="scss" scoped>
.single-data {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>