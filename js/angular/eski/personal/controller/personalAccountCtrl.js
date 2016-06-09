;appCRM.controller('personalAccountController', function($scope, $stateParams, Personal, CSRF_TOKEN) {
			
			var id = parseInt($stateParams.id);
			$scope.durumAyarla("");

			$scope.savePersonal = function(){
				
				$scope.durumAyarla("warning");
				var list 		= $scope.personalList;
				var personal 	= $scope.personal;

				var tanim = $("#gorevTanim option:selected").text();
				for (var i = list.length - 1; i >= 0; i--) {
					if (list[i].id == personal.id){
						$scope.personalList[i] 		= personal;
						$scope.personalList[i].type = $scope.personal.gorev = tanim;
					}
				};
				Personal
					.update(personal)
					.then(function(){
						$scope.durumAyarla("success");
					});
			}

			$scope.changePassword = function(){
				$scope.sifreDurum = "Lütfen bekleyiniz...";
				if ($scope.newPassword===$scope.renewPassword){
					Personal
						.password({
							id 				: id,
							newPassword 	: $scope.newPassword,
							renewPassword 	: $scope.renewPassword,
							_token			: CSRF_TOKEN
						})
						.then(function(data){
							$scope.sifreDurum = "Şifre Değişikliği Gerçekleşti.";
						});
						$scope.sifreDurum = "";
				}
				else $scope.sifreDurum = "Şifreler eşleşmedi.";
			}
			
	});