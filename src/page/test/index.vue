<template>
  <div class="test-page">
    <TestData v-show="showTest"
              ref="testData" />
    <TestData2 ref="testData2" />
    <div class="testData">
      {{testData.id}}, {{testData.obj.name}}
    </div>
    <van-cell-group>
      <van-cell title="Object"
                value="测试"
                is-link
                clickable
                @click="onObjectClick" />
      <van-cell title="Vue"
                value="测试"
                is-link
                clickable
                @click="onVueTestClick" />
      <van-cell title="更改数据"
                value="测试"
                is-link
                clickable
                @click="onChangeTestData" />
      <van-cell title="测试Person"
                value="测试"
                is-link
                clickable
                @click="onPersonTest" />
      <van-cell title="柯理化"
                value="测试"
                is-link
                clickable
                @click="onCurryTest" />
    </van-cell-group>
    <div class="results">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Person from './person'
import TestData from './components/TestData.vue'
import TestData2 from './components/TestData2.vue'
import app from '@/main.js'
export default {
  components: {
    TestData,
    TestData2
  },
  data() {
    return {
      results: [],
      testData: {
        id: 1,
        obj: {
          name: 'Jack'
        }
      },
      showTest: true
      // data 如果是对象  renderTracked 会先外层对象 再各个属性
    }
  },
  errorCaptured() {
    console.error('----errorCaptured----')
  },
  beforeUpdate() {
    console.error('--- beforeUpdate ---', arguments)
  },
  updated() {
    console.error('--- updated ---', arguments)
  },
  renderTracked() {
    console.error('--- renderTracked ---', arguments)
  },
  renderTriggered() {
    console.error('--- renderTriggered ---', arguments)
  },
  methods: {
    onObjectClick() {
      //   const a = Object('a')
      //   const a1 = 'a'
      //   this.results.push(Object.is(a, a1), a, a1)
      //   console.log('----------')
      //   const n = Object(1)
      //   const n1 = 1
      //   this.results.push(Object.is(n, n1), n, n1)
      //   console.log('----------')
      //   const obj = { a: 1 }
      //   const o = Object(obj)
      //   const o1 = new Object(obj)
      //   this.results.push(Object.is(obj, o), Object.is(obj, o1), obj, o, o1)
      //   console.log('----------')
      //   this.functionTest()
      //   const testData = this.$refs.testData
      //   const testData2 = this.$refs.testData2
      //   const _data1 = testData.getData()
      //   const _data2 = testData2.getData()
      //   console.log(data === _data1, _data2 === data)
      console.dir(TestData)
      let MessageConstructor = Vue.extend(TestData)
      console.dir(MessageConstructor)
      const ele = new MessageConstructor()
      ele.$mount()
      console.dir(ele.$el)
    },
    onVueTestClick() {
      console.log('-----start-----')
      console.dir(this instanceof Vue)
      const testData = this.$refs.testData
      console.dir(testData instanceof Vue)
      console.log('----------')
      console.log('TestData')
      console.dir(testData)
      console.log('this')
      console.dir(this)
      console.log('App')
      console.dir(app)
      const node = this._vnode
      console.dir(node)
      console.log('-----end-----')
      console.dir(Vue)
    },
    onChangeTestData() {
      window.$vueThis = this
      // window.__testData.age = 102
      // this.showTest = false
      setTimeout(() => {
        // console.log(window.__testData)
        this.testData.id = 104
        this.testData.obj.name = 'LeeMing'
        this.testData.arr = [789, 8910]
        // this.showTest = true
        console.dir(this.$refs.testData)
      }, 5000)
    },
    functionTest() {
      function example(a, b) {
        console.log(a, b, this)
        var c = 10
        // eslint-disable-next-line no-redeclare
        function a() {
          console.log(c, this)
        }
        a()
      }
      example(1, 2)
    },
    onPersonTest() {
      const person1 = new Person('1', 1)
      const person2 = new Person('2', 2)
      console.log(person1)
      Object.defineProperty(person2, 'TAG2', {
        value: 'Person',
        configurable: false,
        writable: false,
        enumerable: false
      })
      console.log(person2)
      console.log('TAG' in person2, Object.keys(person2), 'TAG2' in person2)
      console.log('TAG' in person1, Object.keys(person1))
      // for in 包含原型上的属性 in
      // Object.keys 只获取对象本身属性
      for (const k in person1) {
        console.log(k)
      }
    },
    onCurryTest1() {
      function f(x, y, z) {
        return (x + y) * z
      }
      // (2+3)*5   (2+8)*6  (2+9)*12
      function curry(fn, ...args) {
        // const self = this
        return function (...args2) {
          const allArgs = [...args, ...args2]
          // 参数数量够了 执行函数
          if (allArgs.length >= fn.length) {
            return fn(...allArgs)
          } else {
            // 参数数量不够
            return curry(fn, ...allArgs)
          }
        }
      }
      const g = curry(f, 2)
      const g1 = g(3)
      console.log(g1(5), g(8, 6), g(9, 12))
    },
    onCurryTest() {
      function testFunc() {
        console.log(this)
      }
      testFunc()
    }
  }
}
</script>

<style lang="scss" scoped>
.test-page {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.testData {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #0fb6c6;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px;
}
</style>