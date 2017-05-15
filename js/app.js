angular.module('app', ['jsonFormatter'])
.controller('controller', ['$scope', function($scope){
	

	$scope.slideMap = {
		2: 'multiple_choice',
		4: 'multiple_choice',
		5: 'text',
		25: 'multiple_choice',
		26: 'multiple_choice',
		1: 'multiple_choice',
		31: 'likert',
		34: 'likert',
		37: 'multiple_choice',
		12: 'likert',
		30: 'multiple_choice',
		27: 'likert',
		35: 'text',
		11: 'likert',
		23: 'likert',
		28: 'likert',
		33: 'likert',
		36: 'multiple_choice',
		38: 'text',
		10: 'likert'
	}

	$scope.translate = function(data){
		return data.map(function(o){
			var n = {};
				if ($scope.slideMap[o.slide_type_id] == null) {
					return null;
				}

				if (o.buttons && o.buttons.length){
					n.options = o.buttons.map(function(b){
					 	return {weight: 0, text: b.text, correct: o.slide_type_id==1 || o.slide_type_id==4 || o.slide_type_id==2}
					});
				}

				n.content = o.contents.description ? $(o.contents.description).text() :
										o.contents.question ? $(o.contents.question).text() :
										o.contents.info ? $(o.contents.info).text() :
										null;
				
				if (o.image && !o.image.includes('missing')){
					n.image_url = 'https://qa.wellopp.com' + o.image;
					n.image_align = Math.random() > 0.5 ? 'Left' : 'Right';
					n.template = $scope.slideMap[o.slide_type_id] + (Math.random() > 0.5 ? "_image_right" : "_image_left");
					
				} else { //image doesn't exist

					n.template = $scope.slideMap[o.slide_type_id] + "_image_none"
				}

				if (o.audio && !o.audio.includes('missing')){
					n.audio = o.audio;
				}
				return n;
		});
	}

	$scope.strip = function(data){
		return data.map(function(o){
			o.form = "";
			return o;
		})
	}

	$scope.input = {};
	$scope.output = {};

	var URL = "https://sb.wellopp.com/api/v1/surveys/242/slides.json";

	$scope.init = function(){
		$.getJSON(URL, function(data){
			console.log(data)
			$scope.$apply(function(){
				$scope.input = $scope.strip(data);
				$scope.output = $scope.translate(data);
			})
		})
	}
	$scope.init();

}])