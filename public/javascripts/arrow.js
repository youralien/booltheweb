function addArrow(element) {
	document.onkeydown = checkKey;

	function checkKey(e) {

	    e = e || window.event;

	    if (e.keyCode == '37') {
	        // left arrow
	        
	    }
	    if (e.keyCode == '38') {
	        // up arrow
	    }
	    if (e.keyCode == '39') {
	        // right arrow
	    }
	    else if (e.keyCode == '40') {
	        // down arrow
	    }
	}
}