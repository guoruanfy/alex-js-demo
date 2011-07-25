/*
 * IE和W3C规范在实现事件对象上是有所差别的
 * IE使用一个独立的全局事件对象传递参数（window.event），而其它浏览器则使用
 * 独立的包含事件对象的参数传递。
 * 
 * e=e||window.event;
 * */
 
 //阻止事件冒泡的通用函数
 function stopBubble(e)
 {
 		//如果传入了事件对象,那么是非IE浏览器
 		if(e&&e.stopPropagation)
 		{
 			e.stopPropagation();
 		}
 		else
 		{
 			window.event.cancelBubble=true;
 		}
 }
 
 //防止发生浏览器默认行为
 function stopDefault(e)
 {
// 	防止默认浏览器行为(W3C)
 		if(e&&e.preventDefault)
 		{
 			e.preventDefault();
 		}
 		else
 		{
 			window.event.returnValue=false;
 		}
 		return false;
 }
 
 
 
/*
 * 事件的绑定分为传统的事件绑定，DOM绑定（W3C），DOM绑定（IE）
 * 
 * */
 //Dean Edwards所编写的addEvent/removeEvent库
 function addEvent(element,type,handler)
 {
 		//为每个事件处理函数赋予一个独立的ID
 		if(!handler.$$guid)
 		{
 			handler.$$guid=addEvent.guid++;
 		}
// 		为元素建立一个事件类型的散列表
		if(!element.events)
		{
			element.events={};
		}
//		为每对元素/事件建立一个事件处理函数的散列表
		var handlers=element.events[type];
		if(!handlers)
		{
			handlers=element.events[type]={};
//			存储已有的事件处理函数
			if(element["on"+type])
			{
				handlers[0]=element["on"+type];
			}
		}
//		在散列表中存储该事件处理函数
		handlers[handler.$$guid]=handler;
//		赋予一个全局事件处理函数来处理所有工作
		element["on"+type]=handleEvent;
 }
//创建独立ID的计数器
 addEvent.guid=1;
 
 function removeEvent(element,type,handler)
 {
 	
 		if(element.events&&element.events[type])
 		{
 			delete element.events[type][handler.$$guid];
 		}
 }
 
 function handleEvent(event)
 {
 		var returnValue=true;
// 		获取事件对象(IE使用全局的事件对象)
		event=event||fixEvent(window.event);
		var handlers=this.events[event.type];
//		依次执行每个事件处理函数
		for(var i in handlers)
		{
			this.$$handleEvent=handlers[i];
			if(this.$$handleEvent(event)===false)
			{
				returnValue=false;
			}
		}
		return returnValue;
 }
 
// 增加一些IE事件对象缺乏的方法
function fixEvent(event)
{
		event.preventDefault=fixEvent.preventDefault();
		event.stopPropagation=fixEvent.stopPropagation();
		return event;
}

fixEvent.preventDefault=function()
{
	this.returnValue=false;
};
fixEvent.stopPropagation=function()
{
	this.cancelBubble=true;
};