import Vue from 'vue'
import _ from 'lodash'
window._ = _ 
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './common/events'
import './common/install'
import store from './store'
Vue.use(ElementUI)
Vue.config.productionTip = false

import './assets/styles/css_initialize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font-icon/iconfont.css'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
