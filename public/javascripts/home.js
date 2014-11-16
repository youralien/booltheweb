$(document).ready(function() {
	var lastEntry; // used to get older entries when we've reached the limit of what we can get

	getData(); // get data upon document load

	// test functions:
	//addQuestion("Does JWei have swag?", "Yes", "No");
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
	        console.log("darn");
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
})