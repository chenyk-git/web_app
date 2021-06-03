<template>
  <div id="app">
    
    	
    <router-view/>
    	
   
    <BackTop></BackTop>
    <foot></foot>
    <load :power="load_power"></load>
  </div>
</template>

<script>
	import load from "@/components/Module/load"
	import BackTop from "@/components/Module/BackTop"
	import foot from "@/components/Module/foot"
export default {
	components:{
		"BackTop":BackTop,
		"foot":foot,
		"load":load
	},
	data(){
		return{
			load_power:true,
		}
	},
	computed:{
		load_change:function(){
			return this.$store.state.load
		}
	},
	watch:{
		load_change:function(data){
			
			this.load_power=data
			this.$store.commit('loadChange',data)
		}

	},

  name: 'App'
}
</script>

<style>

html{
	scroll-behavior: smooth
}
*{
	font-family:"Microsoft Yahei,PingFangSC-Medium,sans-serif,serif"
}
body{
	background-image: linear-gradient(90deg, #40b5fa 0%, #93d5cd 100%);
  margin: 0px;
  padding: 0px;
  
}
</style>
