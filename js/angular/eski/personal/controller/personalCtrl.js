;appCRM.controller('personalController', function($scope, $stateParams, JsonPersonalGroups, JsonPersonalTypes) {
		
		$scope.Durum 		= "";
		$scope.durumClass 	= "";
		$scope.new 			= {};
		$scope.personal 	= {};
		$scope.image		= "images/profil.png";
		$scope.Pages.banner = {
			title 	: "Personel",
			desc	: "çalışanlar ve bilgileri",
			thumbcrumb : {
				state  : "main.personal",
				text   : "Personel"
			}
		};

		$scope.durumAyarla("");

		$scope.init = function(){
			setTimeout( $scope.getPersonalGroup, 10 );
			setTimeout( $scope.getPersonalType, 10 );
		};
		$scope.getPersonalGroup = function(){
			$scope.groupList = JsonPersonalGroups;
		};
		$scope.getPersonalType = function(){
			$scope.typeList = JsonPersonalTypes;
		};

		$scope.init();

	})

