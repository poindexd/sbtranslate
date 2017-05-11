angular.module('app', ['jsonFormatter'])
.controller('controller', ['$scope', function($scope){
	

	$scope.slideMap = {
		2: 'image_likert'
	}

	$scope.translate = function(data){
		return data.map(function(o){
			var n = {};
				if (o.buttons && o.buttons.length){
					n.options = o.buttons.map(function(b){
						return {weight: 0, text: b.text, correct: o.slide_type_id==1 || o.slide_type_id==4 || o.slide_type_id==2}
					});
				}
				
				n.template = $scope.slideMap[o.slide_type_id]

				n.content = o.contents.description ? $(o.contents.description).text() :
										o.contents.question ? $(o.contents.question).text() :
										o.contents.info ? $(o.contents.info).text() :
										null;
				
				if (o.image && !o.image.includes('missing')){
					n.image_url = 'https://qa.wellopp.com' + o.image;
					n.image_align = Math.random() > 0.5 ? 'Left' : 'Right';
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

	var URL = "https://sb.wellopp.com/api/v1/surveys/264/slides.json";
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