import Vue from 'vue'
import App from './App'
import {post, get} from '../src/utils/requestMethod'
Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/commodity/main',
      'pages/personalcenter/main',
      'pages/setupshop/main',
      'pages/orderform/main',
      'pages/refund/main',
      'pages/finance/main',
      'pages/pandect/main',
      'pages/disembark/main'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '酒窝掌柜',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#1296db',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/index/main',
          iconPath: '/static/image/daichuli.png',
          selectedIconPath: '/static/image/daichuli1.png',
          text: '首页'
        },
        {
          pagePath: 'pages/commodity/main',
          iconPath: '/static/image/shangpin.png',
          selectedIconPath: '/static/image/shangpin1.png',
          text: '商品'
        },
        {
          pagePath: 'pages/personalcenter/main',
          iconPath: '/static/image/geren.png',
          selectedIconPath: '/static/image/geren1.png',
          text: '个人中心'
        }
      ]
    }
  }
}
