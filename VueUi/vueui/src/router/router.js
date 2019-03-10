import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HOME from "../components/tabbar/Home"
import Register from "../components/userCenter/Register"
import Login from "../components/tabbar/Login.vue"
import ShopList from "../components/tabbar/ShopList.vue"
import Search from "../components/tabbar/Search.vue"
import hello from "../components/hello"
import Logout from "../components/userCenter/Logout.vue"
import GoodList from "../components/goods/goodList.vue"
import GoodsInfo from "../components/goods/GoodsInfo.vue";
import NotFound from '../components/userCenter/NotFound';
Vue.use(Router)

export default new Router({
  routes: [
    {path:"/",component:HOME},
    {path:"/Home",component:HOME},
    {path: '/HelloWorld',component: HelloWorld},
    {path:"/hello",component:hello},
    {path:"/Register",component:Register},
    {path:"/Login",component:Login},
    {path:"/ShopList",component:ShopList},
    {path:"/Search",component:Search},
    {path:"/Logout",component:Logout},
    {path:"/GoodList",component:GoodList},
    {path:"/GoodsInfo/:id",component:GoodsInfo},
    {path:"*",component:NotFound}
  ]
})

