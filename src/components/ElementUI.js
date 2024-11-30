import Vue from 'vue'
import MLoading from './MLoading/index.js'
Vue.prototype.$ELEMENT = { zIndex: 3000 }

import {
  Form,
  FormItem,
  Button,
  Input,
  Checkbox,
  Message,
  Tooltip,
  Loading,
  Empty,
  Table,
  TableColumn,
  Card
} from 'element-ui'
const elementComponents = {
  Form,
  FormItem,
  Button,
  Input,
  Checkbox,
  Tooltip,
  Empty,
  Table,
  TableColumn,
  Card
}
Object.keys(elementComponents).forEach(key => {
  const comp = elementComponents[key]
  if (comp.name) {
    Vue.component(comp.name, comp)
  }
})

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.use(MLoading.directive)
Vue.prototype.$mLoading = MLoading.service
