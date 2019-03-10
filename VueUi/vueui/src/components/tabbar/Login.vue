<template>
  <div class="app-login">

    <div class="mui-card">
      <div class="mui-card-header mui-card-media"
        style="background-image:url(http://127.0.0.1:2009/img/login.svg);background-repeat:no-repeat;background-size:12%,10%" >
       <div class="suc_uname">
        <p v-if="!suc_uname">请登录</p>
        <p v-if="suc_uname">{{suc_uname}}</p>
       </div>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <form action="">
              <label for="uanme">用户名</label><input type="text" placeholder="请输入用户名" v-model="uname" id="uname" autofocus>
              <label for="upwd">密码</label><input type="password" placeholder="请输入密码" v-model="upwd" id="upwd">
              <router-link to="/">忘记密码</router-link>
              <!--mt-button 会自动转为button,但是button自带表单提交功能，会导致鼠标点击事件失效，因此要阻止button的默认行为 这样地址栏就不会出现问号了-->
              <mt-button size="large" type="primary" @click.prevent="handleLogin">登录</mt-button>
            </form>
        </div>
      </div>
      <div class="mui-card-footer mui-card-media">
        <div>
          <p>
            <span>短信验证码登录</span>
            <router-link to="/Register">新用户注册</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {Toast} from "mint-ui"
export default {
    data(){
      return{
      uname:"",
      upwd:"",
      suc_uname:sessionStorage.getItem('uname')
    }},
    methods:{
      handleLogin(){
        var n = this.uname;
        var p = this.upwd;
        var regName =/^\w{3,12}$/i;
        var regUpwd =/^[a-z0-9]{3,12}$/i;
        if(!regName.test(n)){
          this.$toast("用户名格式不正确");
          return;
        }
        if(!regUpwd.test(p)){
          this.$toast("密码格式不正确");
          return;
        }
        console.log(n,p);
        var url = "http://127.0.0.1:2009/Login";
        this.axios.get(url,{
          params:{
            name:n,
            pwd:p
          }
        }).then((res)=>{
          console.log(res.data);
          if(res.data.code ==1){
            sessionStorage.setItem("uname",res.data.uname);

            this.$store.commit("code1");
            console.log(this.$store.getters.code);

            this.$toast({
              message:res.data.msg+" ,"+res.data.uname,//登录成功
              duration:1800
            });
            this.uname = "";
            this.upwd = "";
            setTimeout(()=>{
              this.$toast({
                message:"2s 之后跳转回上一页",
                duration:1800
              }) 
            },2000);
            setTimeout(()=>{  
              this.$router.go(-1);
            },4500)
          }
          else{
            this.$toast(res.data.msg);
          }
        })
      }
    },
    /**
     * watch:{
      suc_uname:{
        handler(){
          return this.suc_uname = sessionStorage.getItem('uname');
        },
        immediate:true
      }
    }
     */
}
</script>
<style scoped>
.mui-card-header.mui-card-media{
  height:3.5rem;
}
.suc_uname>p{
  margin:0;
  height:3rem;
  line-height:2rem;
  font-size:1.5rem;
  color:#0F3A5D;
}
.suc_uname{
  width:40%;
  height:100%;
  position: relative;
  left:0rem;
  top:0rem
    
}
.app-login>.mui-card>.mui-card-content>.mui-card-content-inner .mint-button--primary{
  background-color:#0F3A5D;
}
.app-login>.mui-card>.mui-card-content>.mui-card-content-inner a{
  color:#000;
  float: right;
}
.app-login>.mui-card>.mui-card-footer>div{
  width: 100%;
}
.app-login>.mui-card>.mui-card-footer>div>p{
  width: 100%;
  display: flex;
  justify-content: space-between;
  color:#000;
}
.app-login>.mui-card>.mui-card-footer>div>p>a{
  color:#000;
  text-decoration: none;
}
</style>


