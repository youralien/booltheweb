$(document).ready(function() {
	var lastEntry; // used to get older entries when we've reached the limit of what we can get

	getData(); // get data upon document load

	// test functions:
	//addQuestion("Does JWei have swag?", "Yes", "No");
	//console.log("deleting");
	//deleteAll();
	//testMobileLogin("sawyer.vaughan@students.olin.edu", "ranger");
	//testGetUserQuestions();

	function showNextQuestion() {
		if ($("#question-container").children().length == 1) {
			getNextData();
		}
		$("#question-container").children().first().addClass('selected');
		$("#question-container").children().first().css({
			'display':'block',
		});
		$("#question-container").children().first().animate({
			top: "0"
		}, 500);
		//addDraggable($("#question-container").children().first());
	}

	document.onkeydown = checkKey;

	function checkKey(e) {
	    e = e || window.event;

	    if (e.keyCode == '37') {
	        // left arrow
			$("#question-container").children().first().removeClass('selected');
			$("#question-container").children().first().animate({
				left: "-100vw"
			}, 200, function() {
				var id = $('#question-container').children().first().attr('id');
				putAnswer(id, "A");
				$("#question-container").children().first().remove();
				showNextQuestion();				
			});
	    }
	    if (e.keyCode == '38') {
	        // up arrow
			$("#question-container").children().first().removeClass('selected');
			$("#question-container").children().first().animate({
				top: "-100vw"
			}, 200, function() {
				$("#question-container").children().first().remove();
				showNextQuestion();				
			});
	    }
	    if (e.keyCode == '39') {
	        // right arrow
			$("#question-container").children().first().removeClass('selected');
			$("#question-container").children().first().animate({
				left: "100vw"
			}, 200, function() {
				var id = $('#question-container').children().first().attr('id');
				putAnswer(id, "B");
				$("#question-container").children().first().remove();
				showNextQuestion();
			});
	    }
	    else if (e.keyCode == '40') {
	        // down arrow
	    }
	}

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
					$("#question-container").children().first().removeClass('selected');
					$("#question-container").children().first().animate({
						left: "100vw"
					}, 200, function() {
						var id = $('#question-container').children().first().attr('id');
						putAnswer(id, "B");
						$("#question-container").children().first().remove();
						showNextQuestion();
					});
					swipeDirection = 'right';
				} else {
					$("#question-container").children().first().removeClass('selected');
					$("#question-container").children().first().animate({
						left: "-100vw"
					}, 200, function() {
						var id = $('#question-container').children().first().attr('id');
						putAnswer(id, "A");
						$("#question-container").children().first().remove();
						showNextQuestion();				
					});
					swipeDirection = 'left';
				}
			}
		} else if (Math.abs(xChange) < Math.abs(yChange)) {
			if (Math.abs(yChange)>=pageWidth/5.0) {
				if (yChange>0) {
					swipeDirection = 'down';
				} else {
					$("#question-container").children().first().removeClass('selected');
					$("#question-container").children().first().animate({
						left: "100vw"
					}, 200, function() {
						var id = $('#question-container').children().first().attr('id');
						putAnswer(id, "B");
						$("#question-container").children().first().remove();
						showNextQuestion();
					});
					swipeDirection = 'up';
				}
			}
		}
		return swipeDirection;
	}

	function getNextData() {
		getTimeFromId($('#question-container').children().last().attr('id'));
	}

	function getData() {
		$.getJSON( "/questions", function( data ) {
			parseData(data);
			showNextQuestion();
		});
	}

	function parseData(data) {
		for (i=0;i<data.length;i++) {
			$("#question-container").append("<div id='"+data[i]._id+"' class='question'>"+data[i].question+"<div class='option-a'>"+data[i].optionA+"</div><div class='option-b'>"+data[i].optionB+"</div></div>");
		}
		addArrows();
		lastEntry=data[data.length-1];
	}

	function getFromTime(time) {
		$.get('/questions/last/'+time, function(data) {
			parseData(data);
		});
	}

	function getTimeFromId(id) {
		$.get('/questions/'+id, function(data) {
			getFromTime(data.timestamp);
		});
	}

	function putAnswer(id, aorb) {
		$.ajax({
			url: "/questions/"+id,
			type: "PUT",
			data: {answer:aorb}
		});
	}

	function addQuestion(question, optionA, optionB) {
		$.post( "/questions", {
				question: question,
				optionA: optionA,
				optionB: optionB,
				answersA: {},
				answersB: {},
			}
		);
	}

	function deleteAll() {
		$.get( "/deleteall");
	}

	function testMobileLogin(email, password) {
		$.post( "/mobilelogin", {
				email: email,
				password: password
			}
		);		
	}

	function testMobileSignup(email, password, firstName, lastName) {
		$.post( "/mobilesignup", {
                email: email,
				password: password,
                firstName: firstName,
                lastName: lastName
			}
		);		
	}

	function putAnswer(id, aorb) {
		$.ajax({
			url: "/questions/"+id,
			type: "PUT",
			data: {answer:aorb}
		});
	}

	function addQuestion(question, optionA, optionB) {
		$.post( "/questions", {
				question: question,
				optionA: optionA,
				optionB: optionB,
				answersA: {},
				answersB: {},
			}
		);
	}

	function deleteAll() {
		$.get( "/deleteall");
	}

	function testGetUserQuestions() {
		$.get( "/questions/user/54670c66de802fa05f003992", function(data) {
				console.log(data);
			}
		);	
	}

	function addArrows() {
		$(".arrow").remove();
		$(".option-a").append('<img class="arrow-left" src="static/arrow-left.png">');
		$(".option-b").append('<img class="arrow-right" src="static/arrow-right.png">');
	}
})