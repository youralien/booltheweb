// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])


.config(function($stateProvider, $urlRouterProvider) {

})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('CardsCtrl', function($scope, TDCardDelegate) {
  console.log('CARDS CTRL');
  var cardTypes = [
    { image: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg' },
    { image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' },
    { image: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg' },
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
});


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
			putAnswer(data[0]._id, "A");
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