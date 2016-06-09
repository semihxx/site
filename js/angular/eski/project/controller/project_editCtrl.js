;appCRM.controller('projectEditController', function ($scope, $templateCache, JsonPersonalGroups, Customer, Personal, Project) {
	  
	    $scope.selectedCustomer = '';
	    var sayac = 0;
	    $scope.customerList = [];
	    $scope.getCustomer = function (viewValue) {
	        if (IsNumeric(viewValue)) {
                setTimeout(function () {
                    angular.element("#customerdata").val($scope.customer.company);
                });
	        } else {
	        	if ( !angular.isUndefined(viewValue) ){
		            Customer
						.select("id", "name", "company")
	                    .search(viewValue)
	                    .then(function (data) {

	                        $scope.customerList = data;
	                    });
		            sayac = 0;
	        	}
	        }
	        return $scope.customerList;
	    };
	    function IsNumeric(input) {
	        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
	        return (RE.test(input));
	    }

	    $scope.updateProject = function () {
	        $scope.durumAyarla("warning");
	        Project
                .update($scope.edit)
                .then(function (data) {
                    $scope.durumAyarla("success");
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.$parent.projectList = [];
                            $scope.$parent.projectList = data;
                        });
                    }, 20);
                    $templateCache.removeAll();
                    $scope.edit.person = $("#selectedPerson option:selected").text();
                });

	    }


		
		$scope.getPersonalGroup = function(){
			$scope.groupList = JsonPersonalGroups;
		};
	  	$scope.getPersonalGroup();

	});