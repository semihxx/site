;appCRM.controller('templateController', function($scope, $state, $stateParams, Template) {
		$scope.Durum 		= "";
		$scope.durumClass 	= "";
		$scope.process 		= "Yeni Ekle";
		$scope.id 			= angular.isUndefined($stateParams.id) ? 0 : $stateParams.id;
		var objDurum = {
			"warning" 	: "Lüften Bekleyiniz...",
			"success" 	: "Bilgileriniz başarılı bir şekilde kaydedilmiştir.",
			"danger"	: "Kaydetme esnasında bir hata oluştu."
		}
		$scope.durumAyarla = function(durum){
			$scope.durumClass = durum;
			$scope.Durum = objDurum[durum];
		}

		$scope.Template = function(){
			Template
				.get($scope.id)
				.success(function(data){
					$scope.name = data[0].name;
					$scope.txtEditor = data[0].content;
				});
		};
		$scope.save = function() { 
			Template
				.update({id:$scope.id, name: $scope.name, content:$scope.txtEditor})
				.success(function(data){
				        $scope.$apply(function () {
							$scope.templateList = data;
				        });

				        var scope = angular.element($("#panel-wrapper")).scope();
					    setTimeout(
					        function(){
						        scope.$apply(function(){
									scope.templateList = data;

						       	})
					    	},
					    0);
					 $state.go('mailing');
					return false;
				});
		};
		$scope.refresh = function(){
			$('#onizle').contents().find('body').append($scope.txtEditor);
		}
		$scope.Template();
		
	});