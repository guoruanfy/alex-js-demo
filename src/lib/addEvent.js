function addEvent(element,type,handler){
	if(!handler.$$guid) {
		handler.$$guid=addEvent.guid++;
	}
	
	if(!element.events){
		element.events={};
	}
	
	var handlers=element.events[type];
	if(!handlers){
		handlers=element.events[type]={};
		
		if(element["on"+type]){
			handlers[0]=element["on"+type];
		}
	}
	
	handlers[handler.$$guid]=handler;
	
	element["on"+type]=handleEvent;
	
}

addEvent.guid=1;

function removeEvent(element,type,handler){
	if(element.events&&element.events[type]){
		delete element.events[type][handler.$$guid];
	}
};
function handleEvent(event){
	var returnValue=true;
	
	event=event||fixEvent(window.event);
	
	var handlers=this.events[event.type];
	
	for(var i in handlers){
		this.$$handleEvent=handlers[i];
		if(this.$$handleEvent(event)===false){
			returnValue=false;
		}
	}
	
	return returnValue;
};
//增加一些IE事件对象缺乏的方法
function fixEvent(event){
	//增加w3c标准事件方法
	event.preventDefault=fixEvent.preventDefault;
	event.stopPropagation=fixEvent.stopPropagation;
	return event;
};

fixEvent.preventDefault=function(){
	this.returnValue=false;
};

fixEvent.stopPropagation=function(){
	this.cancelBubble=true;
};