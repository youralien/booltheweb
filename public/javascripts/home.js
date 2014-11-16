$(document).ready(function() {
	var lastEntry;

	getData();
	//addQuestion("Does JWei have swag?", "Yes", "No");
	//deleteAll();
	testMobileLogin("sawyer.vaughan@students.olin.edu", "ranger");

	function getData() {
		$.getJSON( "/questions", function( data ) {
			parseData(data);
		});
	}

	function parseData(data) {
		for (i=0;i<data.length;i++) {
			$("#question-container").append("<div id='question'>"+data[i].question+"</div>");
		}
		lastEntry=data[data.length-1];
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
})