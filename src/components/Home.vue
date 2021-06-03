<template>
  <div id="home_main">

    
    <div class="home_head"></div>
    <Menu :change="true"></Menu>
    <div id="banner">
        <Gradually :data='data'></Gradually>
    </div>
    <div id="content">
      <div id="recommend">
          <div class="title">推荐</div>
         <card :data="list_data"></card>
      </div> 
     
    </div>
    
    
  </div>
</template>

<script>
  
  import Gradually  from "@/components/Module/Gradually";
  import Menu from "@/components/Module/Menu"
  import card from "@/components/Module/card"

export default {
  
  components:{
    "Gradually":Gradually,
    "Menu":Menu,
    "card":card,
    
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data:[
          {"title":"七彩虹（Colorful）火神iGame GeForce RTX 3090 Vulcan OC","img":"","content":" 七彩虹（Colorful）火神iGame GeForce RTX 3090 Vulcan OC搭载GeForce RTX 3090 芯片 1395Mhz","id":"271"},
          {"title":"AMD 锐龙Threadripper(线程撕裂者)3990X处理器 ","img":"","content":"锐龙Threadripper(线程撕裂者)3990X处理器64核128线程","id":"270"},
          {"title":"玩家国度（ROG）STRIX X570-E GAMING","img":"","content":"玩家国度（ROG）STRIX X570-E GAMING 支持zen2 am4接口处理器 内存支持最高可达128GB","id":"272"},
          
        ],
      list_data:[],
    }
  },
  mounted:function(){
    this.$store.commit("loadChange",true)
    this.$http({
      method:'get',
      url:`${this.$store.state.query_host}/ApiHome`
    }).then((data)=>{
        if(data.status==200){
          this.$store.commit("loadChange",false)
          this.list_data=data.data;
          /*console.log(this.list_data)*/
        }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  padding-top: 30px;
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
}
#recommend{
  width: 80%;
  padding-bottom: 100px;
  margin-left: 10%;
}
#content{
  background-color: #f3f3f3;
  width: 100%;
}
#banner{
    height: 580px;
}
.home_head{
  height: 60px
}
#home_main{

  width: 100%;
  
}
#select{
  margin-left: 10%;
  
  width: 80%;
}
@media (max-width: 992px) and (min-width: 768px){
  #banner{
    height: 480px;
  }
  #recommend{
    background-color: #f3f3f3;
    width: 90%;
    margin-left: 5%;
  }
}
@media (max-width:768px) {
  #banner{
    height: 380px;
  }
   #recommend{
    background-color: #f3f3f3;
    width: 100%;
    margin-left: 0%;
  }
}

</style>
