;appCRM.controller('timelineController', function($scope, $stateParams, Timeline) {

		$scope.new = {};
		var objDurum = {
			"warning" 	: "Lüften Bekleyiniz...",
			"success" 	: "Bilgileriniz başarılı bir şekilde kaydedilmiştir.",
			"danger"	: "Kaydetme esnasında bir hata oluştu."
		}

		$scope.durumAyarla = function(durum){
			$scope.durumClass = durum;
			$scope.Durum = objDurum[durum];
		}

		$scope.durumAyarla("");

		

		$scope.init = function(){
			$scope.get();
			$scope.new.date = moment().format("DD-MM-YYYY");
		}

		$scope.get = function(){
			Caller
				.get()
				.then(function(data){
					$scope.callerList = data;					
				});
		}

		$scope.save = function(){
			$scope.durumAyarla("warning");
			Caller
				.save($scope.new)
				.then(function(data){
					$scope.durumAyarla("success");
					$scope.callerList = data;					
				});
			clear();
		}

		$scope.delete = function(id){
			Caller
				.delete(id)
				.then(function(data){
					$scope.callerList = data;					
				});
		}

		function clear(){
			$scope.new.date 	= ""; 
			$scope.new.company 	= "";
			$scope.new.name 	= "";
			$scope.new.email 	= "";
			$scope.new.phone 	= "";
			$scope.new.subject 	= "";

		}
		clear();
		$scope.init();
	})

	.controller('callerAltController', function($scope, $stateParams, Caller) {

		var id = parseInt($stateParams.id);
			$scope.edit = {};
			$scope.durumAyarla("");
			$scope.$back = function() { 
			    window.history.back();
			};
			$scope.getCaller = function(){
				Caller
					.get(id)
					.then(function(data){
						$scope.edit = data;
					});
			};
			
			$scope.update = function(){
				Caller
					.update($scope.edit)
					.then(function(){
						$scope.durumAyarla("success");
					});
			}

			$scope.getCaller();

	});