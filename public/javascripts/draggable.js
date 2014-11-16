var xDown = null;                                                        
var yDown = null;   

function addDraggable(element) {
	element.bind('touchstart', handleTouchStart, false);
	element.bind('touchmove', handleTouchMove, false);
	element.bind('touchup', handleTouchUp, false); 


	function handleTouchStart(evt) {
		console.log("yay");
	    xDown = evt.touches[0].clientX;
	    yDown = evt.touches[0].clientY; 
	}

	function handleTouchMove(evt) {
	    if ( ! xDown || ! yDown ) {
	        return;
	    }

	    var xUp = evt.touches[0].clientX;
	    var yUp = evt.touches[0].clientY;

	    var xDiff = xDown - xUp;
	    var yDiff = yDown - yUp;

	    element.css({
			'display':'block',
			'left': xDiff,
			'top':yDiff
		})
	}

	function handleTouchUp(evt) {
	    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
	        if ( xDiff > 0 ) {
	            /* left swipe */ 
	        } else {
	            /* right swipe */
	        }                       
	    } else {
	        if ( yDiff > 0 ) {
	            /* up swipe */ 
	        } else { 
	            /* down swipe */
	        }	
	    }		
	}         
};                                                     
