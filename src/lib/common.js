	function addStyle(style) {
		var fileref = document.createElement("link");
		fileref.setAttribute("rel","stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", style);
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
	
	function formatter() {
		var args  =  arguments;
		var source = args[0];
		return source.replace(/\{(\d+)\}/g,                
			function(m,i) {
				return args[parseInt(i)+1];
		});
	}
	
	function isIE() {
		var ie  =  -[1,];
		if(ie) {
			return false;
		}
		return true;
	}
	
	function fadeOut(elem) {
		var currentOpacity = 100;
		var timer = setInterval(function() {
			if(currentOpacity>0) {
				currentOpacity -= 10;
				setOpacity(elem,currentOpacity);
			}
			else {
				clearInterval(timer);
				elem.innerHTML = "";
			}
		},"80");
	};

	function setOpacity(elem,level) {
		if(elem.filters) {
			elem.filters.alpha.opacity = level;
		}
		else {
			elem.style.opacity = level / 100;
		}
	};