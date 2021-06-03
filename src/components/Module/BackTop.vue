<template>
	<div ref="BackTop" class="BackTop" v-on:click="BackTop()">
		<svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M868 545.5L536.1 163a31.96 31.96 0 0 0-48.3 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"></path></svg>
	</div>
</template>
<script>
	
	export default{
		data(){
			return{

			}
		},
		methods:{
			BackTop :function(){
				console.log()
				document.documentElement.scrollTop=0;
			}
		},
		mounted:function(){
			this.$nextTick(()=>{

				let time=()=>{
					return setTimeout(()=>{

						
						if(this.$refs.BackTop){
							if(document.documentElement.scrollTop==0){

								this.$refs.BackTop.style.opacity  = '0'
							}else if(document.documentElement.scrollTop>300){
								this.$refs.BackTop.style.opacity = '1'
							}
						}
						
						time()
					},1000)
				}

				
				time()

				
			})
			
		}
	}
</script>
<style scoped>
	.BackTop{
		transition: 0.3s;
		opacity: 1;
		z-index: 3;
		color: #fff;
		text-align: center;
		line-height: 50px;
		font-size: 30px;
		font-weight: bold;
		position: fixed;
		bottom: 100px;
		right: 10px;
		background-color: #000000;
		cursor: pointer;
		width: 40px;
		height: 40px;
	}
</style>
