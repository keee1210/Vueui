<template>
  <div class="app-goodsInfo">
    <div class="info">
      <div class="img">
        <img :src="info.bimg_url">
      </div>
      <div class="info_desc">
        <h3>
          <span>¥&nbsp;{{info.price}}</span>
          <span><a href="#">查看花呗分期详情</a></span>
        </h3>
        <h5>浪琴表名匠系列</h5>
        <h6>Ø {{info.D}} mm  {{info.style}}</h6>
      </div>
      <div class="control">
        <div class="size">
          <select v-model="size">
            <option>--请选择--</option>
            <option value="13">13 cm</option>
            <option value="13.5">13.5 cm</option>
            <option value="14">14 cm</option>
            <option value="14.5">14.5 cm</option>
            <option value="15">15 cm</option>
            <option value="15.5">15.5 cm</option>
            <option value="16">16 cm</option>
            <option value="16.5">16.5 cm</option>
            <option value="17">17 cm</option>
            <option value="17.5">标准表带尺寸17.5 cm</option>
          </select>
        </div>
        <div>
          <a href="javascript:;">如何测量您的表带尺寸</a>
        </div>
      </div>
      <ul class="info_details">
        <li class="first">
          <label>表款编码</label>
          <span>{{info.spec}}</span>
        </li>
        <li>
          <label>表壳材质:</label>
          <span>{{info.material_case}}</span>
        </li>
        <li>
          <label>表带材质:</label>
          <span>{{info.material_strap}}</span>
        </li>
        <li>
          <label>表盘指针:</label>
          <span>{{info.pointer}}</span>
        </li>
        <li>
          <label>表盘刻度:</label>
          <span>{{info.dial}}</span>
        </li>
        <li>
          <label>表盘颜色:</label>
          <span>{{info.color}}</span>
        </li>
        <li>
          <label>机芯类型:</label>
          <span>{{info.type_num}}</span>
          <span>{{info.type_desc}}</span>
          <span>{{info.shock}}</span>             
        </li>
      </ul>
      <div class="handle">
        <mt-button @click="addCart">加入购物车</mt-button>
        <mt-button>现在购买</mt-button>
      </div>
    </div>
    <swiper-box :list="list"></swiper-box>
  </div>
</template>
<script>
import swipe  from "../sub/swiper.vue";
export default {
  components:{
    "swiper-box":swipe
  },
  created(){
    var id  = this.$route.params.id;
    // console.log(id);
    this.getImages();
    this.getgoodInfo();
  },
  data(){
    return{
      from_path:"",
      s_detail_info:{},
      list:[],
      id:0,
      info:{},
      count:1,
      size:17.5//默认值
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      // 通过 `vm` 访问组件实例,将值传入from_path
      vm.from_path = from.path;
      console.log(vm.from_path);
    })
  },
  methods:{
    getImages(id){//详情页轮播图图片：优雅之选
      var url = "http://127.0.0.1:2009/DetailSliser?pid3=3&pid4=4";
      this.axios.get(url).then((res)=>{
        var list_s = res.data.data_s;
        var list_g = res.data.data_g;
        // console.log( list_g);
        // console.log( list_s);
        for(var i=0;i<list_g.length;i++){
            list_g[i].id          = list_s[i].id; 
            list_g[i].pid         = list_s[i].pid;
            list_g[i].imgUrlSlider= list_s[i].imgUrlSlider;
            list_g[i].material    = list_s[i].material;
            list_g[i].dial_slider = list_s[i].piddial_slider;
            list_g[i].strap       = list_s[i].strap;
        }
        this.list =list_g;
        // console.log(this.list); 
      });
      if(this.from_path == "/GoodList"){
        for(var i=0;i<this.list.length;i++){
          if(this.list[id] == this.list[i]){
            console.log(id,this.from_path);
            this.s_detail_info = this.list[i-1];
            // console.log(this.s_detail_info);
          }
        }
        this.getgoodInfo(this.s_detail_info);
      }
    },
    getgoodInfo(info){
      var id = this.$route.params.id;
      this.id = id;
      if(this.from_path == "/GoodList"){
        this.info = info;
        console.log(this.info);
      }else{
        var url = "http://127.0.0.1:2009/getProduct";
        this.axios.get(url,{
          params:{
            id
          }
        }).then((res)=>{
          this.info = res.data.data;
          console.log( this.info);
        });
      }
    },
    // addCart
    // `goodId`, `count`, `price`, `size`
    addCart(){
      var goodId = this.id;
      var count = this.count;
      var price = this.info.price;
      var size = this.size;
      var url = "http://127.0.0.1:2009/addCart";
      this.axios.get(url,{
        params:{
          goodId,
          count,
          price,
          size
        }
      })
      .then((res)=>{
        console.log(res);
        if(res.data.code ==1){
          this.$store.commit("increment");

          var value = localStorage.getItem("key");
          value++;
          localStorage.setItem("key",value);
          
          this.$toast(res.data.msg);
          console.log("code"+res.data.msg);
        }else if(res.data.code == -1){
          this.$toast(res.data.msg);
          console.log("code:"+res.data.msg);
        }else if(res.data.code == 0){
          this.$toast({
            message:res.data.msg,
            duration:2000
          });
          setTimeout(()=>{
            this.$router.push("/Login");
          },2000);
        }
      })
    }
  },
  watch:{//监控
      "$route":{//当地址栏中的内容发生变化时
        handler(to){//自动调用handler
          //to: 新的$route对象
          this.id = to.params.id;
          // console.log(this.id);
          this.getImages(this.id);
        },
        immediate:true//立刻
      }
  }
}
</script>
<style scoped>
  .app-goodsInfo>.info{
    height:60rem;
    position: relative;
    /* top:-70px; */
    background-color: #fff;
  }
  .app-goodsInfo>.info>.img{
    text-align: center;
  }
    .app-goodsInfo>.info>.img>img{
      width:50%;
      height:50%;
    }
  .app-goodsInfo>div>.info_desc{
    text-align: center;
    color:#003150;
    margin-bottom:2rem;
  }
  .app-goodsInfo>div>.info_desc>h3{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size:1.3rem;
    margin:0;
    margin-top:1.3rem;
    height:3rem;
  }
  .app-goodsInfo>div>.info_desc>h3>span>a{
    text-decoration: underline;
    color: #003150;
  }
  .app-goodsInfo>div>.info_desc>h5{
    color:#003150;
    margin:0;
    padding:1rem 0;
    font-size:1.2rem;
  }
  .app-goodsInfo>div>.info_desc>h6{
    color:#003150;
    margin:0;
    padding:0.6rem 0;
    font-size:1rem;
  }
  .app-goodsInfo>div>.control{
    width:90%;
    display: flex;
    justify-content: space-between;
    margin:0 auto;
    margin-bottom:0.8rem;  
  }
  .app-goodsInfo>div>.control>div{
    width:49%;
    border:1px solid #c7ccd0;
    padding:0;
    height:2.5rem;
    line-height: 2.5rem;
    text-align: center;
    color:#003150;
    font-size:14px;
  }
  .app-goodsInfo>div>.control>.size>select{
    padding:0;
    margin:0;
    padding-left:.5rem;
  }
  .app-goodsInfo>div>.control>.size>select>option{
    color:#003150;  
  }
  .app-goodsInfo>div>.control a{
    color:#003150;
    text-decoration: none;
  }
  .app-goodsInfo>.info>.info_details{
    color:#003150;
    font-size: .9rem;
    list-style: none;
    margin: 0;
    padding:1.2rem;
    background-color: #eff1f3;
  }
  .app-goodsInfo>.info>.info_details>li{
    padding:.1rem 0;
  }
  .app-goodsInfo{
    overflow: hidden;
  }
  .app-goodsInfo>.info>.info_details>li.first{
    padding-bottom:1.5rem;
  }
  .app-goodsInfo>div>.handle{
    width:90%;
    display: flex;
    justify-content: space-between;
    margin:0 auto;
  }
  .app-goodsInfo>div>.handle>.mint-button{
    width:49%;
    color:#fff;
    background-color: #003150;
    font-size: 0.95rem;
  } 
</style>