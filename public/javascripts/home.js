$(document).ready(function() {
	getData();

	function getData() {
		$.getJSON( "/questions", function( data ) {
			parseData(data);
		});
	}

	function parseData(data) {
		console.log(data);
		for (i=0;i<data.length;i++) {
			console.log(data.question);
			$("#question-container").append(data[i].question);
		}
	}
})