$(document).ready(function() {
	getData();

	function getData() {
		url = "http:something";
		data = [{
			question:"question",
			option1:"option1",
			option2:"option2"
		},{
			question:"question",
			option1:"option1",
			option2:"option2"
		},{
			question:"question",
			option1:"option1",
			option2:"option2"
		}]
		parseData(data);
	}

	function parseData(data) {
		console.log(data);
		for (i=0;i<data.length;i++) {
			console.log(data.question);
			$("#question-container").append(data[i].question);
		}
	}
})