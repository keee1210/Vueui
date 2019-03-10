<template>
  <div class="app-logout">
    <!-- <div class="mui-card" v-if="this.$store.getters.code == 1"> -->
    <div class="mui-card" v-if="uname">
      <div class="mui-card-header">
        <div  class="mui-card-media"
          style="background-image:url(http://127.0.0.1:2009/img/login.svg);
          background-repeat:no-repeat;background-size:10%,10%" >  
        </div>
        <h4>客户中心</h4>
        <h5>{{suc_uname}}</h5>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button size="large" @click="logout">退出登录</mt-button>
      </div>
		</div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      code:0,
      uname:"",
      suc_uname:sessionStorage.getItem('uname')
    }
  },
  methods:{
    logout(){
      var url ="http://127.0.0.1:2009/logout";
      this.axios.get(url).then((res)=>{
       if(res.data.code===1){
         this.code  = res.data.code;

          this.$store.commit("code_1");
          console.log(this.$store.getters.code);
          
          this.$store.commit("swichCartCount_0");

          var value = localStorage.getItem("key");
          value = 0;
          localStorage.setItem("key",value);
          console.log(localStorage.getItem("key"));

          sessionStorage.removeItem('uname');

          this.$toast({
            message:res.data.msg,
            duration:1500
          });
          setTimeout(()=>{
            this.$toast({
              message:"将帮您跳转到主页!",
              duration:1000
            });
          },1800)
          setTimeout(()=>{  
            this.$router.push("/");
          },3000)
       }
      })   
    }
  },
  created(){
    this.uname = sessionStorage.getItem('uname');
  },
  /* 
    computed:{
      userName(){
        return sessionStorage.getItem('uname');
      } 
    }
  */
}
</script>
<style scoped>
  .mint-button {
    background-color: #003150;
    color:#fff;
  }
  .mui-card-header{
    display: flex;
    flex-direction: column;
  }
  .mui-card-header>h5{
    color:#003150;
    font-size: 1.3rem;
  }
  .mui-card-header>.mui-card-media{
    height: 35px;
    width:100%;
  }
</style>


