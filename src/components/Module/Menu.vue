<template>
	<div id="Menu" class="Menu" ref="Menu">
		<div ref='Menu_list'id="Menu_list" class="Menu_list">
			<nav class="nav">
				<ul>
					<li class="nav_li" v-for="item in data"><router-link :to="{path:item.link,query:{id:`${item.params}`}}">{{item.name}}</router-link></li> 
				</ul>
				
			</nav>
		</div>

		<div id="mini_Menu" ref="mini_Menu" class="mini_Menu">
			<nav class="mini_nav">
				<div class="mini_nav_bar">
					菜单
					<a ref="meanmenu_reveal" class="meanmenu-reveal" v-on:click="menu_reveal()">
						<span></span>
						<span></span>
						<span></span>
					</a>
					<a ref="meanmenu_close" class="meanmenu-close" v-on:click="menu_close()">
						<svg viewBox="64 64 896 896"  width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
					</a>
				</div>
				<ul ref="mini_menu_ul">
					<li class="mini_nav_li" v-for="item in data"><router-link :to="{path:item.link,query:{id:`${item.params}`}}">{{item.name}}</router-link></li> 
				</ul>
				
			</nav>

		</div>
	</div>
</template>
<script>
	export default{
		props:{
			change:""
		},

		data(){
			return{
				data:[
					{"name":"首页","link":"/"},
					{"name":"处理器","link":"/Hardware","params":"1"},
					{"name":"内存条","link":"/Hardware","params":"2"},
					{"name":"显卡","link":"/Hardware","params":"5"},
					{"name":"硬盘","link":"/Hardware","params":"8"},
					{"name":"主板","link":"/Hardware","params":"4"},
					{"name":"散热器","link":"/Hardware","params":"6"},
					{"name":"显示器","link":"/Hardware","params":"7"},
					{"name":"电源","link":"/Hardware","params":"9"},
					{"name":"机箱","link":"/Hardware","params":"3"}
				]
			}
		},
		computed:{
			mini_nav:function(){
				return this.$store.state.mini_nav
			}
		},
		watch:{
			mini_nav:function(d){
				
				if(d){
					this.menu_reveal()
				}else{
					this.menu_close()
				}
			}
		},
		methods:{
			menu_reveal:function(){
					this.$store.commit("set_mini_nav",true);
					this.$refs.mini_menu_ul.style.display="block"
					this.$refs.meanmenu_reveal.style.display="none"
					this.$refs.meanmenu_close.style.display="block"
				
			},
			menu_close:function(){
				this.$store.commit("set_mini_nav",false);
					this.$refs.mini_menu_ul.style.display="none"
					this.$refs.meanmenu_reveal.style.display="block"
					this.$refs.meanmenu_close.style.display="none"
				
			}
		},
		mounted:function(){
			/*console.log(this.$store.state.mini_nav)*/
			if(this.change){
				document.onscroll=()=>{
				 	if(this.$refs.Menu_list||this.$refs.mini_Menu||this.$refs.Menu){
				 		if(document.documentElement.scrollTop>40){
							document.getElementById("Menu_list").className="Menu_list_animation"
							document.getElementById("mini_Menu").className="mini_Menu_animation"
							this.$refs.Menu.className="Menu_change"
						}else{
							document.getElementById("Menu_list").className="Menu_list"
							document.getElementById("mini_Menu").className="mini_Menu"
							this.$refs.Menu.className="Menu"
						}
				 	}
					
				}
			}else{
				this.$refs.Menu.className="Menu_static"
				this.$refs.mini_Menu.className="mini_Menu_static"
			}
			
		}
	}
</script>
<style>
	.mini_Menu_static{
		display: none;
	}
	.mini_Menu{
		display: none;
	}
	.mini_Menu_animation{
		display: none;
	}
	.nav{
		width: 100%;
		padding: 0px;

	}
	.nav ul{
		color: #fff;

		display: flex;
		justify-content: center;
		align-content: center;

		margin: 0px;
		padding: 0px;
		
	}
	.nav_li{
		
		float: left;
		list-style: none;
		
		line-height: 64px;
		cursor: pointer;
	}
	.nav_li a{

		text-decoration: none;
		padding-left: 20px;
		padding-right: 20px;
		border-right: 2px solid #fff;
		font-size: 14px;
		color: #fff;
	}
	.nav_li a:hover{
		color: #0094FF;
		animation: 0.3s nav_li_a;
	}
	.Menu_static{
		top: 0px;
		position: fixed;
		z-index: 3;
		width: 100%;
		height: 64px;
		display: flex;
		justify-content: center;
	}

	.Menu{
		z-index: 3;
		position: absolute;
		
		width: 100%;
		height: 64px;
		display: flex;
		justify-content: center;
	}
	.Menu_change{
		z-index: 3;
		top: 0px;
		position: fixed;
		
		width: 100%;
		height: 64px;
		display: flex;
		justify-content: center;
	}
	.Menu_list{
		display: block;
		background-color: rgba(0, 0, 0, 0.9);
		width: 80%;
		height: 64px;


	}
	.Menu_list_animation{
		display: block;
		background-color: rgba(0, 0, 0, 0.9);
		width: 100%;
		height: 64px;
		animation: 1s menu_list_change 
	}
	
	
	@keyframes menu_list_change{
		0%{
			width: 80%;
			height: 64px;
		}
		100%{
			width: 100%;
			height: 64px;
		}
	}
	@keyframes nav_li_a{
		0%{
			color: #89CEFF;
		}
		100%{
			color: ##0094FF;
		}
	}

	@media (max-width:992px) {
		.Menu{
			height:46px
		}
		.mini_nav_bar{
			color: #fff;
			font-size: 16px;
			line-height: 46px;
			padding-left: 1%;
			height: 46px;
			width: 99%;
			background-color: rgba(0, 0, 0, 0.9)
		}
		.meanmenu-close{
			cursor: pointer;
			display: none;
			
			text-align: center;
			
			
			float: right;
			background-color: rgba(0, 0, 0, 0.9);
			width: 48px;
			height: 46px;
		}
		.meanmenu-reveal{
			cursor: pointer;
			display: block;
			padding-top: 14px;
			float: right;
			background-color: rgba(0, 0, 0, 0.9);
			width: 48px;
			height: 32px;
		}
		.meanmenu-reveal span{
			margin-top: 3px;
			margin-left: 13px;
			display: block;
			width: 22px;
			height: 3px;
			background-color: #fff;
		}
		.mini_Menu_static{
			
			padding: 0px;
			display: block;
			height: 44px;
			width: 100%;
			/* background-color: rgba(0,0,0,0.9); */
		}
		.mini_Menu{
			top: 0px;
			padding: 0px;
			display: block;
			height: 44px;
			width: 90%;
			/* background-color: rgba(0,0,0,0.9); */
		}
		.Menu_list{
			display: none;
		}
		.Menu_list_animation{
			display: none;
		}
		.mini_nav{
			width: 100%;
			position: relative;
		}
		.mini_nav ul{
			width: 100%;
			position: absolute;
			z-index: 2;
			display: none;
			padding: 0px;
			margin: 0px;
			height: 400px;
			
		}

		.mini_nav_li{
			list-style: none;

			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			background-color: rgba(0, 0, 0, 0.9);
			border-bottom: 0.1px solid #5E5E5E;
		}.mini_nav_li:hover{
			cursor: pointer;
			background-color: rgba(40,40,40, 0.9);
			animation: 1s li_change;
		}
		.mini_nav_li a{
			display: block;
			text-decoration: none;
			font-size: 12px;
			color: #fff;
		}
		
		.mini_Menu_animation{
			display: block;
			width: 100%;
			height: 40px;
			/* background-color: rgba(0, 0, 0, 0.9); */
			animation: 1s mini_Menu_change;
		}
		@keyframes mini_Menu_change{
			0%{
				width: 95%;
				height:40px;
			}
			100%{
				width: 100%;
				height: 40px;
			}
		}
		@keyframes li_change{
			0%{
				background-color: rgba(0, 0, 0, 0.9);
			}
			100%{
				background-color: rgba(40,40,40, 0.9);
			}
		}
		
	}
</style>