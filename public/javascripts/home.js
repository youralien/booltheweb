$(document).ready(function() {
	getData();
	//addQuestion("Does JWei have swag?", "Yes", "No");
	//deleteAll();

	function getData() {
		$.getJSON( "/questions", function( data ) {
			parseData(data);
			putAnswer(data[0]._id, "A");
		});
	}

	function parseData(data) {
		for (i=0;i<data.length;i++) {
			$("#question-container").append("<div id='question'>"+data[i].question+"</div>");
		}
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