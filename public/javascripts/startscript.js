$(document).ready(function() {
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();
	var menuShown = false;
	var startX = null;
	var startY = null;
	var endX = null;
	var endY = null;
	var speedShown = false;
	var settingsShown = false;
	var number = parseInt($(document).find('#user').text(), 10);
	var page = $(document).find('#page').text();

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
			menuShown = false;
		} else {
			menuSlideIn();
			menuShown = true;
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

	$('.speed').bind('touchstart', function() {
		if (speedShown) {
			speedSlideOut();
		} else {
			speedSlideIn();
		}
	});

	function speedSlideOut() {
		$('#speed-choices').animate({'left':pageWidth}, 200);
		speedShown=false;
	}

	function speedSlideIn() {
		$('#speed-choices').animate({'left':0}, 200);
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

})