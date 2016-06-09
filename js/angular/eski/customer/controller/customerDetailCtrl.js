;appCRM.controller('customerAltController', function($scope, $stateParams, $timeout, Customer, JsonCustomerTypes, JsonCustomerSectors) {
			
			var id = parseInt($stateParams.id);
			$scope.edit = {};
			$scope.durumAyarla2("");
			$scope.pwdDurum2  = "";
			$scope.sectorList = JsonCustomerSectors;
			$scope.typeList	  = JsonCustomerTypes;
			$scope.$back = function() { 
			    window.history.back();
			};

			var list = $scope.customerLists;
				

			$scope.getCustomer = function(id){
				Customer
					.get(id)
					.then(function(data){
						$scope.edit = data;
					});
			};

			$scope.update = function(edit){

				$scope.durumAyarla("warning");
				Customer
					.update(edit)
					.then(function(){

						$scope.findAndRun(list, "id", edit.id, function(i) { 
							list[i] = edit;
						});

						$scope.durumAyarla("success");
						$timeout(function(){
							$location.path("/customer", false);
						}, 500);

					});
			}
			
			
			$scope.getCustomer(id);
	});