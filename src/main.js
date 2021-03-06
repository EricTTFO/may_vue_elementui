import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import '@/icons' // icon 引入icons文件夹下所有的icon

import './plugins/element.js'

import './styles/index.scss'


Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
