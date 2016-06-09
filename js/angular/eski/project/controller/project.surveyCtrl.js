;appCRM.controller('surveyController', function ($scope, $stateParams, Survey, personalID) {

	    $scope.init = function () {
	        $scope.newLink = "";
	        $scope.id = parseInt($stateParams.id);
	        $scope.getLink($scope.id);
	    }
	    $scope.init();

	    $scope.getLink = function (id) {
	        Survey
				.get(id, personalID)
				.then(function (data) {
				    $scope.surveyList = data;
				});
	    };

	    $scope.addDemoLink = function () {
	        Survey
				.save({ link: $scope.newLink, project_id: $scope.id, person_id: personalID })
				.then(function (data) {
				    $scope.surveyList = data;
				});
	    };

	    $scope.delete = function (id, index) {
	        Survey.delete(id);
	        for (var i = $scope.surveyList.length - 1; i >= 0; i--) {
	            if (id == $scope.surveyList[i].id) {
	                $scope.surveyList.splice(i, 1);
	                break;
	            }
	        };
	    };

	    $scope.updatePoint = function (survey, point) {


	        survey.star = survey.star != point ? point : 0;
	        survey.person_id = personalID;

	        Survey
				.update(survey, $scope.id)
				.then(function (data) {
				    survey.total = data[0].star;
				});
	    };

	    $scope.sendSurvey = function () {

	        console.log($.extend({}, $scope.surveyList));

	        Survey
				.update($.extend({}, $scope.surveyList), $scope.id)
				.then(function (data) {
				    $scope.surveyList = data;
				});
	    };

	});
