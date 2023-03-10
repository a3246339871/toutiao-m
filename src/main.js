import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载vant全局样式
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.less'

// 动态设置REM基准值
import 'amfe-flexible'
// 注册使用vant组件库
Vue.use(Vant)
// 加载全局样式

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
