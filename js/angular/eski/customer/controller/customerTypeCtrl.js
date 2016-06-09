;appCRM.controller('customerTypeController', function($scope, $stateParams, JsonCustomerTypes) {
		
		$scope.get = function(){
			$scope.typeList = JsonCustomerTypes;
		};
		
		$scope.update= function(id, name){
			CustomerType
				.update({name: name, id: id})
				.then(function(data) {
					$scope.typeList = data;
				});
		};

		$scope.save = function(){
				$scope.durumAyarla("warning");
				CustomerType
					.save($scope.newtype)
					.then(function(data){
						$scope.typeList = data;
						$scope.durumAyarla("success");
				});
		};

		$scope.get();

	});