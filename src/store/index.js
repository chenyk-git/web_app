import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store=new Vuex.Store({
	state:{
		query_host:"http://106.52.171.194:3001",
		img_host:"http://106.52.171.194:3001/upload/",
		contrast:[],
		load:true,

		mini_nav:false,/*小菜单关闭和开启状态*/

		Hardware:{/*数据展示页数据缓存*/
			goods_sort_id:[],/*商品的分类id*/
			select_data:[],/*筛选的数据*/
			total:NaN,/*总数*/
			list_data:[],/*分页的数据*/


			
			select_attr:[],/*筛选的值*/

			select_tag:[],
		},
		Pagination:{
			/*page_num:0,*/
			current_num:1,/*当前的页码*/
			/*PageNum_display:[]/*页码展示*/
		}
	},
	mutations:{
		Hardware_gsid(state,data){/*id设置*/
			state.Hardware.goods_sort_id=data
		},
		Hardware_select_data(state,data){/*筛选数据设置*/
			state.Hardware.select_data=data
		},
		Hardware_total(state,data){/*分页总数设置*/
			
			state.Hardware.total=Number( data)
		},
		Hardware_list_data(state,value){/*加入分页数据*/
			
			let index=value.page_num;
			let data=value.data

			state.Hardware.list_data[index]=data
		},
		Hardware_list_data_empty(state){/*清空*/
			state.Hardware.list_data=[]
		},

		set_PageNum_display(state,data){/*设置分页页码展示*/
			state.Pagination.PageNum_display=data
		},
		set_current_num(state,num){/*设置当前页码*/
			/*console.log(num);*/
			state.Pagination.current_num=num
		},
		set_page_num(state,num){/*设置页码*/
			/*console.log(num);*/
			state.Pagination.page_num=num
		},

		selector_tag(state,tag){/*筛选标签设置*/
			/*console.log(tag)*/
			state.Hardware.select_tag=tag
		},


		set_mini_nav(state,d){
			state.mini_nav=d
		},


		setContrast(state,data){/*对比数据存储*/
			
			if(state.contrast.length<2){

				let index=state.contrast.findIndex(function(value){
					return value.ID==data[0].ID
				})
				if(index<0){
					if(state.contrast.length>0){
						
						if(state.contrast[0].goods_sort_id==data[0].goods_sort_id){
							state.contrast.push(data[0])
						}else{
							alert("只能加入同类产品比较")
						}
					}else{
						state.contrast.push(data[0])
					}
					
				}else{
					alert("已在对比栏中")
				}
			}else{
				alert("最多只能加入两个")
			}

			
			
			/*console.log("设置了值", state.contrast)*/
		},
		delContrast(state,data){/*删除对比数据*/
			let index=state.contrast.findIndex(function(value){
					return value.ID==data.ID
			})
			if(index!=-1){
				state.contrast.splice(index,1)
			}
			
		},
		Empty(state){/*清空对比数据*/
			
			state.contrast=[]
			

		},
		loadChange(state,data){
			
			state.load=data
		}
	},
	getters:{
		getContrast(state){
			return state.contrast
		}




	}
	
})
export default store