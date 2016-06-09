;appCRM.controller('callerController', function($scope, $stateParams, Caller) {

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
		
		$scope.dateRefresh = function(start, end){
			console.log(start._d, end._d);

			Caller
				.getFilter(moment(start._d).unix(), moment(end._d).unix())
				.then(function(data){
					$scope.callerList = data;					
				});

		}
		

		$scope.init = function(){
			$scope.get();
			$scope.new.date = moment().unix()*1000;

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
			$scope.new.date 	= moment().unix()*1000; 
			$scope.new.company 	= "";
			$scope.new.name 	= "";
			$scope.new.email 	= "";
			$scope.new.phone 	= "";
			$scope.new.subject 	= "";

		}
		clear();
		$scope.init();
	})

	.controller('callerAltController', function($scope, $stateParams, $timeout, $location, Caller) {

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
						$scope.edit.date = parseInt(data.date);
					});
			};
			
			$scope.update = function(){
				Caller
					.update($scope.edit)
					.then(function(){
						$scope.durumAyarla("success");
						$timeout(function(){
							$location.path("/caller", false);
						}, 500);
					});
			}

			$scope.getCaller();

	});