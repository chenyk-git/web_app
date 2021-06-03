<template>
	<div class="Pagination" v-if="Number(total)>0&&total ">
		<ul>

			<li class="prev" v-on:click="Previous_Page()">上一页</li>

			<li class="num" v-if="PageNum_display[0]>1">...</li>
			<li ref="num" class="num" v-for="num of PageNum_display" v-on:click="Click_Page(num)">{{num}}</li>
			<li class="num" v-if="PageNum_display[PageNum_display.length-1]<page_num">...</li>


			<li  class="next" v-on:click="Next_Page()">下一页</li>
		</ul>
	</div>
</template>
<script>
	export default{
		props:{
			total:undefined,
			pageSize:undefined,
			current:undefined,
		},
		data(){
			return{
				
					page_size:2,/*一页显示数量*/
					page_max_num:6,/*分页最多显示页面数量*/

					
					/*total:90,*//*总数量*/

					page_num:0,/*页码数量*/
					current_num:0,/*当前页码*/
					PageNum_display:[]/*页码展示*/
				
			}
		},
		
		watch:{
			total:function(){/*检测到总数变了就初始化*/
				
				this.initialization()
			},
			current:function(){
				this.initialization()
			},
			current_num:function(){
				this.num_change(this.PageNum_display.indexOf(this.current_num))
			},
			
		},
		methods:{
			initialization:function(){
				
				if(this.total){
						
							this.PageNum_display=[];
							this.current_num=this.current;
							this.page_num=0;
							this.page_size=this.pageSize;

							this.generate_page_num()
							
							let current_num=Number(this.current_num);/*当前页*/
							let page_num=Number(this.page_num);/*页码总数*/
							let page_max_num=Number(this.page_max_num);/*最多显示*/
							
							if(!current_num){
								
								current_num=1;
								this.current_num=1;
							}
							if(current_num<1){
								current_num=1;
								this.current_num=1;/*当前页不能为零*/
							}
							if(current_num>page_num){
								current_num=page_num;
								this.current_num=page_num;/*当前页不能大于页码*/
							}

							if(current_num+page_max_num>page_num){/*如果当前页大于总数就计算最后几页*/
								for(let i=0;i<=page_num-current_num;i++){
									this.PageNum_display.push(current_num+i)
									/*console.log(this.PageNum_display)*/
								}
							}else{
								for(let i=0;i<page_max_num;i++){/*小于总数直接加显示页数*/
									this.PageNum_display.push(current_num+i)
									/*console.log(this.PageNum_display)*/
								}
							}
					
				}
			},

			generate_page_num:function(){/*生成页码*/
				let total=Number(this.total);
				let page_size=Number(this.page_size);
				let remainder=total%page_size;/*计算页码余数*/

				if(total>0&&total){
					this.page_num=(total-remainder)/page_size;

					if(remainder>0){ this.page_num=this.page_num+1};
					/*console.log(this.page_num)*/
				}
				
			},/*生成页码*/


			next_PageNum_display_generate:function(){/*下一页临界值页码展示生成*/
				this.PageNum_display=[]

				let current_num=Number(this.current_num);/*当前页*/
				let page_num=Number(this.page_num);/*页码总数*/
				let page_max_num=Number(this.page_max_num);/*最多显示*/

				if(current_num+page_max_num>page_num){/*如果当前页大于总数就计算最后几页*/
					for(let i=1;i<=page_num-current_num;i++){
						this.PageNum_display.push(current_num+i)
						/*console.log(this.PageNum_display)*/
					}
				}else{
					for(let i=1;i<=page_max_num;i++){/*小于总数直接加显示页数*/
						this.PageNum_display.push(current_num+i)
						/*console.log(this.PageNum_display)*/
					}
				}



			},/*下一页临界值页码展示生成*/


			Previous_PageNum_display_generate:function(){/*上一页临界值页码展示生成*/
				this.PageNum_display=[]

				let current_num=Number(this.current_num);/*当前页*/
				let page_num=Number(this.page_num);/*页码总数*/
				let page_max_num=Number(this.page_max_num);/*最多显示*/

				
				if(current_num-page_max_num<0){/*如果当前页小于总数就计算最后几页*/

					if(page_num<page_max_num){
						for(let i=1;i<=page_num;i++){
							this.PageNum_display.push(i)
						}
					}else{
						for(let i=1;i<=page_max_num;i++){
							this.PageNum_display.push(i)
						}
					}
				}else{
					for(let i=0;i<page_max_num;i++){/*小于总数直接加显示页数*/
						this.PageNum_display.unshift(current_num-i)
						/*console.log(this.PageNum_display)*/

					}

				}



			},/*上一页临界值页码展示生成*/



			Next_Page:function(){/*下一页*/
				let current_num=Number(this.current_num);/*当前页*/
				let PageNum_display=this.PageNum_display/*页码展示*/
				if(current_num>=this.page_num){
						alert("已是最后一页")

						this.current_num=this.page_num
				}else{
					if(current_num>=PageNum_display[PageNum_display.length-1]){/*如果大于最后值时逻辑*/
					
						if(current_num>=this.page_num){
							alert("已是最后一页")

						}else{
							this.next_PageNum_display_generate()
							this.current_num=this.current_num+1
						}
						/*console.log(this.current_num)*/
					}else{
						this.current_num=this.current_num+1
						/*console.log(this.current_num)*/
					}
				}
				this.$emit("num",this.current_num)
			},
			Previous_Page:function(){/*上一页*/
				let current_num=Number(this.current_num);/*当前页*/
				let PageNum_display=this.PageNum_display/*页码展示*/
				if(current_num<=1){
					alert("已是第一页")
					
					this.current_num=1;/*防抖*/
				}else{
					if(current_num<=PageNum_display[0]){
						
						if(current_num<=1){
							alert("已是第一页")
						}else{
							this.Previous_PageNum_display_generate()
							this.current_num=this.current_num-1
							
						}
					/*console.log(this.current_num)*/
					}else{
						this.current_num=this.current_num-1;
						/*console.log(this.current_num)*/
					}
				}
				this.$emit("num",this.current_num)
				
			},
			Click_Page:function(num){/*点击页码逻辑*/

				this.current_num=num
				this.$emit("num",this.current_num)
				this.num_change(this.PageNum_display.indexOf(num))
			},



			



			num_change:function(index){/*页码点击效果*/
				this.$nextTick(()=>{
					let num= this.$refs.num;
					if(num.length>0){
						for(let i=0;i<num.length;i++){
							num[i].style.backgroundColor ='#404040'
						}
						num[index].style.backgroundColor ='#0094FF'
					}
				})
				
			}


		},

		


		mounted:function(){
			
			
			this.initialization()
			
			
		}
		
	}
</script>
<style scoped>
	.Pagination{
		float: right;
		height: 30px;
	}
	.Pagination ul{
		padding:0px;
		height: 30px;
		width: 100%;

	}
	.num{
		float: left;
		padding: 0px;
		width: 30px;
		height: 30px;
		list-style: none;
		color: #fff;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
		font-size: 14px;
		border-radius: 3px;
		background-color: #404040;
		margin-left: 5px;
	}
	.prev{
		float: left;
		padding: 0px;
		background-color: #0094FF;
		line-height: 30px;
		text-align: center;
		color: #fff;
		font-size: 14px;
		padding-right: 5px;
		padding-left: 5px;
		border-radius: 3px;
		height: 30px;
		list-style: none;
		cursor: pointer;
		user-select: none;
	}
	.next{
		float: left;
		padding: 0px;
		background-color: #0094FF;
		line-height: 30px;
		text-align: center;
		color: #fff;
		font-size: 14px;
		padding-right: 5px;
		padding-left: 5px;
		border-radius: 3px;
		height: 30px;
		list-style: none;
		margin-left: 5px;
		cursor: pointer;
		user-select: none;
	}
	@media (max-width: 768px){
		.num{
			float: left;
			padding: 0px;
			width: 20px;
			height: 20px;
			list-style: none;
			color: #fff;
			line-height: 20px;
			text-align: center;
			cursor: pointer;
			font-size: 12px;
			border-radius: 3px;
			background-color: #404040;
			margin-left: 5px;
		}
		.prev{
			float: left;
			padding: 0px;
			background-color: #0094FF;
			line-height: 20px;
			text-align: center;
			color: #fff;
			font-size: 12px;
			padding-right: 5px;
			padding-left: 5px;
			border-radius: 3px;
			height: 20px;
			list-style: none;
			cursor: pointer;
			user-select: none;
		}
		.next{
			float: left;
			padding: 0px;
			background-color: #0094FF;
			line-height: 20px;
			text-align: center;
			color: #fff;
			font-size: 12px;
			padding-right: 5px;
			padding-left: 5px;
			border-radius: 3px;
			height: 20px;
			list-style: none;
			margin-left: 5px;
			cursor: pointer;
			user-select: none;
		}
	}
</style>