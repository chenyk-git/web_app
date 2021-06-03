<template>
	<div id="selector">

		<div v-if="data" class="selector_container">
			
			<!-- 选择的标签展示 -->
			<div class="select_tag_container"  v-if="attr_tag.length>0">
				<div class="select_tag_name">选择的属性</div>
				<div class="tag_container">
					<div class="tag_item" v-for="tag of attr_tag" v-on:click="del_tag(tag)">
						{{tag['attr_value']}}
					</div>
				</div>
			</div>
			





			<!-- 属性选择 -->
			<div ref="selector_list"  class="selector_list_close" v-for="item in data">
				<div class="selector_list_name">{{item['attr_name']}}</div>
				<div class="selector_list_value">
					<ul>
						<li  class="selector_list_value_li" v-for="li of item['attr_value']">

							<label>
								<div  :title="li"  class="li_value">{{li}}</div>
								<div  class="li_checkbox">
									<input v-model="attr_tag" :value="{'attr_name':item['attr_name'],'attr_value':li}" type="checkbox">
								</div>
							</label>
							
						</li>
						
					</ul>
					<div class="selector_list_more">
						<div ref="more_open" class="more_open">
							更多
							<svg viewBox="0 0 1024 1024"  width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="down"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path></svg>
						</div>
						<div ref="more_close" class="more_close">
							收起
							<svg viewBox="0 0 1024 1024" class="down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" ><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>
						</div>
					</div>
				</div>
				
			</div>


			<!-- 筛选按钮 -->
			<div class="select_submit_container">
				<input class="select_submit" type="button" value="筛选" v-on:click="select_submit()">
			</div>


		</div>
				
	</div>
</template>
<script>
	
		
	export default{
		props:{
			data:'',
		},
		
		data(){
			return{
				attr_tag:[],
				
			}
		},
		methods:{
			del_tag:function(tag){/*标签点击删除*/
				let index=this.attr_tag.findIndex((value,index)=>{
					/*console.log(JSON.stringify(value)==JSON.stringify(tag))*/
					return value==tag;
				})
				if(index>=0){
					this.attr_tag.splice(index,1)
				}


			},
			select_submit:function(){
				let Brand=[];
				let series=[];
				let attr=[];
				this.attr_tag.forEach( function(element, index) {
					if(element.attr_name=="品牌"){
						Brand.push(element.attr_value)/*品牌遍历*/
					}else if (element.attr_name=="系列"){
						series.push(element.attr_value)/*系列*/

					}else{
						let index=attr.findIndex((value,index)=>{/*用findTndex判断并且获取下标*/
							return value['attr_name']==element['attr_name']/*返回下标*/
						})
						if(index<0){/*小于0就是没有数据*/
							let attr_name=element.attr_name
							let attr_value=[]
							attr_value.push(element.attr_value)
							attr.push({"attr_name":attr_name,"attr_value":attr_value})
							
						}else{
							attr[index].attr_value.push(element.attr_value)/*有就直接添加*/
						}
					}

				});
				
				this.$emit("select_attr",{"Brand":Brand,"series":series,"attr":attr})
				
			}

			
		},
		watch:{
			attr_tag:function(){
				this.$store.commit("selector_tag",this.attr_tag)
				/*console.log(this.$store.state.Hardware)*/
			},
			data:function(){
				/*console.log('触发')*/
				if(this.$store.state.Hardware.select_tag.length>0){
					/*console.log('设置')*/
					this.attr_tag=this.$store.state.Hardware.select_tag
				}else{
					this.attr_tag=[];
				}
				
				if(this.data){
					
					/*console.log(this.data)*/

					this.$nextTick(()=>{
						let selector_list=this.$refs.selector_list;
						let more_open=this.$refs.more_open;
						let more_close=this.$refs.more_close;
						/*console.log(selector_list)*/
						if(this.data.length>0){
							for(let i=0;i<more_open.length;i++){
								more_open[i].onclick=()=>{
									selector_list[i].className="selector_list";
									more_open[i].style.display="none";
									more_close[i].style.display="block";
								}
								more_close[i].onclick=()=>{
									selector_list[i].className="selector_list_close";
									more_open[i].style.display="block";
									more_close[i].style.display="none";
								}
							}
						}
					})
					
					
				}
			}
		},
		mounted:function(){
			
			
			

		
		}
	}
</script>
<style scoped>
	.selector_container{
		padding-top: 30px;
		width: 100%;
		background-color: #f3f3f3;
		border-bottom:1px solid #C0C0C0;
	}

	.select_tag_container{
		width: 100%;
		overflow: hidden;
		border-bottom:1px solid #C0C0C0;
	}
	.select_tag_name{
		padding-top: 5px;
		color: #404040;
		font-size: 16px;
		text-align: center;
		float: left;
		width: 15%;
	}
	.tag_container{

		float: left;
		width: 85%;
		background-color: #fff;
		overflow: hidden;
		padding-bottom: 10px;
	}
	.tag_item{
		display: flex;
		justify-content: center;
		align-items: center;
		min-width:50px;
		text-align: center;
		float: left;
		font-size: 14px;
		margin-top: 10px;
		margin-left: 10px;
		padding: 2px;
		color:  #51B6FF;
		cursor: pointer;
		border: 1px solid #51B6FF;
		border-radius: 5px;
		height: 20px;
		
		overflow: hidden;
	}
	

	.select_submit{
		border: 0px;
		background-color: #0094FF;
		color: #fff;
		padding: 10px;
		margin-right: 10px;
		font-size: 16px;
		margin-top: 10px;
		margin-left: 10px;
		float: right;
		cursor: pointer;
	}
	.select_submit:active{
		background-color: #008BEF
	}
	.select_submit_container{
		width: 100%;
		background-color: #fff;
		height: 60px;
	}
	#selector{
		background-color: #fff;
		margin-top: 50px;
		width: 100%;
		box-shadow: 2px 5px 5px 2px rgba(0,0,0,0.03);
		height: auto;
	}
	.selector_list{
		border-bottom:1px solid #C0C0C0;
		background: linear-gradient(to right, #f3f3f3 0%,#f3f3f3 15%,white 15%,white 100%);
		width: 100%;
		overflow: hidden;
	}
	.selector_list_close{
		border-bottom:1px solid #C0C0C0;
		background: linear-gradient(to right, #f3f3f3 0%,#f3f3f3 15%,white 15%,white 100%);
		width: 100%;
		height: 30px;
		overflow: hidden;
	}
	.selector_container{
		width: 100%;
		height: auto;
	}
	
	.selector_list_name{
		text-align: center;
		
		color: #404040;
		font-size: 16px;
		line-height: 30px;
		float: left;
		height: 100%;
		width: 15%;
		background-color: #f3f3f3
	}
	.selector_list_value{
		width: 85%;
		float: left;
		
		background-color: #fff;
		overflow: hidden;
	}
	.selector_list_value ul{
		margin: 0px;
		float: left;
		padding: 0px;

		width: 90%;
		overflow: hidden;
	}
	.selector_list_more{
		width: 10%;
		float: left;

	}
	.selector_list_value_li{
		
		padding: 0px;
		position: relative;
		cursor: pointer;
		margin: 0px;
		padding-top: 5px;
		height: 14px;
		padding-bottom: 5px;
		height: auto;
		list-style: none;
		width: 10%;
		float: left;
	}
	.li_checkbox{
		position: absolute;
		top: 5px;
		width: 14px;
		height: 14px;
		float: left;
	}
	.li_checkbox input{
		border: 1px solid #808080;
		width: 14px;
		height: 14px;
		float: left;
	}
	.li_value{
		user-select: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: auto;
		margin-left: 25px;
		color: #666;
		font-size: 14px;
	}
	.more_open{
		display: block;
		width: 100%;
		text-align: center;
		cursor: pointer;
		font-size: 14px;

	}
	.more_close{
		display: none;
		width: 100%;
		text-align: center;
		cursor: pointer;
		font-size: 14px;
	}
	label{
		cursor: pointer;
	}

	@media (min-width:992px) and (max-width: 1200px){
		.selector_list_value_li{
			width: 15%;
		}
	}
	@media (min-width:768px) and (max-width: 992px){
		.selector_list_value_li{
			width: 20%;
		}
	}
	@media (max-width:768px) {
		.selector_list_value_li{
			width: 33%;
		}
		.selector_list_name{
			width: 20%;
		}
		.selector_list_value{
			width: 80%;
		}
		.selector_list_value ul{
			margin: 0px;
			float: left;
			padding: 0px;

			width: 80%;
			overflow: hidden;
		}
		.selector_list_more{
			width: 20%;
			float: left;

		}
		.selector_list{
			background: linear-gradient(to right, #f3f3f3 0%,#f3f3f3 20%,white 20%,white 100%);
		}

		.selector_list_close{
			background: linear-gradient(to right, #f3f3f3 0%,#f3f3f3 20%,white 20%,white 100%);
		}
		.select_tag_name{
			width: 20%
		}
		.tag_container{
			width: 80%
		}
	}
</style>