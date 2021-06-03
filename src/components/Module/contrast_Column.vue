<template>
	<div class="contrast_Column" v-if="data.length>0">
		<div class="contrast_Column_title">对比栏</div>

		<div class="content">
			<div class="contras_list" v-for="item in data">
				<div class="del">
					<span v-on:click="del(item)">
					<svg  style="cursor: pointer" viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
					</span>
				</div>
				<div class="contras_img" ><img :src="$store.state.img_host+img_change(item.img)"></div>
				<div class="contras_name">{{item.name}}</div>
			</div>
		</div>
		<div class="operate">
			<div>
				<input v-on:click="contrast()" class="contrast_sumbit" value="对比" type="button"  >
			</div>
			<div>
				<input v-on:click="Empty()" class="contrast_Empty" value="清空" type="button">
			</div>
		</div>

	</div>
</template>
<script>
	export default{
		data(){
			return{
				data:this.$store.state.contrast,
			}
		},
		computed:{
			getContrast:function(){
				return this.$store.state.contrast
			}
		},
		methods:{
			Empty:function(){
				
				this.$store.commit("Empty")
			},
			del:function(item){
				this.$store.commit("delContrast",item)
			},
			img_change:function(img){

				return JSON.parse(img).img_file[0];
			},
			contrast:function(){
				if(this.$store.state.contrast.length==2){
					this.$router.push('/contrast')
				}else{
					alert("请选择至少两个做比较")
				}
			}
		},
		mounted:function(){
			
		},
		watch:{
			getContrast:function(value){
				this.data=value
				
			}
		}

	}
</script>
<style scoped>
	.contrast_Column_title{
		padding-left: 1%;
		height: 30px;
		width: 99%;
		line-height: 30px;
		font-size: 16px;
		background-color: #f3f3f3;
	}
	.contrast_Column{
		box-shadow: 0 0  10px 0px rgba(0,0,0,0.3);
		position: fixed;
		width: 40%;

		height: 120px;
		background-color: #fff;
		bottom: 0px;
		right: 10%;
		padding-bottom: 10px;

	}
	.contras_list{
		border-right: 1px solid #C0C0C0;
		position: relative;
		padding-top: 3px;
		margin-left: 1%;
		
		width: 48%;
		height:90px;
		float: left;
	}
	.contras_img{

		width: 30%;
		height: 70px;
		
		float: left;
	}
	.contras_name{
	
		width: 70%;
		height: 70px;
		overflow: hidden;
		color: #606060;
		font-size: 12px;
		float: left;
		
	}
	.contras_img img{
		margin-left:5% ;
		width: 90%;
	}
	.content{
		float: left;
		width: 80%;
	}
	.operate{
		padding-top: 10px;
		float: left;
		width: 20%;
	}
	.operate div{
		text-align: center;
		width: 100%;

	}
	.contrast_sumbit{
		background-color: #0094FF;
		border: 0px;
		color: #fff;
		padding-left: 5px;
		padding-right: 5px;
	}
	.contrast_Empty{
		background-color: #fff;
		border: 0px;
		color: #0026FF;
		padding-left: 5px;
		padding-right: 5px;
	}
	.contrast_sumbit:active{
		background-color: #0085E5;
		cursor: pointer;
		border: 0px;
		color: #fff;
		padding-left: 5px;
		padding-right: 5px;
	}
	.contrast_Empty{
		cursor: pointer;
		background-color: #fff;
		border: 0px;
		color: #0026FF;
		padding-left: 5px;
		padding-right: 5px;
	}
	.del{
		
		font-size: 16px;
		padding-right: 5%;
		text-align: right;
		width: 95%;
		color: #808080;
	}

	@media (min-width: 992px) and (max-width: 1200px){
		.contrast_Column{
			width: 50%
		}
	}
	@media (min-width: 768px) and (max-width: 992px){
		.contrast_Column{
			width: 60%;
			right: 5%;
		}
	}
	@media (max-width: 768px){
		.contrast_Column{
			right: 1%;
			width: 98%
		}
	}
</style>