<template>
  <div class="app-container">
		<mt-header title="腕表展示" fixed>
			<mt-button slot="right" @click="jumpLogout">客户中心</mt-button>
      <mt-button slot="left" icon="back" @click.prevent="handleBack"></mt-button>
    </mt-header>

    <router-view/>

    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item mui-active" to="/Home">
				<span class="mui-icon iconfont icon-shouye"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
      <router-link class="mui-tab-item" to="/Search">
				<span class="mui-icon iconfont icon-chengguozhanshi"></span>
				<span class="mui-tab-label">表款展示</span>
			</router-link >
			<a class="mui-tab-item" href="javascript:;" @click="jumpShopList">
        <span class="mui-icon iconfont icon-qicheqianlian-">
      	<span class="mui-badge">{{$store.getters.CartCount}}</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</a>
      <router-link class="mui-tab-item" to="/Login">
				<span class="mui-icon iconfont icon-wode">
        </span>
				<span class="mui-tab-label">登录</span>
			</router-link>
		</nav>
  </div>
</template>
<script>
export default {
	methods:{
    jumpLogout(){
			console.log(this.$store.getters.code);
			// if(this.$store.getters.code == 1){
			if(sessionStorage.getItem('uname')){
				this.$router.push("/Logout");
			// }else if(this.$store.getters.code == -1){
			}else if(!sessionStorage.getItem("uname")){
				this.$router.push("/Login");
			}
		},
		jumpShopList(){
			this.$router.push("/shopList");
		},
		handleBack(){
			var path = this.$router.history.current.path;
			if(path == "/Home"){
				console.log("nopPage");
			}else{
				this.$router.go(-1);
			}
		}
	}
}
</script>

<style>
.app-container{
     overflow-x:hidden;
		 padding-top:2.5rem;
}
.app-container>.mint-header.is-fixed{
	background-color:#0F3A5D;
	z-index: 2;
}
.app-container>.mui-bar>.mui-tab-item{
	color:#7b7777;
}
.app-container>.mui-bar>.mui-tab-item>.mui-tab-label{
	color:000000ba;
}
.app-container>.mui-bar>.mui-tab-item.mui-active{
	color:#0F3A5D;
}
</style>