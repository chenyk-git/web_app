<template>
	<div class="contrast">
		 <Menu class="menu"></Menu>
		
		 <div class="contrast_content" v-if="contrast_data.length>0">
		 	<div class="content_head">
		 		<div class="content_head_list">
		 			<div class="img">
		 				<img :src="$store.state.img_host+img_change(contrast_data[0].img)">
		 			</div>
		 			<div class="title">
		 				{{contrast_data[0].name}}
		 			</div>
		 		</div>
		 		<div class="content_head_list">
		 			<div class="img">
		 				<img :src="$store.state.img_host+img_change(contrast_data[1].img)">
		 			</div>
		 			<div class="title">
		 				{{contrast_data[1].name}}
		 			</div>
		 		</div>
		 	</div>
		 	<div class="list" v-for="item in data">
				
				<div class="value">
					&nbsp{{item.list[0]}}
				</div>
				<div class="name">{{item.name}}</div>
				<div class="value">
					{{item.list[1]}}
				</div>
			</div>
		 </div>
		
	</div>
</template>
<script>
	import Menu from "@/components/Module/Menu"
	export default{
		name:"contrast",
		components:{
		  
		    "Menu":Menu,
		   	

		  },
		data(){
			return{
				data:[],
				name:[],
				contrast_data:[]
			}
		},
		methods:{
			img_change:function(img){

				return JSON.parse(img).img_file[0];
			},
		},
		mounted:function(){
			let contrast=this.$store.state.contrast;
			this.contrast_data=contrast;
			if(contrast.length==2){
				/*console.log(contrast.length)*/
				let data=[]
				let name=[]
				contrast.forEach(function(attr_value,contrast_index){
					
					name.push(attr_value.name)
					let attr=JSON.parse(attr_value.attr)
					let menu=attr.menu
					
					let list_index=contrast_index;
					menu.forEach(function(list){

						list.list.forEach(function(attr_value){
							let index=data.findIndex(function(value,index){
								return attr_value.name==value.name
							})

							if(index<0){
								let list=[]
								
								list.length=contrast.length;

								list[list_index]=attr_value.value
								
								data.push({"name":attr_value.name,"list":list})
							}else{
								data[index].list[list_index]=attr_value.value
							}
						})
					})
					
				})	

				this.data=data;
				this.name=name
				/*console.log(this.name)*/
			}else{
				/*console.log('载入')*/
				this.$router.push('/')
			}
		}

	}
</script>
<style scoped>
	.content_head_list{
		float: left;
		width: 50%;
	}
	.content_head{
		width: 100%;

	}	
	
	.img{

		width: 100%;
	}
	.img img{
		margin-left: 20%;
		width: 60%;
	}
	.title{
		text-align: center;
		width: 100%;
		
		line-height: 50px;
		color: #007F46;
		font-weight: bold;
		font-size: 28px;
		width: 100%;
	}
	.contrast{

		width: 100%;
		

	}
	.contrast_content{
		box-shadow: 0 0  10px 0px rgba(0, 0, 0, 0.3);
		padding-top: 10px;
		padding-left:2% ;
		padding-right: 2%;
		padding-bottom: 100px;
		background-color: #fff;
		margin-top: 64px;
		width: 76%;
		margin-left: 10%
	}
	.list{
		width: 100%;
		overflow: hidden;
		line-height: 30px
	}
	.list:nth-child(even){
		background-color: #f3f3f3;
	}
	.value{
		text-align: center;
		width: 40%;
		float: left;
		font-size: 14px;
		color: #5E5E5E;
		word-break: break-all;
	}
	.name{
		word-break: break-all;
		color: #000000;
		font-size: 16px;
		text-align: center;
		width: 20%;
		float: left;
	}
	@media (max-width: 768px){
		.contrast_content{
			padding-left:2% ;
			padding-right: 2%;
			padding-bottom: 100px;
			background-color: #fff;
			margin-top: 64px;
			width: 94%;
			margin-left: 1%
		}
	}
</style>