<template>
  <div class="app-goodList">
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view" >
        <img :src="list_Seris[0]">
        <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item of newListPid_1" :key="item.id">
          <div>
            <router-link :to="`/GoodsInfo/${item.id}`">
              <img class="mui-media-object" :src="item.simg_url">
            </router-link>
            <div class="mui-media-body">
              <span class="myTitle">{{item.series}}</span>
              <div class="myContent">
                <span>{{item.style}}</span>
                <span>{{item.spec}}</span>
              </div>
              <div class="myEnd">
                <span class="myPrice">￥{{item.price.toFixed(2)}}</span>
                <button @click="jumpDetail" :data-id="item.id">立即选购</button>
              </div>
            </div>
          </div>
        </li>
        <div class="more"><a href="javascipt:;" @click="handleMore" :data-pid="3">查看更多同类产品</a></div>
      </ul>
      <ul class="mui-table-view mui-grid-view">
        <img :src="list_Seris[1]">
        <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item of newListPid_2" :key="item.id">
          <div>
            <router-link :to="`/GoodsInfo/${item.id}`">
              <img class="mui-media-object" :src="item.simg_url">
            </router-link>
            <div class="mui-media-body">
              <span class="myTitle">{{item.series}}</span>
              <div class="myContent">
                <span>{{item.style}}</span>
                <span>{{item.spec}}</span>
              </div>
              <div class="myEnd">
                <span class="myPrice">￥{{item.price.toFixed(2)}}</span>
                <button  @click="jumpDetail" :data-id="item.id">立即选购</button>
              </div>
            </div>
          </div>
        </li>
        <div class="more"><a href="javascipt:;" @click="handleMore" :data-pid="4">查看更多同类产品</a></div>
      </ul>  
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      listUl:[],
      list_Seris:[],
      pageIndex_3:1,
      pageIndex_4:1,
      pageCount:1,
      pageSize :1,
      NewList:[]
    }
  },
  computed:{
    newListPid_1(){
      // var  listPid_1 = [];
      return this.listUl.filter(
        function(item,i,arr){
          return item.pid ==1 || item.pid ==3;
        }
      )
    },
    newListPid_2(){
      return this.listUl.filter(
        function(item,i,arr){
          return item.pid == 2 || item.pid ==4;
        }
      )
    }
  },
  created(){ 
    this.getMore();//规格
    this.goodSeris();
  },
  methods:{
    handleMore(e){
      var pno_3 = this.pageIndex_3;
      var pno_4 = this.pageIndex_4;
      var pageSize = this.pageSize;
      var pid = e.target.dataset.pid;
      var url ="http://127.0.0.1:2009/getMore";
      // console.log(pno_4)
      this.axios.get(url,{
        params:{
          pid,
          pno_3,
          pno_4,
          pageSize
        }
      }).then((res)=>{
        // console.log(res) 
        if(pid ==3){
         if(this.pageIndex_3 < 5){
              this.pageIndex_3++;
          }else{
            this.$toast({
              message:"你够了",
              duration:1000
            })
            return;
          }
        }else if(pid ==4){
          if(this.pageIndex_4 < 5){
              this.pageIndex_4++;
              console.log(pno_4)
          }else{
            this.$toast({
              message:'你够了',
              duration:1000
            })
            return;
          }
          // console.log(pno_4); 
        }
        this.getMore(res);
      })
    },
    jumpDetail(e){
      // console.log(e);
      var id = e.target.dataset.id;
      this.$router.push(`/GoodsInfo/${id}`);
    },
    getMore(res_more){
      var url = "http://127.0.0.1:2009/getDataUl";
      this.axios.get(url).then((res)=>{
        // console.log(res.data.data);
        // console.log(res_more);
        if(res_more != undefined){
          if(res_more.data.code !=-1){
            // console.log(res_more.data.data[0])
            if(res_more.data.code ==1){
              this.NewList.push(res_more.data.data[0]);
              // console.log(this.NewList[0].id);
              this.listUl = this.listUl.concat(this.NewList);
              this.NewList = [];
            }
          }
        }else{
          this.listUl = res.data.data;
        }
      })
    },
    goodSeris(){
      var url = "http://127.0.0.1:2009/goodSeris";
      this.axios.get(url).then((res)=>{
        for(var i=0;i<2;i++){
          this.list_Seris.push(res.data.data[i].imgUrlItem);
        }
      })
    }
  }    
}
</script>
<style scoped>
  .app-goodList>.mui-content{background-color:#EFF1F3;
    margin-bottom:14rem;
  }
  .app-goodList>.mui-content>.mui-table-view>img{
    width:100%;
    height:325px;
    transform: scaleX(1.10);

  }
  .app-goodList>.mui-content>.mui-table-view{
    width: 92%;
    margin:0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    background-color:#EFF1F3;
    padding-right: 0;
    font-size:20px;
  }   
  .app-goodList>.mui-content>.mui-table-view>.mui-table-view-cell>div{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #fff;
    margin-bottom: 0.3rem;
  }
  .app-goodList>.mui-content>.mui-table-view>.mui-table-view-cell>div>.mui-media-body{height: 8rem;}
  .app-goodList>.mui-content>.mui-table-view>.mui-table-view-cell>div>.mui-media-body>.myTitle{
    color:#84888b;
    font-size: 0.8rem;
    font-weight: 600;
  }  
  .app-goodList>.mui-content>.mui-table-view>.mui-table-view-cell>div>.mui-media-body>.myContent{
    display: flex;
    flex-direction: column; 
    color:#84888b;
    font-size:0.8rem;
    font-weight: 600;
    margin:0.6rem 0 1rem 0; 
  }
  .myContent>span.spec{
    text-align: center;
  }
  .app-goodList>.mui-content>.mui-table-view>.mui-table-view-cell>div>.mui-media-body>.myEnd>button{
    width: 56%;
    background-color:#002744;
    color:#fff;
    font-size: 10px;
    margin:0.1rem 0 0.3rem 0;  
  }
  .app-goodList>.mui-content>.mui-table-view>.mui-table-view-cell>div>.mui-media-body>.myEnd>.myPrice{
    font-size: 0.9rem;
    color:#003150;
    font-weight: 500;
  }
  .app-goodList>.mui-content>.mui-table-view>.mui-table-view-cell>div>.mui-media-body>.myEnd{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .app-goodList>.mui-content>.mui-table-view::before{height:0px;}
  .app-goodList>.mui-content>.mui-table-view>.mui-table-view-cell{width:49.5%;margin:0 0 0 0;height:21.5rem}
  .app-goodList>.mui-content>.mui-table-view>.mui-table-view-cell:nth-child(2n-1){padding:0 3px 0 0;}
  .app-goodList>.mui-content>.mui-table-view>.mui-table-view-cell:nth-child(2n){padding:0 0 0 3px;}
  .app-goodList>.mui-content>.mui-table-view>.more{
    width: 98%;
    height:40px;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
  }
  .app-goodList>.mui-content>.mui-table-view>.more>a{
    text-decoration: none;
    color:#003150;
    width: 100%;
    height:100%;
    text-align: center;
    line-height: 40px;
    font-size: 1rem;
  }
</style>
