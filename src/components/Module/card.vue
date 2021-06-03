<template>
	<div class="card_main">
		<div class="card" v-for="item in data" v-on:click="query_data(item['ID'])">
			<div class="card_img">
				<img :src="host+JSON.parse(item.img).img_file[0] ">
			</div>
			<div class="card_content">
				<div class="card_value">{{item.name}}</div>
				<div class="card_value">{{item.Brand}}{{item.series}}{{item.model}}</div>
			</div>
		</div>

		
	</div>
	
</template>
<script>
	export default{
		props:{
			data:''
		},
		data(){
			return{
				host:this.$store.state.img_host,
			}
		},
		methods:{
			query_data:function(id){
				/*console.log(id)*/
				/*let path=this.$router.resolve({path:"/detail",query:{id:id}})*/
				this.$router.push({path:"/detail",query:{id:id}})
				/*window.open(path.href,'_brank')*/
				
			}
		},
		watch:{
			data:function(){
				/*console.log(this.data)*/
			}
			
		},
		mounted:function(){
			
		}
	}
</script>
<style scoped>
	.card_main{
		width: 100%;
		overflow: hidden;
		background-color: #f3f3f3;
		padding-top: 30px;

		
	}
	.card{
		float: left;
		margin-top: 10px;
		
		width: 18%;
		padding: 0.5%;
		margin-left: 0.8%;
		background-color: #fff;

	}
	.card:hover{
		cursor: pointer;
		box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
		animation: 0.5s card_change;
	}
	.card_img{
		 padding-bottom:100%; 
   		 height:0;
		width: 100%;
	}
	.card_img img{
		width: 100%;
	}
	.card_content{
		padding-top: 10px;
		background-color: #fff;
		width: 100%;
		padding-bottom: 10%;
		
	}
	.card_value:nth-child(1){
		height: 20px;
		padding-top: 5px;
		font-size: 16px;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.card_value:nth-child(2){
		height: 20px;
		padding-top: 5px;
		font-size: 14px;
		color: #404040;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	@keyframes card_change{
		0%{
			box-shadow: 0px 0px 10px 0px rgba(0,0,0,0);
		}
		100%{
			box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
		}
	}

	@media (max-width: 768px){
		.card{
			float: left;
			margin-top: 10px;
			padding-bottom: 10px;
			width: 46%;
			
			padding: 1%;
			margin-left: 1.3%;
			background-color: #fff;

		}
	}
	@media (min-width: 768px) and (max-width:992px){
		.card{
			float: left;
			margin-top: 10px;
			padding-bottom: 10px;
			width: 29%;
			
			padding: 1%;
			margin-left: 1.5%;
			background-color: #fff;

		}
	}
</style>