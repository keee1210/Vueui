<template>
  <div class="app-shopList mui-content">
    <div v-if="code == 1">
      <div class="shopList-header">
        <h4>我的购物车({{ PublicData}})</h4>
        <span>安全购物保障</span>
      </div>
      <div class="mui-card">
        <div class="mui-card-header">
          <h4>{{PublicData}} 腕表</h4>
          <span>在我的购物车中</span>
        </div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="subtotal">
              <span>小计：</span>
              <b >¥ {{getSubTotal}}</b>
            </div> 
            <ul class="mui-table-view">
              <li class="mui-table-view-cell mui-media" v-for="item of cartList" :key="item.id">
                <button @click.prevent="deleteCartItem($event,item.id)" :data-count="item.count">X</button>
                <a href="javascript:;">
                  <img class="mui-media-object mui-pull-left" @click ="jumpDetail" :src="item.simg_url" :data-id="item.id">
                  <div class="mui-media-body">
                    <div class="series">
                      <h5>{{item.series}}</h5>
                      <h5>{{item.spec}}</h5>
                    </div>
                    <!-- v-on:change="change" -->
                    <div>                      
                      <select v-model="item.count" @change="change" :data-id='item.id'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div class="info">
                      <h5><span>表带尺寸（厘米)：</span><b>{{item.size}}</b></h5>
                      <h5><span>价格：</span><b>¥ {{item.price}}</b></h5>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
            <div v-if="cartList.length == 0" class="isEmpty">
              <div>
                <div>
                  <img src="../../../static/404/404_img2.png">
                </div>
                <h3>您的购物车是空的!</h3>
              </div>
              <div>
                <h3 style="text-align:center;color:#003150;font-size:1.5rem;padding:2rem 0">推荐商品</h3>
                <div>
                  <ul class="mui-table-view" style="background-color:#efeff4;border-top:1px solid #c8c7cc;">
                    <li class="mui-table-view-cell mui-media">
                      <a href="javascript:;">
                        <span><img class="mui-media-object mui-pull-left" src="../../../static/recommend_1.png"></span>
                        <div class="mui-media-body" style="width:8rem;">
                          <div class="series">
                            <h5>经典复刻</h5>
                            <h5>L2.816.4.53.2</h5>
                          </div>
                          <div class="info">
                            <h5><b>价格：</b><b>¥ 20,800.00</b></h5>
                          </div>
                          <div class="btnGetInfo">
                           <router-link to="/GoodsInfo/3">
                              <mt-button plain size="normal">了解详情</mt-button>
                           </router-link>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                      <a href="javascript:;">
                        <span><img class="mui-media-object mui-pull-left" src="../../../static/recommend_2.png"></span>
                        <div class="mui-media-body" style="width:9rem;">
                          <div class="series">
                            <h5>浪琴表典藏系列</h5>
                            <h5>L2.142.0.70.6</h5>
                          </div>
                          <div class="info">
                            <h5><b>价格：</b><b>¥ 27900.00</b></h5>
                          </div>
                          <div class="btnGetInfo">
                           <router-link to="/GoodsInfo/2">
                              <mt-button plain size="normal">了解详情</mt-button>
                           </router-link>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>  
                </div>
              </div>
            </div>
            <div class="buyBtn">
              <mt-button plain size="normal" @click="jumpGoodList">继续购物</mt-button>
              <mt-button plain size="normal" v-if="cartList.length != 0">结算支付</mt-button>
            </div>  
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-if="code ==-1">
      <div>
        <img src="../../../static/404/404_img2.png">
      </div>
      <h3>购物车是空的!</h3>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      cartList:[],
      code:0,
      count:0,
      PublicData:0
    }
  },
  computed:{
    getSubTotal(){
      var sum =0;
      for(var item of this.cartList){
        sum += item.price * item.count;  
      }
      return sum;
    }
  },
 	beforeCreate(){//在用户在直接关闭浏览器后，
	  // 清除保存在服务端的用户uid(只刷新不生效)，
	  // 用户下次进入必须重新登录才能看到购物车信息
    if(!sessionStorage.getItem('uname')){
      var url = 'http://127.0.0.1:2009/empty';
      this.axios.get(url,(res)=>{
        console.log(res);
      })
    }
	},
  created(){
    this.getCartList();
   /*
    this.$messagebox.confirm('', { 
       message: 'xxx,你确定？', 
       title: '提示', 
       confirmButtonText: 'abc', 
       cancelButtonText: '123' 
     })
    .then(action => { 
       if (action == 'confirm') {     //确认的回调
        console.log(1); 
      }
     }).catch(err => { 
       if (err == 'cancel') {     //取消的回调
        console.log(2);
       } 
     });*/
  },
  methods:{
    jumpDetail(e){
      var id  = e.target.dataset.id; 
      for(var item of this.cartList){
        console.log("OK");
        if(item.id == id){
          this.$router.push("/GoodsInfo/"+item.goodId);
        }
      }
    },
    jumpGoodList(){
      this.$router.push("/GoodList");
    },
    updataPublicData(){//同步购物车页面添加的商品数量
      var url = "http://127.0.0.1:2009/updataPublicData";
      this.axios.get(url).then((res)=>{
        // console.log(res.data);
        if(res.data.code ==1){
          this.PublicData = res.data.message;

          var value = localStorage.getItem("key");
          // 将商品数量存入localStorage
          value = res.data.message;
          localStorage.setItem("key",value);
          
          //登录后进入购物车时同步tab购物车角标
          console.log(localStorage.getItem("key"));
          this.$store.commit("swichCartCount_LocalStorage");
        }
      })
    },
    deleteCartItem(e,id){
      // console.log(e.target.dataset.count);
      this.count = e.target.dataset.count;
      var url = "http://127.0.0.1:2009/deleteCartItem?id="+id;
      // console.log(this.$messagebox.confirm);
      this.$messagebox.confirm("确认删除此商品")
      .then((action)=>{ 
        if(action == 'confirm'){
          // console.log("ok0");
          this.axios.get(url).then((res)=>{
            // console.log(res.data);
            if(res.data.code ==1){
              // console.log("ok1");
              this.$toast({message:this.count+"件"+res.data.msg});
              
              var value = localStorage.getItem("key");
              value--;
              localStorage.setItem("key",value);
            
              this.$store.commit("substract");
              // console.log(this.$store.getters.CartCount);
              this.getCartList();
            }
          });
        }
      })
      .catch((err)=>{
        // console.log(err);
        if(err == 'cancel'){  
          return;
          // console.log("ok4");
        }
      })
    },
    updateItemCount(id,count){
      var url = "http://127.0.0.1:2009/updateCart?id="+id+"&count="+count;
      this.axios.get(url).then((res)=>{
        if(res.data.code == 1){
          this.$toast(res.data.msg);
        }else{
          this.$toast(res.data.msg);
        }
      })
    },
    // 下拉列表 change事件
    change(e){
        var id = e.target.dataset.id;
        for(var item of this.cartList){
        // console.log(id);
        if(item.id == id){
          this.updateItemCount(item.id,item.count);
          break;
        }
      }
    },
    getCartList(){
      var url = "http://127.0.0.1:2009/getCartList";
      this.axios.get(url).then((res)=>{
        if(res.data.code == -1){
          this.code = res.data.code;

          this.$store.commit("code_1");
          console.log(this.$store.getters.code);

          this.$toast({
            message:res.data.msg1,
            duration:1000
          });
          setTimeout(()=>{
            this.$toast(res.data.msg2);
          },1200)
          setTimeout(()=>{
            this.$router.push("/Login");
          },4200)
        }
        else if(res.data.code == 1){
          this.code = res.data.code;
          this.cartList = res.data.data;
          // console.log(this.cartList);

          this.$store.commit("code1");
          // console.log(this.$store.getters.code);
        }
      })
      this.updataPublicData();
    }
  }
}
</script>
<style scoped>
.mui-card-content-inner>.isEmpty .mui-table-view>.mui-media>a>span{
  width: 10.4rem;
}
.mui-card-content-inner>.isEmpty .mui-table-view .mui-media-object{
  position: relative;
  left:1.5rem;
  line-height: 13rem;
  max-width: 48%;
  height: 13rem;
}
.mui-card-content-inner>.isEmpty .mui-table-view-cell{
  height:15rem;
  display:flex;
  flex-direction: column;
  justify-content: center;
}
.mui-card-content-inner>.isEmpty>div:nth-child(2){
  margin-bottom: .4rem;
  background-color: #efeff4;
}
.mui-card-content-inner>.isEmpty>div:first-child{
  height:10rem;
  text-align: center;
  color:#003150;
}
.app-shopList .empty{
  text-align: center;
  color:#003150;
  height:13rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.mui-media-body select{
  border:1px solid rgba(0, 0, 0, .2) !important;
  color:#003150;
  font-size: .7rem;
  margin: 1rem 0 2rem 0;
  width: 56%; 
}
.btnGetInfo .mint-button--default.is-plain{
  border-color: #003150;
  margin-top:.5rem;
  width:80%;
  height:2.1rem;
  text-align:center;
  color:#fff;
  font-size:0.9rem;
  background-color:#003150;
}
.buyBtn>.mint-button--default.is-plain{
  width:100%;
  color:#003150;
  border-color: #003150;
  margin-bottom:.5rem;
}
.mui-card-content-inner .subtotal b{
  color:#003150;
}
.mui-card-content-inner .subtotal span{
  color:#003150;
  font-size: 17px;
}
.mui-card-content-inner .subtotal{
  width: 100%;
  height:30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.mui-card>.mui-card-content>.mui-card-content-inner{
  padding-bottom:16rem;
}
.mui-media-body>.info b{
  color:#003150;
  font-weight: 400;
}
.mui-media-body>.info span{
  font-size: .7rem;
  color:#84888b;
}
.mui-media-body>.series>h5{
  color:#84888b;
  font-weight: 600;
  font-size: .9rem;
}
.mui-card>.mui-card-content .mui-table-view>.mui-media .mui-media-body{
 display: flex;
 flex-direction: column;
 justify-content: center;
}
.mui-card-content-inner>.mui-table-view .mui-media-object.mui-pull-left{
    line-height: 250px;
    max-width: 72%;
    height: 250px;
    margin-right:0;
    margin-left:-3rem;
}
.mui-card>.mui-card-content .mui-table-view>.mui-media>button{
  position: absolute;
  top:0.5rem;
  right:0rem;
  border:0;
  background-color: #003150;
  color:#fff;
  text-align:center;
  border:1px solid #0031505c;
  padding:0 5px;
}
.mui-card>.mui-card-content .mui-table-view>.mui-media>a{
  display:flex;
  flex-flow: row nowrap; 
  padding:0;
  justify-content:space-between;
  width: 100%;
  height:100%;
  margin: 0;
}
.mui-card{
  box-shadow:none;
}
.mui-card>.mui-card-header>span{
    font-size: .8rem;
    color:#84888b;
    padding-left:.3rem;
  }
.mui-card>.mui-card-header{
  display: flex;
  flex-direction:row;
  justify-content: start;
  background-color: #efeff4; 
  padding:12px 10px;
}
.mui-content h4{color:#003150;font-weight: 500;margin: 0;font-size:17px;}
.shopList-header span{
  color:#222;
  font-size:0.8rem;
  font-weight: 400;
  line-height:24px;
  display: inline-block;
}
.shopList-header{
  background-color: #fff;
  padding:1rem 0 1rem 1.3rem; 
}
</style>
