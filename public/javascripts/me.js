$(document).ready(function() {
	var lastEntry; // used to get older entries when we've reached the limit of what we can get
	var criteria = ['Race', 'Gender', 'Age', 'Location', 'Occupation'];
	var selector;
	var question_data;
	var user_data = [];
	var user_id = $("#user-id").text();
	console.log(user_id);
	//getUserQuestions(user_id);
	testGetUserQuestions();

	function getUserQuestions(user_id) {
		$.get( "/questions/user/"+user_id, function(data) {
				parseData(data);
			}
		);	
	}

	function testGetUserQuestions() {
-		$.get( "/questions/user/54670c66de802fa05f003992", function(data) {
				parseData(data);
			}
		);	
	}

	function parseData(data) {
		for (i=0;i<data.length;i++) {
			$("#my-questions-container").append("<div id='"+data[i]._id+"' class='my-question'>"+data[i].question+"</div>");
		}
		lastEntry=data[data.length-1];
		$(".my-question").click(function() {
			question_id=$(this).attr('id');
			getQuestionData(question_id);
		});
	}

	function getQuestionData(questionid) {
		$.get('/questions/'+questionid, function(data) {
			for (i=0;i<data.answersB.length;i++) {
				getUser(data.answersB[i]);
			}
			$("#selection-bar").html("");
			displaySelectors(data);
		});
	}

	function getUser(user_id) {
		$.get('/user/'+user_id, function(data) {
				if (data) {
					user_data.push(data);
					console.log(data);
				}
			}
		);
	}

	function displaySelectors(data) {
		for (i=0;i<criteria.length;i++) {
			$("#selection-bar").append("<div class='data-selector'>"+criteria[i]+"</div>");
		}
		$(".data-selector").click(function() {
			do_plot($(this).text().toLowerCase());
		});
	}

	function do_plot(selector) {
		setTimeout(plot(user_data, selector), 3000);
	}

	function plot(data, selector) {
		selector = selector.toLowerCase();
		if (selector == "location") {
			selector = "state";
		}
		console.log('plotting');
		console.log(data);
		var d = {}
		var l = []
		for (i=0;i<data.length;i++) {
			temp = data[i];
			temp2 = temp[selector];
			if (temp2 != undefined) {
				if (temp2 in d) {
					d[temp2] += 1;
				} else {
					d[temp2] = 1;
				}
			}
		}
		console.log(d);
		for (var key in d) {
			temp = [key, d[key]];
			l.push(temp);
		}
		console.log(l);
	    $('#data-container').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: 1,//null,
	            plotShadow: false
	        },
	        title: {
	            text: 'Percentage of yes responders by '+selector
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'Browser share',
	            data: l
	        }]
	    });
	}
});