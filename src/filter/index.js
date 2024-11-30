import Vue from 'vue'
import timeF from './timeF.js'
const filters = {
  timeF
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
