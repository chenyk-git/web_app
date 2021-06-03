<template>
	<div class="Gradually_main">
		<particle :width="width" :height="height" class="particle"></particle>
		<div class="Gradually_content" >
			<div ref="Gradually_list" class="Gradually_list" v-for="list in list_data" style="opacity: 0" >
											<div ref='list_content' class="list_content">
												<h1>{{list.title}}</h1>
												
												<p>{{list.content}}</p>
												<p><button class="but"  v-on:click="query_data(list['id'])">了解详情</button></p>
											</div>
			</div>
		</div>


		<ul class="point">
			<li ref="point_list"  class="point_list" v-for="li in data"></li>

		</ul>
		
	</div>
</template>
<script>
	
	import particle from "@/components/Module/particle"

	export default{
		props:{
			data:''
		},
		components:{
			
			'particle':particle
		},
		data(){
			return{
				width:(window.innerWidth||document.body.clientWidth),
				height:740,
				list_data:[],
				

				
				index:0,/*当前索引*/

			}
		},
		watch:{
			data:function(){
				
			}
		},
		methods:{
			

			query_data:function(id){
				this.$router.push({path:"/detail",query:{id:id}})
				
			},
		

			change:function(i){/*淡入淡出变化逻辑*/
				this.$nextTick(()=>{
					this.$refs.Gradually_list.forEach((li)=>{
						li.style.opacity="0"/*遍历所有为默认样式*/
						li.style.zIndex = '1'
					})
					this.$refs.Gradually_list[i].style.opacity="1"/*显示指定的*/
					this.$refs.Gradually_list[i].style.zIndex = '2'
				});

			},
			point_change:function(index){/*焦点的变化*/
			this.$nextTick(()=>{
					this.$refs.point_list.forEach((li,index)=>{/*遍历所有为默认样式*/
						this.$refs.point_list[index].style.backgroundColor ='#000'

					})
					this.$refs.list_content.forEach((li,index)=>{/*遍历所有为默认样式*/
						this.$refs.list_content[index].className='list_content'

					})
					this.$refs.list_content[index].className='list_content_animation list_content'
					this.$refs.point_list[index].style.backgroundColor ='#0094FF'/*指定样式*/	
				})
			
				return 0;
			},
			
		},
		mounted:function(){
				let new_data=JSON.stringify(this.data);
				this.list_data=JSON.parse(new_data)
				this.$nextTick(()=>{/*所有dom都出来了在执行*/
					
					let Animation=()=>{/*每3秒执行动画*/
						if(this.$refs.Gradually_list.length>0&&this.$refs.point_list.length>0){/*做个判断有这些dom在执行*/
								if(this.index>=this.list_data.length-1){/*临界值判断*/
								this.index=0
								this.change(this.index)
								this.point_change(this.index)

									
								}else{
									this.index++
									this.change(this.index)
									this.point_change(this.index)

									
								}

							}else{

							}
					}
					let time=setInterval(Animation,3000)/*动画*/


					
					
					this.$refs.point_list.forEach((point_list,index)=>{/*所有焦点的点击效果*/
						point_list.onclick=()=>{
							
							clearInterval(time)/*先去掉定时器*/
							this.index=index;
							this.change(index)
							this.point_change(index);
							time=setInterval(Animation,3000)/*重启定时器*/

						}
					})
					this.change(0)/*初始化*/
					this.point_change(0)
					
				})
			onresize=()=>{

					if(this.timer) clearTimeout(this.timer);

		        	this.timer = setTimeout(()=>{ 
		        		this.width=(document.body.clientWidth||window.innerWidth);
		         	}, 50); 

				}
			
		}
	}
</script>
<style scoped>
.point{
	width: 100%;
	left: 0px;
	position: absolute;
	z-index: 2;
	bottom: 10px;
	padding: 0px;
	display: flex;
	align-items: center;
	justify-content: center
}

.point li{

	float: left;
	width: 15px;
	height: 15px;
	margin-left: 10px;
	cursor: pointer;
	list-style: none;
	border-radius: 50%;
	background-color: #fff
}
.Gradually_main{
	padding-top: 140px;
	width: 100%;
	overflow: hidden;
	height: 500px;
	background-color: #fff;
	top: 0px;
	left: 0px;
	position: absolute;
	z-index: 1;
}
.Gradually_content{
	
	z-index: 0;
	width: 100%;
	padding: 0px;
	top: 0px;
	left: 0px;
	position: relative;

}
.Gradually_list{
	
	z-index: 1;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 1s;
	position: absolute;
	height: 500px;
}
.particle{
	z-index: -1;
	top: 0px;
	left: 0px;
	height: 500px;
	position: absolute;
}
.list_content{
	
	width: 80%;
	text-align: center;
}

.list_content_animation{
	
	animation:1s  list_content;
}
.list_content h1{
	text-align: center;
	padding: 0px;
	margin: 0px;
	word-break: break-all;
	width: 100%;
}
.list_content p{
	text-align: center;
	word-break: break-all;
	width: 100%
}
.but{
	padding: 10px;
		background-color: #0094FF;
		border: 0px;
		border-radius: 4px;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
	font-size: 18px;
}
.but:active{
	padding: 10px;
		background-color: #0088EA;
		border: 0px;
		border-radius: 4px;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
	font-size: 18px;
}
@media (max-width:768px) {
	.point li{
		width: 10px;
		height: 10px;
	}
	.Gradually_main{
		height: 300px;
	}
	.Gradually_content{
		height: 300px
	}
	.Gradually_list{
		height: 300px
	}
	.list_content h1{
		font-size: 18px;
	}
	.list_content p{
		font-size: 12px;
	}
	.but{
		font-size: 12px;
	}.but:active{
		font-size: 12px;
	}
}
@media (min-width:768px) and (max-width: 992px){
	.point li{
		width: 10px;
		height: 10px;
	}
	.Gradually_main{
		height: 400px;
	}
	.Gradually_content{
		height: 400px
	}
	.Gradually_list{
		height: 400px
	}
	.list_content h1{
		font-size: 24px;
	}
	.list_content p{
		font-size: 18px;
	}
	.but{
		font-size: 14px;
	}.but:active{
		font-size: 14px;
	}

}
@media (min-width:992px) and (max-width: 1200px){
	.point li{
		width: 10px;
		height: 10px;
	}
	.Gradually_main{
		height: 500px;
	}
	.Gradually_content{
		height: 500px
	}
	.Gradually_list{
		height: 500px
	}
	.list_content h1{
		font-size: 32px;
	}
	.list_content p{
		font-size: 24px;
	}
	.but{
		font-size: 16px;
	}.but:active{
		font-size: 16px;
	}

}
@media (min-width:1600px) {
	.point li{
		width: 10px;
		height: 10px;
	}
	.Gradually_main{
		height: 600px;
	}
	.Gradually_content{
		height: 600px
	}
	.Gradually_list{
		height: 600px
	}
	.list_content h1{
		font-size: 38px;
	}
	.list_content p{
		font-size: 30px;
	}
	.but{
		font-size: 20px;
	}.but:active{
		font-size: 20px;
	}
}

@keyframes list_content{/* 飞入东画 */
	0%{
		
		opacity: 0;
		transform: translate3d(-100%,0px,0px)
	}
	40%{
		
		opacity: 1;
		transform: translate3d(0px,0px,0px)
	}
	50%{
		
		
		transform: translate3d(-2%,0px,0px)
	}
	70%{
		
		
		transform: translate3d(1%,0px,0px)
	}
	100%{
		
		transform: translate3d(0px,0px,0px)
	}
}
</style>