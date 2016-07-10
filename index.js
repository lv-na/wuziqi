$(function(){


	
	var ctx = $('#canvas').get(0).getContext('2d')
	var canvasS = $('#canvas').get(0).height;
  	var canvasS = $('#canvas').get(0).width;
  	var row = 15;
	var blockS = canvasS/row
	var xiaohei = 4
	var drow = function(){
  	var jiange =  blockS/2 +0.5
  	var lineWidth= canvasS-blockS
  	ctx.save();
	ctx.beginPath();
	
	for(var i=0;i<row;i++){
       if(i==0){
       	ctx.translate(jiange,jiange)
       }else{
       	ctx.translate(0,blockS)
       }
       ctx.moveTo(0,0)
       ctx.lineTo(lineWidth,0)
       ctx.strokeStyle="#000"
	}
    ctx.stroke()
    ctx.closePath();
    ctx.restore();



    ctx.save();
	ctx.beginPath();
	
	for(var i=0;i<row;i++){
       if(i==0){
       	ctx.translate(jiange,jiange)
       }else{
       	ctx.translate(blockS,0)
       }
       ctx.moveTo(0,0)
       ctx.lineTo(0,lineWidth)
       ctx.strokeStyle="#000"
	}
    
	ctx.stroke()
	// ctx.lineTo(560,0)
    ctx.closePath();
    ctx.restore();

   



   var dian = function(x,y){
   	 ctx.save()
  	 ctx.beginPath();
  	 ctx.translate(x,y)
  	 
  	 ctx.moveTo(0,0)
  	 ctx.arc(0,0,4,0,(Math.PI/180)*360)
  	 ctx.fill()
  	 ctx.closePath();
  	 ctx.restore();
   }
   var x=3.5*blockS+0.5
   var y=11.5*blockS+0.5
   var z=7.5*blockS+0.5
   dian(x,x)
   dian(y,x)
   dian(z,z)
   dian(x,y)
   dian(y,y)
  // }
}	
drow()
  // 画棋子
   var drop = function(qizi){
   	ctx.save();
    
    ctx.translate((qizi.x+0.5)*blockS,(qizi.y+0.5)*blockS)
    ctx.beginPath();
    ctx.arc(0,0,15,0,(Math.PI/180)*360)
    var gradient= ctx.createRadialGradient(-3,-8,1,0,0,14);  
    if(qizi.color==1){
       gradient.addColorStop(0,"#6C6C6C");
       gradient.addColorStop(1,"#010101"); 
         
          
      // ctx.fillStyle = "#000";

      // }
    }else if(qizi.color==0){
      gradient.addColorStop(0,"#FDFDFD");
       gradient.addColorStop(1,"#C1C1C1");
       
    }
    ctx.fillStyle=gradient;
    // ctx.stroke()
    ctx.fill();
   	ctx.closePath();
   	ctx.restore();
  }
  var kaiguan = true;
  var All = {};
  var step = 0;
  $('#canvas').on('click',function(e){
  	var x=Math.floor(e.offsetX/blockS);
  	var y=Math.floor(e.offsetY/blockS);
  	if(All[x+'-'+y]){
  		return
  	}
    step+=1;
  	if(kaiguan){
  		var qizi = {x:x,y:y,color:1,step:step}
  		drop(qizi)
        kaiguan=false
        if(panduan(qizi)){
        	$('#zhezhao').show().find('#tishi').text('黑棋赢');
          tip()
          
        	
        }
  	}else {
  		var  qizi = {x:x,y:y,color:0,step:step}
  		drop(qizi)
  		kaiguan=true
  		if(panduan(qizi)){
        	$('#zhezhao').show().find('#tishi').text('白棋赢');
          tip()
           
        }
  		
  	}
  	
  	All[x+'-'+y] = qizi
})

  var panduan = function(qizi){
  	var shuju={}
    $.each(All,function(k,v){
    	if(v.color === qizi.color){
    		shuju[k] = v
    		// console.log(shuju)
    	}
    })

  	var shu = 1 ,heng = 1,zuoxie = 1, youxie = 1;
  	var tx,ty
  	tx = qizi.x ;ty= qizi.y
   // 垂直方向
  	while( shuju[tx+'-'+(ty+1)]){
  		shu++;ty++
     }
     tx = qizi.x ; ty= qizi.y
     while(shuju[tx+'-'+(ty-1)]){
     	shu++;ty--

     }
  // 水平方向
    tx = qizi.x ;ty= qizi.y
  	while( shuju[(tx+1)+'-'+ty]){
  		heng++;tx++
  		// console.log(tx,ty)
     }
     tx = qizi.x ; ty= qizi.y
     while(shuju[(tx-1)+'-'+ty]){
     	heng++;tx--
     }
     // 左斜方向
      tx = qizi.x ;ty= qizi.y
  	while( shuju[(tx+1)+'-'+(ty-1)]){
  		zuoxie++;tx++;ty--
     }
     tx = qizi.x ; ty= qizi.y
     while(shuju[(tx-1)+'-'+(ty+1)]){
     	zuoxie++;tx--;ty++
     }

     // 右斜方向
    tx = qizi.x ;ty= qizi.y
  	while( shuju[(tx-1)+'-'+(ty-1)]){
  		youxie++;tx--;ty--
     }
     tx = qizi.x ; ty= qizi.y
     while(shuju[(tx+1)+'-'+(ty+1)]){
     	youxie++;tx++;ty++
     }

     
     if(shu>=5||heng>=5||zuoxie>=5||youxie>=5){
     	return true
     }
     
  }
   function restart(){
      $('#zhezhao').hide();
    ctx.clearRect(0,0,900,900);
    drow();
    kaiguan = true;
    All = {};
     $('#tips').animate({top:"-=1600px"},'slow','linear')
    // $('#tips').css({top:"-1500px"})

   }

    $(".restart").on('click',restart)
    
    
  


    $('.savegame').on('click',function(){
    $('#zhezhao').hide();
    ctx.clearRect(0,0,900,900);
    drow();
    var i=0;
    var yanshi=function(){
      i+=1;

      $.each(All,function(k,v){
        if (v.step===i) {
          drop(v);
          if (v.color===1) {
            ctx.fillStyle="#fff"
          }else{
            ctx.fillStyle="#000"
          }
          ctx.font = "20px consolas";
          ctx.textAlign="center";
          ctx.textBaseline="middle";
          ctx.fillText(v.step,(v.x+0.5)*blockS,(v.y+0.5)*blockS);

          }


      })
     $('#tips').animate({top:"-=1600px"},'slow','linear')
   
    }
    if(All.length==step){
      tip2()
    }
         setInterval(yanshi,1000)

})

    function tip(){
      
      $('#tips').animate({top:"+=1600px"},'slow','linear',function(){
        $(this).animate({top:"-=100px"},'slow')
      })
    }
    function tip2(){
          console.log($('#tips1'))
        // $('#tips').hide()
        // $('#tips1').css({display:'block'})
        $('#tips1').animate({top:"+=1600px"},'slow','linear',function(){
        $(this).animate({top:"-=100px"},'slow')
      })
    }

    $('.no').on('click',restart)
    $('.yes').on('click',function(){
        var image = $('#canvas').get(0).toDataURL('image/jpg',1);
        $('#save').attr('href',image);
        $('#save').attr('download','qipu.png');
        restart()
    })


})