;appCRM.controller('missionListController', function($scope, $stateParams, Mission) {
		
		$scope.init = function(){
			$scope.getMission();
		}

		$scope.getMission = function(){

			Mission
				.onGoingGet()
				.then(function(data){
					$scope.missionList = data;
				});

		};

		$scope.$watchCollection('missionList', function (newItems) {
			for (var i = 0; i < newItems.length; i++) {
				newItems[i].id = parseInt(newItems[i].id);
			}
			$scope.missionList = newItems;
		});
		$scope.init();

	});