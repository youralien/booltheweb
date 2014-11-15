$(document).ready(function() {
	var lastEntry;

	testMobileSignup('runnersaw', 'ranger13', 'Sawyer', 'Vaughan', 'sawyer.vaughan@students.olin.edu');
	testMobileSignup('runnersaw4', 'ranger13', 'Sawyer', 'Vaughan', 'sawyer.vaughan@students.olin.edu');


	getData();
	//addQuestion("Does JWei have swag?", "Yes", "No");
	//deleteAll();

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
		console.log(lastEntry);
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

	function testMobileLogin(username, password) {
		$.post( "/mobilelogin", {
				username: username,
				password: password
			}
		);		
	}

	function testMobileSignup(username, password, firstName, lastName, email) {
		$.post( "/mobilesignup", {
				username: username,
				password: password,
                email: email,
                firstName: firstName,
                lastName: lastName
			}
		);		
	}
})