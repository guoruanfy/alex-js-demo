/*
 *offsetX offsetY  offsetParent  offsetLeft offsetTop  clientWidth clientHeight
 * 与style中设置的样式的区别 
 * 
 * document.documentElment干啥的？
 * 
 * self的指向
 * 
 * **/


//获取元素的真实、最终的CSS样式属性值的函数。
function getStyle(elem,name)
{
	if(elem.style[name])
	{
		return elem.style[name];
	}
//	use methods of IE
	else if(elem.currentStyle)
	{
		return elem.currentStyle[name];
	}
//use methods of W3C
	else if(document.defaultView&&document.defaultView.getComputedStyle)
	{
		//它使用的是通用的'text-align'的样式规则而非'textAlign'
		name=name.replace(/([A-Z])/g,"-$1");
		name=name.toLowerCase();
		var s=document.defaultView.getComputedStyle(elem,"");
		return s&&s.getPropertyValue(name);
	}
	else
	{
		return null;
	}
}

/*
 * 创建动态效果三个重要的因素：位置、尺寸、可视性
 * 位置定位方式主要有以下几种：
 * 1. static 默认的定位方式。遵循文档的普通流。top left设置无效。
 * 2. relative。同样遵循文档的普通流，可以通过top left 来设置元素相对于原始
 * 	位置的偏移。
 * 3. absolute。跳出了文档的普通流，相对于第一个非静态定位的祖先元素来展示，
 * 	如果没有这样的祖先元素，则相对于整个文档。
 * 4. fixed。把元素相对于浏览器的窗口来定位，完全忽略滚动条的滚动，一直会出现
 * 	在用户的视野。
 * 
 * 
 * 元素的位置不仅取决于它的CSS设置，同时还会受到与它密切相关的其他内容的影响。
 * */
 
 //两个确定元素相对于整个文档的x和y位置的辅助函数
 function pageX(elem)
 {
// 	offsetParent理论上指向元素的父亲，但各个浏览器的实现上还是有所不同。
//  Firefox中指向它的根节点，Opera中指向元素的直接父节点。
 		return elem.offsetParent?elem.offsetLeft+pageX(elem.offsetParent):elem.offsetLeft;
 }
 function pageY(elem)
 {
 		return elem.offsetParent?elem.offsetTop+pageY(elem.offsetParent):elem.offsetTop;
 }
 
// 确定元素相对于父亲的位置
function parentX(elem)
{
		return elem.parentNode==elem.offsetParent?
			elem.offsetLeft:
			pageX(elem)-pageX(elem.parentNode);
}

function parentY(elem)
{
	return elem.parentNode==elem.offsetParent?
		elem.offsetTop:
		pageY(elem)-pageY(elem.parentNode);
}

//获取元素CSS位置的辅助函数
function posX(elem)
{
	return parseInt(getStyle(elem,"left"));
}

function posY(elem)
{
	return parseInt(getStyle(elem,"top"));
}

//调整元素的位置
function setX(elem,pos)
{
	elem.style.left=pos+"px";
}
function setY(elem,pos)
{
	elem.style.top=pos+"px";
}

//调整元素相对于当前位置一段距离的函数
function addX(elem,pos)
{
	setX(elem,posX(elem)+pos);
}

function addY(elem,pos)
{
	setY(elem,posY(elem)+pos);
}

//获取元素真实的高度和宽度
function getHeight(elem)
{
	return parseInt(getStyle(elem,"height"));
}

function getWidth(elem)
{
	return parseInt(getStyle(elem,"width"));
}

//即使元素隐藏，也能分别获取其高度和宽度
function resetCSS(elem,prop)
{
	old={};
	for(var i in prop)
	{
		old[i]=elem.style[i];
		elem.style[i]=prop[i];
	}
	return old;
}

function restoreCSS(elem,prop)
{
	for(var i in prop)
	{
		elem.style[i]=prop[i];
	}
}

function fullHeight(elem)
{
	if(getStyle(elem,'display')!='none')
	{
		return elem.offsetHeight||getHeight(elem);
	}
	var old=resetCSS(elem,{
		display: ' ',
		visibility: 'hidden',
		position: 'absolute'
	});
	//使用clientHeight找出元素的完整高度，如果还不生效则使用getHeight
	var h=elem.clientHeight||getHeight(elem);
	
	restoreCSS(elem,old);
	
	return h;
}

function fullWidth(elem)
{
	if(getStyle(elem,'display')!='none')
	{
		return elem.offsetWidth||getWidth(elem);
	}
	
	var old=resetCSS(elem,{
		display: ' ',
		visibility: 'hidden',
		position: 'absolute'
	});
	
	var w=elem.clientWidth||getWidth(elem);
	
	restoreCSS(elem,old);
	
	return w;
}

/*
 * 元素的可见性一般有visibility和display两个属性来控制。用visibility设置元素可见性后，
 * 元素原有的空间将会有空白代替。
 * visibility 的常用值主要有visible（默认的）和hidden。
 * display常用的值主要有：inline(遵循普通文档流)；block（打破了文本的普通流）；
 * 	none（完全从文档中隐藏了元素）
 * */
 //隐藏/显示一个元素
 function hide(elem)
 {
 	var curDisplay=getStyle(elem,'display');
 	if(curDisplay!='none')
 	{
 		elem.$oldDisplay=curDisplay;
 	}
 	elem.style.display='none';
 }
 
 function show(elem)
 {
 	elem.style.display=elem.$oldDisplay||' ';
 }
 //设置元素的透明度(级别1-100)
 function setOpacity(elem,level)
 {
 	//如果存在filters这个属性，则它是IE，所以设置元素的Alpha滤波
 	if(elem.filters)
 	{
 		elem.style.filters='alpha(opacity='+level+')';
 	}
 	else
 	{
 		elem.style.opacity=level/100;
 	}
 }
 
 /*
  * 动画效果
  * */
  //通过在短时间内增加高度逐步显示隐藏元素的函数
  function slideDown(elem)
  {
  		elem.style.height='0px';
  		show(elem);
  		var h=fullHeight(elem);
  		for(var i=0;i<=100;i+=5)
  		{
  			(function(){
  				var pos=i;
  				setTimeout(function(){
  					elem.style.height=((pos/100)*h)+"px";
  				},(pos+1)*10);
  			})();
  		}
  }
  
  //获取鼠标光标相对于整个页面的当前位置
  function getX(e)
  {
  		e=e||window.event;
  		//先检查非IE浏览器的位置，在检查IE的位置
  		return e.pageX||e.clientX+document.body.scrollLeft;
  }
  
  function getY(e)
  {
  		e=e||window.event;
  		return e.pageY||e.clientY+document.body.scrollTop;
  }
  
  //两个获取鼠标相对于当前元素（事件对象e的属性target）位置的函数
  function getElementX(e)
  {
  		return (e&&e.layerX)||window.event.offsetX;
  }
  
  function getElementY(e)
  {
  		return (e&&e.layerY)||window.event.offsetY;
  }
  
  
 /*
  * 浏览器的视口（viewport）浏览器滚动条内的一切东西
  * scrollWidth和scrollHeight可以获得元素潜在的宽度和高度
  * */
  //确定当前页面高度和宽度的函数
  function pageHeight()
  {
  		return document.body.scrollHeight;
  }
  
  function pageWidth()
  {
  		return document.body.scrollWidth;
  }
  
  //确定浏览器滚动条的位置（即页面相对于视口的顶端距离）
  function scrollX()
  {
//  		一个快捷方式，在IE6/7的严格模式中
		var de=document.documentElement;
		
//		如果浏览器存在pageXOffset属性，则使用它
		return self.pageXOffset||
//		否则，尝试获取根节点在左端滚动的偏移量
		(de&&de.scrollLeft)||
//		最后尝试获取body元素的左端滚动量
		document.body.scrollLeft;
  }
  
    function scrollY()
  {
//  		一个快捷方式，在IE6/7的严格模式中
		var de=document.documentElement;
		
//		如果浏览器存在pageXOffset属性，则使用它
		return self.pageYOffset||
//		否则，尝试获取根节点在左端滚动的偏移量
		(de&&de.scrollTop)||
//		最后尝试获取body元素的左端滚动量
		document.body.scrollTop;
  }
  
  /*
   * scrollTo 方法作为window对象（或者<iframe的一个属性存在>）带有（x,y）两个参数，
   * 用来调整页面视口当前的位置
   * window.scrollTo(0,0)
   * 滚动到指定的位置
   * window.scrollTo(0,pageY(document.getElementById("body")));  
   * */
   
   /*
    * 获取视口的尺寸就可以深入了解用户当前可以看到的内容的多少
    * */
    function windowHeight()
    {
    		var de=document.documentElement;
    		
    		//如果浏览器存在innerHeight属性
    		return self.innerHeight||
    		//否则尝试获取根节点的高度偏移量
    		(de&&de.clientHeight)||
    		//最后尝试获取body元素的高度偏移量
    		document.body.clientHeight;
    }
    
        function windowWidth()
    {
    		var de=document.documentElement;
    		
    		//如果浏览器存在innerHeight属性
    		return self.innerWidth||
    		//否则尝试获取根节点的高度偏移量
    		(de&&de.clientWidth)||
    		//最后尝试获取body元素的高度偏移量
    		document.body.clientWidth;
    }
    
    
    /*
     *调整一个div居于页面中间 
     * 
     * 一般需要加上 window.onresize=document.scroll=toCenter
     * 每次用户重新调整浏览器大小时，都重新计算一遍
     * 
     * 参数elem的定位应该为absolute
     */
     function toCenter(elem)
     {
     		var w=getWidth(elem);
     		var h=getHeight(elem);
     		//定位这个元素相对于窗口垂直居中
     		var t=scrollY()+(windowHeight()/2)-(h/2);
//     		不能超过页面的顶端
     		if(t<0)
     		{
     			t=0;
     		}
     		var l=scrollX()+(windowWidth()/2)-(w/2);
     		if(l<0){l=0;}
     		setY(elem,t);
     		setX(elem,l);
     }
  