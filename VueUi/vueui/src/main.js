import Vue from 'vue'
import App from './App'
import router from './router/router'

// 0.1：引入vuex库
import  Vuex from "vuex"
// 0.2:注册vuex库
Vue.use(Vuex);
// 0.3:配置vuex:在Vuex中创建store容器 $store
var store = new Vuex.Store({
  // 存储共享数据
  state:{
    cartCount:0,
    code:-1//1： 登录/-1：未登录
  },
  getters:{ //组件获取共享数据//组件中直接用{{$store.getters.CartCount}}
    code(state){return state.code},
    CartCount(state){
      state.cartCount = localStorage.getItem("key");
      console.log(state.cartCount);
      return state.cartCount;
    }
  },
  //操作(添加、修改、删除等)共享数据
  mutations:{//this.$store.commit
    code1(state){
      state.code = 1;
    },
    code_1(state){
      state.code = -1;
    },
    increment(state){
      state.cartCount++;
    },
    substract(state){
      state.cartCount--;
    },
    swichCartCount_0(state){
      state.cartCount = 0;
    }
    ,
    swichCartCount_LocalStorage(state){
      // console.log("OKK");
      state.cartCount = localStorage.getItem("key");
    }
  }
})

//全局引入axios模块
import axios from "axios";
//配置axios模块跨域发送请求时 让客户端保存session id值
axios.defaults.withCredentials = true;
//在Vue的原型链上设置axios方法
Vue.prototype.axios = axios; 

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

import'mint-ui/lib/style.css'
import MintUI from "mint-ui"
// console.log(MintUI);
Vue.use(MintUI);
import './lib/mui/css/iconfont.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

new Vue({
  el: '#app',
  router,//将路由器router加入到当前页面的根组件
  store,//将vuex对象添加到vue实例中
  components: { App },
  template: '<App/>'
})
