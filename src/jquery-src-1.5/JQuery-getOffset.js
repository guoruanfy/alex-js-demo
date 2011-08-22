/*
getBoundingClientRect方法，原是IE中提供用于获取页面中某个元素的位置（相对于浏览器左上角）的，Firefox在3.0（？）以后也提供了这个方法，并且在Firefox3.5后的版本中，能够获取到元素的高度和宽度属性。
假设页面上有一个元素，使用getBoundingClientRect方法获取它位置属性的方法如下
* */
var rect = el.getBoundingClientRect(),  
    left = rect.left,  
    top = rect.top,  
    right = rect.right,  
    bottom = rect.bottom,  
    width = rect.width,//IE中无法获取  
   
     height = rect.height;//IE中无法获取 
/*
但是在IE下有点小问题：
页面左上角由一个元素，紧贴浏览器的左边和上边，在除IE外的浏览器，包括基于IE内核的搜狗浏览器（360垃圾浏览器及TT浏览器未测试）都能正确的获取到各个属性的值，而在IE中，每个值都会比正常值多出两个像素，例如，正常的left值为0，在IE中为2；
这是因为IE中document.documentElement.clientTop并不为0（尽管已设置html、body的margin和padding为0），所以在IE中获得的值要减去document.documentElement.clientTop的值。
下面是JQuery中解决方法：
*/
var getOffset = function(el){ 
    var box = el.getBoundingClientRect(), 
    doc = el.ownerDocument, 
    body = doc.body, 
    docElem = doc.documentElement, 
     
    // for ie  
    clientTop = docElem.clientTop || body.clientTop || 0, 
    clientLeft = docElem.clientLeft || body.clientLeft || 0, 
     
    // In Internet Explorer 7 getBoundingClientRect property is treated as physical, 
    // while others are logical. Make all logical, like in IE8. 
     
    zoom = 1; 
    if (body.getBoundingClientRect) { 
        var bound = body.getBoundingClientRect(); 
        zoom = (bound.right - bound.left)/body.clientWidth; 
    } 
    if (zoom > 1){ 
        clientTop = 0; 
        clientLeft = 0; 
    } 
    var top = box.top/zoom + (window.pageYOffset || docElem && docElem.scrollTop/zoom || body.scrollTop/zoom) - clientTop, 
    left = box.left/zoom + (window.pageXOffset|| docElem && docElem.scrollLeft/zoom || body.scrollLeft/zoom) - clientLeft; 
             
    return { 
        top: top, 
        left: left 
    }; 
} 
 