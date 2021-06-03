<template>
	<div id="detail">
		 <Menu class="menu"></Menu>
		 <div class="content" v-if="data">

		 	<div id="img">
		 		<img v-if="img" :src="this.$store.state.img_host+img">
		 	</div>
		 	<div id="detail_list">
		 		<div id="name">{{data[0]['name']}}</div>
		 		<div class="list">
		 			<div class="list_title">&nbsp基本信息</div>
		 			<div class="list_content">
		 				<ul>
		 					<li class="li">
		 						<div class="li_name">品牌</div>
		 						<div class="li_value">{{data[0]['Brand']}}</div>
		 					</li>
		 					<li class="li">
		 						<div class="li_name">型号</div>
		 						<div class="li_value">{{data[0]['model']}}</div>
		 					</li>
		 					<li class="li">
		 						<div class="li_name">系列</div>
		 						<div class="li_value">{{data[0]['series']}}</div>
		 					</li>
		 					<li class="li">
		 						<div class="li_name">价格</div>
		 						<div class="li_value" >{{data[0]['price']}}￥</div>
		 					</li>
		 					<li class="li">
		 						<div class="li_name">购买链接</div>
		 						<div class="li_value" >{{data[0]['price_link']}}</div>
		 					</li>
		 				</ul>
		 			</div>
		 		</div>

		 		<div class="list" v-for="item in JSON.parse(data[0].attr).menu">
		 			<div class="list_title">&nbsp{{item["title"]}}</div>
		 			<div class="list_content">
		 				<ul>
		 					<li class="li" v-for="li in  item['list']">
		 						<div class="li_name">{{li['name']}}</div>

		 						<div class="li_value">{{li['value']}}</div>


		 					</li>
		 				</ul>
		 			</div>
		 		</div>

		 		<div id="contrast">
		 			<input v-on:click="contrast(data)" value="加入对比" type="button">
		 		</div>

		 	</div>

		 	

		 </div>
		
		 <contrastColumn></contrastColumn>
	</div>
</template>
<script>
	import load from "@/components/Module/load"
	import Menu from "@/components/Module/Menu"
	import contrast_Column from "@/components/Module/contrast_Column"
	export default{

		components:{
		   "contrastColumn":contrast_Column,
		    "Menu":Menu,
		   
		   	

		  },
		data(){
			return{
				data:"",
				img:'',
				
			}
		},
		watch:{
			$route(to,from){
				if(to.name=="detail"){
					this.query_data()
				}
			}
		},
		methods:{
			query_data:function(){
				let id=this.$route.query.id;
				this.$store.commit("loadChange",true)

				if(id){
					this.$http({
						url:`${this.$store.state.query_host}/ApiQueryDetail`,
						methods:'get',
						params:{
							id:id
						}
					}).then((data)=>{
						if(data.status==200){
							this.data=data.data
							this.$store.commit("loadChange",false)
							/*console.log(this.data)*/
							this.img=JSON.parse(this.data[0].img).img_file[0] 
							
						}
					})
				}
			},
			contrast:function(data){
				this.$store.commit('setContrast',data)
				
			}
		},
		mounted:function(){
			this.query_data()
		}
	}
</script>
<style scoped>
	.detail{
		width: 100%;

		
	}
	.content{
		padding-top: 10px;
		background-color: #fff;
		width: 80%;
		margin-left: 10%;
		margin-top: 100px;
		overflow: hidden;
		box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
		padding-bottom: 100px;
	}
	#img{
		padding-left: 1%;
		padding-right: 1%;
		width: 28%;
		float: left;
	}
	#img img{
		width: 100%;
	}
	#detail_list{
		width: 70%;
		float: left;
	}
	.list{
		width: 100%;
		overflow: hidden;
		margin-top: 10px;
		width: 98%
	}
	
	.list_title{
		background-color: #f3f3f3;
		height: 40px;
		line-height: 40px;
		font-weight: bold;
		font-size: 24px;
	}
	.list_content{

	}
	.list_content ul{
		width: 100%;
		padding: 0px;
		margin: 0px;
	}
	.li{
		
		padding: 0px;
		margin: 0px;
		height: auto;
		padding-top: 8px;
		padding-bottom: 8px;
		width: 50%;
		float: left;
		list-style: none;
	}
	.li_name{
		word-break: break-all;
		font-size: 16px;
		height:auto;
		color: #000;
		width: 29%;
		padding-left: 1%;
		float: left;
	}
	.li_value{
		color: #7C7C7C;
		font-size: 14px;
		float: left;
		padding-left: 3%;
		width: 49%;
	}
	#name{
		width: 100%;
		
		line-height: 50px;
		color: #007F46;
		font-weight: bold;
		font-size: 28px;
	}
	#contrast{
		height: 50px;
		line-height: 50px;

		width: 98%;
	}
	#contrast input{
		margin-left: 2%;
		border: 0px;
		color: #fff;
		padding-top: 5px;
		padding-bottom: 5px;
		border-radius: 3px;
		padding-left:10px ;
		padding-right: 10px;
		cursor: pointer;

		background-color: #0094FF
	}
	#contrast input:active{
		background-color: #0082E0
	}
	@media (min-width: 768px) and (max-width: 992px){
		.li{
		
			padding: 0px;
			margin: 0px;
			height: auto;
			padding-top: 8px;
			padding-bottom: 8px;
			width: 100%;
			float: left;
			list-style: none;
		}
		.content{
			background-color: #fff;
			width: 90%;
			margin-left: 5%;
			margin-top: 100px;
			overflow: hidden;
			box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3)

		}
	}
	@media (max-width: 768px) {
		.li{
		
			padding: 0px;
			margin: 0px;
			height: auto;
			padding-top: 8px;
			padding-bottom: 8px;
			width: 100%;
			float: left;
			list-style: none;
		}
		.content{
			background-color: #fff;
			width: 98%;
			margin-left: 1%;
			margin-top: 100px;
			overflow: hidden;
			box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3)

		}
		#img{
			padding-left: 5%;
			padding-right: 5%;
			width: 90%;
			float: left;
		}
		#detail_list{
			width: 100%;
			float: left;
		}
	}
</style>