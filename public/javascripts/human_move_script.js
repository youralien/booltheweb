$(document).ready(function() {
	var number = parseInt($(document).find('#user').text(), 10);
	var page = $(document).find('#page').text();
	var menuShown = false;
	var speedShown = false;
	var settingsShown = false;
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();

	document.addEventListener('touchstart', handleTouchDown)

	document.addEventListener('touchmove', handleTouchMove)

	function handleTouchDown(e) {
		e.preventDefault()
		var touch = e.touches[0]; 
		startX = touch.clientX;
		startY = touch.clientY;
	}

	function handleTouchMove(e) {
		e.preventDefault()
		if ( !startX || !startY ) {
			return;
		}
		var touch = e.touches[0]; 
		endX = touch.clientX;
		endY = touch.clientY;
		swipeDirection = findDirection(startX, startY, endX, endY);
		if (swipeDirection != null) {
			startX = null;
			startY = null;
		}		
	}

	function findDirection(startX, startY, endX, endY) {
		swipeDirection = null;
		xChange = endX-startX
		yChange = endY-startY
		if (Math.abs(xChange) > Math.abs(yChange)) {
			if (Math.abs(xChange)>=pageWidth/5.0) {
				if (xChange>0) {
					$.getJSON('/selfupdate', {user:number, direction:'right'}, function(data) {processJSONresponse(data);});
					swipeDirection = 'right';
				} else {
					$.getJSON('/selfupdate', {user:number, direction:'left'}, function(data) {processJSONresponse(data);});
					swipeDirection = 'left';
				}
			}
		} else if (Math.abs(xChange) < Math.abs(yChange)) {
			if (Math.abs(yChange)>=pageWidth/5.0) {
				if (yChange>0) {
					$.getJSON('/selfupdate', {user:number, direction:'down'}, function(data) {processJSONresponse(data);});
					swipeDirection = 'down';
				} else {
					$.getJSON('/selfupdate', {user:number, direction:'up'}, function(data) {processJSONresponse(data);});
					swipeDirection = 'up';
				}
			}
		}
		return swipeDirection;
	}

	function processJSONresponse(data) {
		tilesArray = data.tiles;
		$pieces = $('#pieces');
		$pieces.html('');
		for (var i=0; i<4; i++) {
			for (var j=0; j<4; j++) {
				console.log(4*i + j);
				index = 4*i+j;
				row = i+1;
				column = j+1;
				tilevalue = tilesArray[index];
				if (tilevalue != 0) {
					html = "<div class = 'row"+row+" column"+column+" value"+tilevalue+" tile' style='background-color:"+chooseTileColor(tilevalue)+"'>"+tilevalue+"</div>";
					$pieces.append(html);
				}
			}
		}
	}

	function chooseTileColor(value) {
		if (value == 2) {
			color = '#FFFFFF';
		};
		if (value == 4) {
			color = '#DDDDFF';
		};
		if (value == 8) {
			color = '#BBBBFF';
		};
		if (value == 16) {
			color = '#9999FF';
		};
		if (value == 32) {
			color = '#7777FF';
		};
		if (value == 64) {
			color = '#5555FF';
		};
		if (value == 128) {
			color = '#3333FF';
		};
		if (value == 256) {
			color = '#1111FF';
		};
		if (value == 512) {
			color = '#0000EE';
		};
		if (value == 1024) {
			color = '#0000CC';
		};
		if (value == 2048) {
			color = '#0000AA';
		};
		if (value == 4096) {
			color = '#000088';
		};
		if (value == 8192) {
			color = '#000066';
		};
		return color;
	}

	title = document.getElementById("title");

	title.addEventListener('touchstart', function() {
		menuSlideOut();
		settingsSlideOut();
	}, false);

	settings = document.getElementById("settings");

	settings.addEventListener('touchstart', function() {
		$('#settings').css({'background-color':'#aaaaaa'})
	}, false);

	settings.addEventListener('touchend', function() {
		$('#settings').css({'background-color':'#dddddd'})
		if (menuShown) {
			menuSlideOut();
			setTimeout(function() {settingsSlideIn();}, 300);
			return;
		}
		if (settingsShown) {
			settingsSlideOut();
		} else {
			settingsSlideIn();
		}
	}, false);

	menu = document.getElementById("menu");

	menu.addEventListener('touchstart', function() {
		$('#menu').css({'background-color':'#aaaaaa'})
	}, false);

	menu.addEventListener('touchend', function() {
		$('#menu').css({'background-color':'#dddddd'})
		if (settingsShown) {
			settingsSlideOut();
			setTimeout(function() {menuSlideIn();}, 300);
			return;
		}
		if (menuShown) {
			menuSlideOut();
			onHomeScreen = true;
		} else {
			menuSlideIn();
			onHomeScreen = false;
		}
	}, false);

	function menuSlideIn() {
		$('#menu-bar').animate({'left':0}, {queue: false, duration: 300});
		$('#content').animate({'left':pageWidth}, {queue: false, duration: 300});
		menuShown = true;
	}

	function menuSlideOut() {
		$('#content').animate({'left':0}, {queue: false, duration: 300});
		$('#menu-bar').animate({'left':-pageWidth}, {queue: false, duration: 300});
		menuShown = false;
	}

	function settingsSlideIn() {
		$('#settings-bar').animate({'left':0}, {queue: false, duration: 300});
		$('#content').animate({'left':-pageWidth}, {queue: false, duration: 300});
		settingsShown = true;
	}

	function settingsSlideOut() {
		$('#content').animate({'left':0}, {queue: false, duration: 300});
		$('#settings-bar').animate({'left':pageWidth}, {queue: false, duration: 300});
		settingsShown = false;
	}

	/*
	$('.speed').bind('touchstart', function() {
		if (speedShown) {
			speedSlideOut();
		} else {
			speedSlideIn();
		}
	});
	*/

	reset = document.getElementById('reset');
	reset.addEventListener('touchstart', function() {
		$.getJSON('/aireset', {user:number}, function(data) {processJSONresponse(data);});
		menuSlideOut();
		speedSlideOut();
	}, false);

	function speedSlideOut() {
		$('#speed-choices').animate({'left':-pageWidth}, 200, function() {
			$('#reset').animate({'top':'10vh'}, 200);
		});
		speedShown=false;
	}

	function speedSlideIn() {
		$('#reset').animate({'top':'60vh'}, 200, function() {
			$('#speed-choices').animate({'left':0}, 200);			
		});
		speedShown=true;
	}

	superslow = document.getElementById('superslow');
	superslow.addEventListener('touchend', function() {
		$.getJSON('/set_speed', {speed: 'superslow', user:number}, function(data) {});
		settingsSlideOut();
		speedSlideOut();
		onHomeScreen = true;
	}, false);

	slow = document.getElementById('slow');
	slow.addEventListener('touchend', function() {
		$.getJSON('/set_speed', {speed: 'slow', user:number}, function(data) {});
		settingsSlideOut();
		speedSlideOut();
		onHomeScreen = true;
	});

	mid = document.getElementById('mid');
	mid.addEventListener('touchend', function() {
		$.getJSON('/set_speed', {speed: 'mid', user:number}, function(data) {});
		settingsSlideOut();
		speedSlideOut();
		onHomeScreen = true;
	});

	fast = document.getElementById('fast');
	fast.addEventListener('touchend', function() {
		$.getJSON('/set_speed', {speed: 'fast', user:number}, function(data) {});
		settingsSlideOut();
		speedSlideOut();
		onHomeScreen = true;
	});

	superfast = document.getElementById('superfast');
	superfast.addEventListener('touchend', function() {
		$.getJSON('/set_speed', {speed: 'superfast', user:number}, function(data) {});
		settingsSlideOut();
		speedSlideOut();
		onHomeScreen = true;
	});

	about = document.getElementById('about');
	if (page!='about') {
		about.addEventListener('touchend', function() {
			menuSlideOut();
			setTimeout(function() {window.location.replace('/about/'+number)}, 300);
		}, false);
	} else {
		about.addEventListener('touchend', function() {
			menuSlideOut();
			onHomeScreen = true;
		}, false);
	}
	
	play = document.getElementById('play');
	if (page!='play') {
		play.addEventListener('touchend', function() {
			menuSlideOut();
			setTimeout(function() {window.location.replace('/self/'+number)}, 300);
		});
	} else {
		play.addEventListener('touchend', function() {
			menuSlideOut()
			onHomeScreen = true;
		}, false);
	}

	watch = document.getElementById('watch');
	if (page!='watch') {
		watch.addEventListener('touchend', function() {
			menuSlideOut();
			setTimeout(function() {window.location.replace('/ai/'+number)}, 300);
		}, false);
	} else {
		watch.addEventListener('touchend', function() {
			menuSlideOut()
			onHomeScreen = true;
		}, false);
	}

	compete = document.getElementById('compete');
	if (page!='compete') {
		compete.addEventListener('touchend', function() {
			menuSlideOut();
			setTimeout(function() {window.location.replace('/vs_ai/'+number)}, 300);
		}, false);
	} else {
		compete.addEventListener('touchend', function() {
			menuSlideOut()
			onHomeScreen = true;
		}, false);
	}

});