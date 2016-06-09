;appCRM.controller('personalDetailController', function($scope, $stateParams, $timeout, Personal) {
			
			$scope.durumAyarla("");
			$scope.personal = {};

			$scope.getPersonal = function(id){

				Personal
					.get(id, "detay")
					.then(function(data){

						$scope.personal 		= data;
						$scope.personal.gorev 	= data.pt_name;
						$scope.personal.typeID 	= data.pt_id;
						$scope.personal.group 	= data.pg_name;

						$scope.gorevler = data.gorevler; //Group::all()->toArray() 
						$scope.image = data.id + "-img.jpg";
						
					});

			};
			
	});