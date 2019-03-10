<template>
  <div class="app-search">
    <div class="app-search">
      <div class="mint-search">
        <div class="mint-searchbar">
          <div class="mint-searchbar-inner">
            <i class="mintui mintui-search">
            </i> 
            <input type="search" placeholder="搜索" class="mint-searchbar-core">
          </div> 
          <a class="mint-searchbar-cancel" style="display:block;">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){return{}}
}
</script>
<style scoped>
.app-search .mint-searchbar{
  background-color: #0F3A5D;
}
.app-search [type='search']{
  margin-bottom:0px;
  height:20px;
}
.app-search .mint-searchbar-cancel{
    color: #ccc;
}

</style>


