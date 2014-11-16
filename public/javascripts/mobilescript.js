$(document).ready(function() {
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();
	var menuShown = false;
	var startX = null;
	var startY = null;
	var endX = null;
	var endY = null;
	var speedShown = false;

	menu = document.getElementById("menu");

	menu.addEventListener('touchstart', function() {
		$('#menu').css({'background-color':'#aaaaaa'})
	}, false);

	menu.addEventListener('touchend', function() {
		$('#menu').css({'background-color':'#dddddd'})
		if (menuShown) {
			menuSlideOut();
			menuShown = false;
		} else {
			menuSlideIn();
			menuShown = true;
		}
	}, false);

	function menuSlideIn() {
		$('#menu-bar').animate({'left':0}, {queue: false, duration: 300});
		$('#content').animate({'left':pageWidth}, {queue: false, duration: 300});
	}

	function menuSlideOut() {
		$('#content').animate({'left':0}, {queue: false, duration: 300});
		$('#menu-bar').animate({'left':-pageWidth}, {queue: false, duration: 300});
	}

	$('.speed').bind('touchstart', function() {
		if (speedShown) {
			$('#speed-choices').animate({'left':-pageWidth}, 200, function() {
				$('#reset').animate({'top':'10vh'}, 200);
			});
			speedShown=false;
		} else {
			$('#reset').animate({'top':'60vh'}, 200, function() {
				$('#speed-choices').animate({'left':0}, 200);			
			});
			speedShown=true;
		}
	});

})