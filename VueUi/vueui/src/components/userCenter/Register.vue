<template>
  <div class="app-register">
    <div class="mui-card">
      <div class="mui-card-header">
          <b>用户注册</b>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <form action=""><!-- 阻止输入框失去焦点时的默认提交行为 -->
            <label>用户名</label> <input type="text" placeholder="请输入用户名" v-model="uname" @blur.prevent="checkName">       
            <label>密码</label> <input type="password" placeholder="请输入密码" v-model="upwd">
            <label>确认密码</label> <input type="password" placeholder="请确认密码" v-model="upwd2">
            <mt-button size="large"  @click.prevent="handleReg">注册</mt-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      uname:"",
      upwd:"",
      upwd2:'',
      isSubmit:false,
      regUname : /^[a-z0-9_]{3,12}$/i,
      regUpwd  : /^[a-z0-9]{3,12}$/i
    }
  },
  methods:{
     checkName(){
      var n = this.uname;
      var url  ="http://127.0.0.1:2009/existName";
      this.axios.get(url,{
        params:{
          name:n
        }
      }).then((res)=>{
        if(n==""){
          return;
        }
        // console.log(this.regUname.test(n));
        if(!this.regUname.test(n)){
          this.$toast("用户名格式不正确");
          return;
        }
        if(res.data.code ===1){
          this.$toast(res.data.msg);//可以注册
          this.isSubmit = true;
        }else{
          this.$toast(res.data.msg);//用户名已经存在
          return;
        }
      });
    },
    handleReg(){
      if(!this.isSubmit){
        return;
      }
      var n = this.uname;
      var p = this.upwd;
      var p2 = this.upwd2;
      if(!this.regUpwd.test(p)){
        this.$toast("密码格式不正确");
        return;
      }
      if(p != p2){
        this.$toast("输入密码不一致");
        return;
      }
      var url = "http://127.0.0.1:2009/register?name="+n+"&pwd="+p;
      this.axios.get(url).then((res)=>{
        if(res.data.code===1){
        this.$toast(res.data.msg+"请您登录");
        this.$router.push("/Login");
        }else{
          this.$toast("res.data.msg");
          return;
        }
      })
    }
  }
}
</script>
<style scoped>
.app-register>.mui-card b{color:#003150;}
.app-register>.mui-card>.mui-card-header>b{
  margin:0 auto;
  font-size: 18px;
}
.app-register>.mui-card>.mui-card-content>.mui-card-content-inner
 .mint-button--default{
   background-color: #0F3A5D;
   color:#fff;  
 }
 .app-register>.mui-card>.mui-card-content>.mui-card-content-inner>form{
   color:#003150;
 }
</style>
