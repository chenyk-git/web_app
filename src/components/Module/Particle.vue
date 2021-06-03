<template>
	<div ref=main id="main">
		<canvas id="Canvas" ref="Canvas">
			
		</canvas>
	</div>
</template>
<script>
	export default{
		props:{
				number:"",/*数量*/
				max:"",/*连线最大值*/
				width:"",/*长*/
				height:"",/*高*/
				color:"",/*粒子颜色*/
				backgroundColor:"",/*背景颜色*/
				weight:"",/*线的粗细*/
				size:""/*粒子大小*/
		},
		watch:{
			width:function(){
				this.Canvas_size()
			},
			height:function(){
				this.Canvas_size()
			}

		},
		data(){
			return{
				Cnum:150,/*数量*/
				Cmax:12000,/*连线最大值*/
				Cwidth:1000,/*长*/
				Cheight:500,/*高*/
				Ccolor:"#000",/*粒子颜色*/
				Cbcolor:"#000",/*背景颜色*/
				Cweight:0.05,
				Csize:2,
				dian:[],
				mouseXY:{x:null,y:null},
				
			}
		},
		methods:{
			Canvas_size:function(){
				let Rint=/^[0-9]+$/;
				let RDecimal=/^[0-9]+\.[0-9]+$/;
				if(RDecimal.test(this.width)||Rint.test(this.width)){

					this.Cwidth=this.width
				}else {
					
					this.Cwidth=1000
				}
				if(RDecimal.test(this.height)||Rint.test(this.height)){
					this.Cheight=this.height;
				}else {
					this.Cheight=500
				}
				if(this.Cheight>0&&this.Cwidth>0){
					this.$refs.main.style.width = this.Cwidth;
					this.$refs.main.style.height =this.Cheight;
					this.$refs.Canvas.width = this.Cwidth;
					this.$refs.Canvas.height =this.Cheight;
				}else{
					this.$refs.Canvas.width = 1000;
					this.$refs.Canvas.height =1000;
					this.$refs.main.style.width = 1000;
					this.$refs.main.style.height =1000;
					this.Cwidth =1000;
					this.Cheight =1000;
				}
			},
			Animation:function(ctx){
				ctx.clearRect(0,0,this.Cwidth,this.Cheight);
				ctx.beginPath();
				if(this.dian.length>0){
					for(let i=0;i<this.dian.length;i++){
						
						

						if(this.dian[i].x>this.Cwidth||this.dian[i].x<0){
							this.dian[i].bx=this.dian[i].bx*-1
							this.dian[i].x=this.dian[i].x+this.dian[i].bx;
						}else {
							this.dian[i].x=this.dian[i].x+this.dian[i].bx;
						}


						if(this.dian[i].y>this.Cheight||this.dian[i].y<0){
							this.dian[i].by=this.dian[i].by*-1
							this.dian[i].y=this.dian[i].y+this.dian[i].by;
						}else{
							this.dian[i].y=this.dian[i].y+this.dian[i].by;
						}
						ctx.fillStyle=this.Ccolor
						ctx.fillRect(this.dian[i].x,this.dian[i].y,this.Csize,this.Csize);


						if(this.mouseXY.x!=null&&this.mouseXY.y!=null){

							let yb=this.dian[i].y-this.mouseXY.y;
							let xb=this.dian[i].x-this.mouseXY.x;

							let juli=yb*yb+xb*xb;
							if(juli<this.Cmax){

								if(juli>this.Cmax/2){
									this.dian[i].y=this.dian[i].y-yb*0.03;
									this.dian[i].x=this.dian[i].x-xb*0.03;
								}
								
								ctx.strokeStyle=this.Ccolor
								ctx.moveTo(this.dian[i].x+1,this.dian[i].y+1);
								ctx.lineTo(this.mouseXY.x+1,this.mouseXY.y+1);
								ctx.lineWidth =this.Cweight;
								
							}
						}


						for(let a=0;a<this.dian.length;a++){
							let yb=this.dian[i].y-this.dian[a].y;
							let xb=this.dian[i].x-this.dian[a].x;

							let juli=yb*yb+xb*xb;

							if(juli<this.Cmax){
								
								ctx.strokeStyle=this.Ccolor
								ctx.moveTo(this.dian[i].x+1,this.dian[i].y+1);
								ctx.lineTo(this.dian[a].x+1,this.dian[a].y+1);
								ctx.lineWidth =this.Cweight;
								
							}


						}
					}
					
				}
				
				ctx.closePath();
				ctx.stroke();
			}
		},
		mounted:function(){
			
			let canvas=document.getElementById("Canvas")
			let ctx=canvas.getContext("2d");

			let Rint=/^[0-9]+$/;
			let RDecimal=/^[0-9]+\.[0-9]+$/;

			if(Rint.test(this.number)){
				this.Cnum=this.number
			}else{
				this.Cnum=150
			}
			if(Rint.test(this.max)){
				this.Cmax=this.max
			}else{
				this.Cmax=12000
			}
			
			if(RDecimal.test(this.width)||Rint.test(this.width)){

				this.Cwidth=this.width
			}else {
				
				this.Cwidth=1000
			}
			if(RDecimal.test(this.height)||Rint.test(this.height)){
				this.Cheight=this.height;
			}else {
				this.Cheight=500
			}
			if(RDecimal.test(this.weight)||Rint.test(this.weight)){
				this.Cweight=this.weight
			}else {
				this.Cweight=0.05
			}
			if(RDecimal.test(this.size)||Rint.test(this.size)){
				this.Csize=this.size
			}else {
				this.Csize=2
			}
			if(this.backgroundColor !=""){

				this.Cbcolor=this.backgroundColor;
				this.$refs.main.style.backgroundColor = this.Cbcolor
			}


			if(this.Cnum>0){
				for(var i=0;i<this.Cnum;i++){
					let x=Math.random()*this.Cwidth;
					let y=Math.random()*this.Cheight;

					let bx=Math.random()*2-1;
					let by=Math.random()*2-1;
					this.dian.push({x:x,y:y,bx:bx,by:by})
				}
			}
			


			if(this.Cheight>0&&this.Cwidth>0){
				this.$refs.main.style.width = this.Cwidth;
				this.$refs.main.style.height =this.Cheight;
				this.$refs.Canvas.width = this.Cwidth;
				this.$refs.Canvas.height =this.Cheight;
			}else{
				this.$refs.Canvas.width = 1000;
				this.$refs.Canvas.height =1000;
				this.$refs.main.style.width = 1000;
				this.$refs.main.style.height =1000;
				this.Cwidth =1000;
				this.Cheight =1000;
			}


			window.onmousemove=(event)=>{
				
				let rect=canvas.getBoundingClientRect();
				this.mouseXY.x=event.clientX-rect.left;
				this.mouseXY.y=event.clientY-rect.top;
				
			}
			window.onmouseout=(event)=>{
				this.mouseXY.x=null;
				this.mouseXY.y=null;
				
			}

			let times=undefined;

			let Timeout=(callback) =>{
	            	setTimeout(callback, 1000 / 60);
	            
	          };
	          let Interval=()=>{
	          	
	          	this.Animation(ctx)
	          	Timeout(Interval)
	          }

	          Interval()

			/*let Interval=(cb,ms)=>{

				times=setTimeout(()=>{
					clearTimeout(times);
					times=undefined;
					cb();
					return Interval(cb,ms)


				}, ms)
			}
			let cb=()=>{this.Animation(ctx)};
			Interval(cb,30)*/
			
		}
	}
	
</script>
<style scoped>


</style>