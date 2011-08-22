 /*
   each函数是基本上所有的框架都提供了的一个工具类函数，通过它，你可以遍历对象、数组的属性值并进行处理。
    jQuery和jQuery对象都实现了该方法，对于jQuery对象，只是把each方法简单的进行了委托：把jQuery对象作为第一个参数传递给jQuery的each方法.换句话说：jQuery提供的each方法是对参数一提供的对象的中所有的子元素逐一进行方法调用。而jQuery对象提供的each方法则是对jQuery内部的子元素进行逐个调用。 
   jQuery.prototype.each=function( fn, args ) { 
      return jQuery.each( this, fn, args ); 
   }
   让我们看一下jQuery提供的each方法的具体实现， 
    jQuery.each(obj,fn,arg)   
    该方法有三个参数:进行操作的对象obj，进行操作的函数fn，函数的参数args。 
    让我们根据ojb对象进行讨论：
1.obj对象是数组 
each方法会对数组中子元素的逐个进行fn函数调用，直至调用某个子元素返回的结果为false为止，也就是说，我们可以在提供的fn函数进行处理，使之满足一定条件后就退出each方法调用。当each方法提供了arg参数时，fn函数调用传入的参数为arg，否则为：子元素索引，子元素本身 
2.obj 对象不是数组 
该方法同1的最大区别是：fn方法会被逐次不考虑返回值的进行进行。换句话说，obj对象的所有属性都会被fn方法进行调用，即使fn函数返回false。调用传入的参数同1类似。
* */ 
jQuery.each=function( obj, fn, args ) { 
    if ( args ) { 
       if ( obj.length == undefined ){ 
           for ( var i in obj ) 
             fn.apply( obj, args ); 
       }else{ 
           for ( var i = 0, ol = obj.length; i < ol; i++ ) {
              if ( fn.apply( obj, args ) === false ) 
                  break; 
          }
       }
   } else { 
       if ( obj.length == undefined ) {
            for ( var i in obj ) 
               fn.call( obj, i, obj ); 
       }else{ 
          for ( var i = 0, ol = obj.length, val = obj[0]; i < ol && fn.call(val,i,val) !== false; val = obj[++i] ){} 
       }
  } 
  return obj; 
}  
/*
 需要特别注意的是each方法中fn的具体调用方法并不是采用简单的fn(i,val)或fn(args),而是采用了fn.call(val,i,val)或fn.apply(obj.args)的形式，这意味着，在你自己的fn的实现中，可以直接采用this指针引用数组或是对象的子元素。这种方式是绝大多数jQuery所采用的一种实现方式。
 */