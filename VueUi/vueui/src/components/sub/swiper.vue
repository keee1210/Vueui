<template>
	<div class="app-swiper">
		<span>更多优雅之选 为您倾情呈现</span>
		<mt-swipe :auto="3000" :show-indicators='true' :defaultIndex="1" @change="handleChange" :speed="800" :continuous="true">
			<mt-swipe-item v-for="item of list" :key="item.id">
				<div>
					<img :src="item.imgUrlSlider" @click="jumpGoodsInfo" :data-id ="item.id">
					<div>
						<span>{{item.spec}}</span>
						<span>材质: {{item.material}}</span>
						<span>Dial: {{item.dial_slider}}</span>
						<span>表带: {{item.strap}}</span>
						<span>¥ {{item.price}}</span>
					</div>
				</div>
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
export default {
	data(){
		return{
			// info:{}
		}
	},
	props:["list"],//接受父组件的数据
	created(){
		// setTimeout(()=>{		
		// },1000)
	},
	updated(){ 
			// console.log(this.list);
	},
	methods:{
		jumpGoodsInfo(e){
			var id = e.target.dataset.id;
			// console.log(id);
			this.$router.push("/GoodsInfo/"+id); 
		},
		handleChange(index){
			// console.log("index:"+index)
		}
	}
}
</script>
<style scoped>
.app-swiper{
	position:relative;
	top:8px;
	left:0;
	height:46rem;
}
.app-swiper .mint-swipe{
		width: 100%;
		height:530px;
		position: relative;
		top:-50px;
	}
.app-swiper .mint-swipe img{
	margin:0 auto;
	width:100%;
	display: block;
} 
.app-swiper .mint-swipe .mint-swipe-item>div{
	height: 100%;
	position: relative;
	top:0px;
	left:0px;
	background:#fff;
}
.app-swiper>span{
	display: block;
	color:#003150;
	font-size:1.4rem;
	font-weight: 300;
	height:50px;
	line-height: 50px;
	text-align:center;
	background-color: #fff;
	z-index: 1;
	position: relative;
}
.app-swiper>.mint-swipe .mint-swipe-item div>div{
	position: absolute;
	width:100%;
	bottom:10%;
	left:0;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
}
.app-swiper>.mint-swipe .mint-swipe-item div>div>span{
	width: 50%;
	text-align: center;
	color:#003150;
	font-size:0.9rem;
}
</style>