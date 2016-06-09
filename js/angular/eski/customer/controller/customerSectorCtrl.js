;appCRM.controller('customerSectorController', function($scope, $stateParams, JsonCustomerSectors) {
		
		
		$scope.get = function(){
			$scope.sectorList = JsonCustomerSectors;
		};
		
		$scope.update= function(id, name){
			CustomerSector
				.update({name: name, id: id})
				.then(function(data) {
					$scope.sectorList = data;
				});
			
		};
		
		$scope.save = function(){
				$scope.durumAyarla("warning");
				CustomerSector
					.save($scope.newsector)
					.then(function(data){
						$scope.sectorList = data;
						$scope.durumAyarla("success");
				});
		};

		$scope.get();

	});