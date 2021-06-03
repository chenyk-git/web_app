<template>
	<div id="hardware"  >
		 <!-- <div class="hardware_head"></div> -->
		 <Menu class="menu"></Menu>
		 <div id="main">
		 	
		
			<div class="selector">
				<Selector  @select_attr="select_attr" :data="select_data"></Selector>	
			</div>
			<div class="card">
				<card  :data="list_data"></card>
				<div class="pagination">
					<Pagination :total='total' :current="current_num" :pageSize="page_size"  @num="Pagination_num"></Pagination>
				</div>
			</div>
			
		 </div>
		
		

		
		 
	</div>
</template>
<script>
	
	import Selector from  "@/components/Module/Selector"
	import Menu from "@/components/Module/Menu"
	import Pagination from "@/components/Module/Pagination"
	import card from "@/components/Module/card"
	export default{
		components:{
		    "card":card,
		    "Menu":Menu,
		    "Selector":Selector,
		    "Pagination":Pagination,
		    
		  },
		data(){
			return{
				goods_sort_id:1,/*商品分类id*/
				select_data:[],/*筛选的数据*/
				total:0,/*总数*/
				list_data:[],/*分页后数据*/

				select_list_attr:{"Brand":[],"series":[],"attr":[]},/*筛选后的数据*/

				current_num:1,
				page_size:10,
			}
		},
		watch:{
			$route(to,from){/*路由监听，监听该路由并且获取id*/

				if(to.name=="hardware"){

					if(to.query.id){
						this.initialization(to.query.id)
						
					}
					

				}else{
					
				}
			}
		},
		methods:{

			/*需要vuex做缓存*/
			initialization:function(id){/*初始化*/
				let Hardware_store=this.$store.state.Hardware;

				if(Hardware_store.goods_sort_id==id){
					/*console.log('植入',Hardware_store)*/
					let goods_sort_id=Hardware_store.goods_sort_id/*商品分类id*/
					let select_data=Hardware_store.select_data/*筛选的数据*/
					let total=Hardware_store.total/*总数*/
					let current_num=this.$store.state.Pagination.current_num/*当前页码*/
					let list_data=Hardware_store.list_data[current_num]/*分页后数据*/

					this.goods_sort_id=goods_sort_id/*商品分类id*/
					this.select_data=select_data/*筛选的数据*/
					this.total=total/*总数*/
					this.list_data=list_data/*分页后数据*/

					this.current_num=current_num
					/*console.log("当前",current_num)*/

				}else{
					/*console.log('初始化');*/
					(async ()=>{
							this.select_list_attr={"Brand":[],"series":[],"attr":[]};/*初始化筛选值*/
							/*this.$store.commit("set_PageNum_display",[]);*//*初始化页码展示*/
							this.$store.commit("Hardware_list_data_empty")/*数据清空*/
							this.$store.commit("set_current_num",1)/*当前页码初始化*/
							this.$store.commit("selector_tag",[])/*筛选标签初始化*/
							this.$store.commit("Hardware_gsid",id)/*id初始化*/
							this.goods_sort_id=id;
							this.total=0;
							let select_data=await this.query_ApiSelect(this.goods_sort_id)/*筛选数据请求*/
							this.$store.commit("Hardware_select_data",select_data)/*设置vuex数据*/
							let total=await this.query_ApiPagination({"Brand":[],"series":[],"attr":[]})/*页码请求*/
							this.$store.commit("Hardware_total",total)/*设置vuex数据*/
							let list_data=await this.query_list({/*分页后数据请求*/
								"goods_sort_id":this.goods_sort_id,
								"page_num":0,
								"page_size":this.page_size,
								"select_attr":{"Brand":[],"series":[],"attr":[]}
							})
							/*console.log(list_data)*/
							this.$store.commit("Hardware_list_data",{page_num:1,data:list_data})

							/*console.log(Hardware_store)		*/	
						
					})()
				}
			},

			/*操作*/
			/*筛选按钮*/
			select_attr:function(attr){/*筛选按钮，获取数据*/
				this.$store.commit("Hardware_list_data_empty")
				this.select_list_attr=attr;
				
				this.$store.commit("set_current_num",1);/*页码初始化*/
				this.total=1;

				(async ()=>{
					let total=await this.query_ApiPagination(attr)/*页码请求*/
					this.total=total;
					this.current_num=1;
					this.$store.commit("Hardware_total",total)/*设置vuex数据*/
					let list_data=await this.query_list({
								"goods_sort_id":this.goods_sort_id,
								"page_num":0,
								"page_size":this.page_size,
								"select_attr":this.select_list_attr
							})
							/*console.log(list_data)*/
					this.$store.commit("Hardware_list_data",{page_num:1,data:list_data})
					
					/*console.log(this.$store.state.Hardware)*/
				})()

				


				
				/*console.log(this.list_data)*/

			},
			/*页码按钮*/
			Pagination_num:function(num){/*页码点击获取数据*/
				/*console.log(num)*/
				this.$store.commit("set_current_num",num);/*vuex页码设置*/

				if(this.$store.state.Hardware.list_data[num]){
						/*console.log('有值')*/
						this.list_data=this.$store.state.Hardware.list_data[num]/*vuex有数据就赋值*/
				}else{
					(async ()=>{
						let list_data=await this.query_list({
												"goods_sort_id":this.goods_sort_id,
												"page_num":num,
												"page_size":this.page_size,
												"select_attr":this.select_list_attr
											})
						this.$store.commit("Hardware_list_data",{page_num:num,data:list_data})
						/*console.log("筛选",this.select_list_attr)
						console.log(this.$store.state.Hardware)*/

					})()
					
				}
				
				
			},
			/*需要vuex做缓存*/




			/*数据请求*/

			query_ApiSelect:function(id){/*筛选数据请求*/
				this.$store.commit("loadChange",true)
				return new Promise((resolve)=>{
					this.$http({
							url:`${this.$store.state.query_host}/ApiSelect`,/*请求接口*/
							method:'get',
							params:{
								id:this.goods_sort_id
							}

						}).then(data=>{
							if(data.status==200){/*请求到数据就渲染*/
								if(data.data.message==1){
									this.$store.commit("loadChange",false);
									this.$store.commit("set_mini_nav",false);
									this.select_data=data.data.select_data
									resolve(this.select_data)
								}
							}
						})
				})
				
				
						
			},
			query_ApiPagination:function(attr){/*分页总数页码数量请求*/
				return new Promise((resolve)=>{
					this.$http({
						url:`${this.$store.state.query_host}/ApiPagination`,/*分页数量接口*/
						method:'get',
						params:{
							goods_sort_id:this.goods_sort_id,
							select_attr:attr
						}
					}).then((data)=>{
						if(data.status==200){
							this.total=data.data[0]['COUNT(ID)']
							resolve(this.total)
						}
					})
				})
				
			},
			query_list:function(value){/*分页数据请求*/
				return new Promise((resolve)=>{
					this.$http({
						url:`${this.$store.state.query_host}/ApiQueryList`,/*数据内容接口*/
						method:'get',
						params:{
							
							data:value
						}
					}).then((data)=>{
						if(data.status==200){
							this.list_data=data.data;
							/*console.log(this.list_data)*/
							resolve(this.list_data)

						}
					})
				})
				
			},



			

		},
		mounted:function(){
			/*console.log('1')*/

			if(this.$route.query.id){/*页码进入就检查获取id并且请求筛选的数据*/
				this.initialization(this.$route.query.id)
			}
			
		}
	}

</script>
<style scoped>
	.selector{
		margin-top: 65px;
		
		height: auto;
		width: 100%;

	}
	#main{
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
		
		
		width: 80%;
		margin-left: 10%;
	}
	#hardware{
		width: 100%;
		height: auto;
		
	}
	.hardware_head{
		width: 100%;
	  	height: 60px
	}
	.card{
		
		width: 100%;
		
	}
	.pagination{
		
		height: 50px;
		background-color: #f3f3f3;
		padding-bottom: 10px;
		width: 99%;
		padding-right: 1%;
	}
	.menu{
		top: 0px;
	}
	@media (max-width: 992px){
		.selector{
			width: 100%;
			margin-left: 0px;
			margin-top: 40px;
		}
		#main{
			width: 100%;
			margin-left: 0%;
		}
	}
</style>