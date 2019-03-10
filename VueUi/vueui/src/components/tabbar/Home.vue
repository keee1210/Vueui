<template>
  <div class="app-home"> 
    <!-- <h3>home组件</h3> -->
     <!-- 轮播图 -->
    <mt-swipe :speed="1000" :auto="6000" :defaultIndex="2" :showIndicators="true"
     :continuous="true" @change="handleChange" :prevent="true" :stopPropagation="false">
      <!-- 
        stopPropagation 是否在 touchstart 事件触发时阻止冒泡。
        prevent 是否在 touchstart 事件触发时阻止事件的默认行为。设为 true 可提高运行在低版本安卓浏览器时的性能
        defaultIndex 初始显示的轮播图的索引
       -->
      <mt-swipe-item v-for="item of list" :key="item.id">
        <img :src="item.img_url"/>
      </mt-swipe-item>
    </mt-swipe>
    <!-- <span class="mui-icon mui-icon-weixin"></span>
    <span class="mui-icon-extra mui-icon-extra-calc"></span> -->
    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
       <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/GoodList">
          <span class="mui-icon iconfont icon-shangpin">
            <!-- <span class="mui-badge"></span> -->
          </span>
          <div class="mui-media-body">畅销表款</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/Search">
              <span class="mui-icon iconfont icon-sousuo">
                <!-- <span class="mui-badge"></span> -->
              </span>
              <div class="mui-media-body">腕表选择器</div>
              </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <span class="mui-icon iconfont icon-news"></span>
              <div class="mui-media-body">品牌新闻</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/shopList">
             <span class="mui-icon iconfont icon-qicheqianlian-"></span>
              <div class="mui-media-body">购物车</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <span class="mui-icon iconfont icon-lingshoudian"></span>
              <div class="mui-media-body">零售店</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <span class="mui-icon iconfont icon-kefu"></span>
              <div class="mui-media-body">客户服务</div></a></li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){return{
    list:[]
  }},
  created(){
    this.getImages();
  },
  methods:{
    getImages(){
      var url = "http://127.0.0.1:2009/getImages";
      this.axios.get(url).then((res)=>{
        // console.log(res);
        this.list = res.data;
      })
    },
    handleChange(index){
      // console.log(index);
    }
  }
}
</script>
<style scoped>
.app-home>.mint-swipe{
  height:200px;
}
.app-home>.mint-swipe img{
  height:100%;
  width: 100%;
}
.app-home>.mui-grid-view>.mui-media {
  color:#0F3A5D;
}
.app-home>.mui-grid-view>.mui-media .mui-media-body{
  color:000000ba;
}
</style>


