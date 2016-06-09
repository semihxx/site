;appCRM.controller('customerNewController', function($scope, $stateParams, Customer, JsonCustomerTypes, JsonCustomerSectors) {
		$scope.Pages.banner = {
			title 	: "Müşteriler",
			desc	: "çalıştıklarımız ve çalışacaklarımız",
			thumbcrumb : {
				state  : "main.customer",
				text   : "Müşteriler"
			}
		};
		
		$scope.typeList = JsonCustomerTypes;
		$scope.sectorList = JsonCustomerSectors;

		$scope.save = function(){
				$scope.durumAyarla("warning");
				$scope.new.state = 1;
				Customer
					.save($scope.new)
					.then(function(data){
						$scope.customerList = data;
						clear();
						$scope.durumAyarla("success");
				});
		};


	});
	