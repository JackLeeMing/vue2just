import Vue from '../vue.esm.browser.js'
import App from './App.js'
const camelizeRE = /-(\w)/g
function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    console.log(arguments)
    return c.toUpperCase()
  })
}

const Button = {
  props: ['cname', 'abc'],
  name: 'MyButton',
  data() {
    return {
      count: 0
    }
  },
  template: '<button @click="count++">{{cname}} You clicked me {{ count }} times. {{abc}}</button>',
  install(Vue) {
    var name = this.name
    Vue.component(name.toLowerCase(), this)
    Vue.component(camelize('-' + name), this)
  }
}
// 全局注册的组件会自动变为-格式
Vue.component('MyComp', {
  name: 'MyComp',
  data() {
    return {
      title: 'MyComp',
      name1: 'MyComp1'
    }
  },
  template: '<div class="my-comp">{{title}}/{{name1}}</div>',
  render(h) {
    //  createElement$1(context, tag, data, children, normalizationType, alwaysNormalize)

    const node = h('Div', { title: this.title }, ['--- ---'])
    console.log(node)
    return node
  }
})
Vue.use(Button)

const vueApp = new Vue({
  data: {
    testData: window.__testData
    // array: window.__array
  },
  template: '<div>{{testData.age}}</div>'
  // render: h => h(App)
})
vueApp.$mount('#appRoot')

window.vueApp = vueApp
