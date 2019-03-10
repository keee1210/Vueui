<template>
  <div class="notFound">
    <div>
      <img src="../../../static/404/404_img2.png"><br>
      <img src="../../../static/404/404_img1.png"><br>
    </div>
    <div>
      <span>{{count}}后自动返回上一页</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{count:5}
  },
  created(){
    var timer = setInterval(()=>{
      if(this.count == 1){
        // var path = this.$router.history.current.path;
        // console.log(path);
        // if(path  == "/Home"){
        // }else{
          this.$router.go(-1);
        // }
        clearInterval(timer)
      }
      this.count--;
    },1000)
  }    
}
</script>
<style>
  .notFound{
    text-align:center;
    color:#003150;
    font-size:1.2rem;
    position: relative;
    top:4rem;
    left:0rem;
    height:30rem;
  }
</style>

