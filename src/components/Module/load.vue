<template>
	<div class="load_main" v-show="power">
		<div class="load_content">
			<div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				
			</div>
			<div >
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				
			</div>

		</div>

	</div>
</template>
<script>

	export default{
		props:{
			power:'',
		},
		data(){
			return{
				
			}
		},
		
	}
</script>
<style scoped>
	.load_main{
		width: 100%;
		height: 100%;
		position: fixed;
		background-color:rgb(0,0,0,0.8);
		top: 0px;
		left: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;

	}
	.load_content{
		
		width: 50px;
		height:50px;
		position: relative;
	}
	.load_content div{

		
		width: 50px;
		height: 50px;
		
	}
	.load_content div div{
		border-radius: 50%;
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: #fff;
		animation: Animation 1s infinite;
	}

	.load_content div:nth-child(1) div:nth-child(1){
		left: 0px;
		top: 0px;
		animation-delay: 0s
	}
	.load_content div:nth-child(1) div:nth-child(2){
		right: 0px;
		top: 0px;
		animation-delay: 0.25s
	}

	.load_content div:nth-child(1) div:nth-child(3){
		left: 0px;
		bottom: 0px;
		animation-delay: 0.5s
	}
	.load_content div:nth-child(1) div:nth-child(4){
		right: 0px;
		bottom: 0px;
		animation-delay: 0.75s
	}

	.load_content div:nth-child(2){
		position: absolute;
		top: 0px;
		transform: rotate(45deg);
	}

	.load_content div:nth-child(2) div:nth-child(1){
		left: 0px;
		top: 0px;
		animation-delay: 0.125s
		
	}
	.load_content div:nth-child(2) div:nth-child(2){
		right: 0px;
		top: 0px;
		animation-delay: 0.375s
	}

	.load_content div:nth-child(2) div:nth-child(3){
		left: 0px;
		bottom: 0px;
		animation-delay: 0.625s
	}
	.load_content div:nth-child(2) div:nth-child(4){
		right: 0px;
		bottom: 0px;
		animation-delay: 1s
	}

	@keyframes Animation{
		0%{
			transform: scale(0)
		}
		25%{
			transform: scale(0.5)
		}
		50%{
			transform: scale(1)
		}
		75%{
			transform: scale(0.5)
			
		}
		100%{
			transform: scale(0)
			
		}
		
	}
</style>