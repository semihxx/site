;appCRM.controller('demopoolController', function($scope, $stateParams, Customer, Demopool) {
		
		$scope.Durum 		= "";
		$scope.durumClass 	= "";
		$scope.new 			= {};
		$scope.demo 		= {};
		$scope.newsector 	= {};

		var objDurum = {
			"warning" 	: " Lüften Bekleyiniz... ",
			"success" 	: " Bilgileriniz başarılı bir şekilde kaydedilmiştir. ",
			"danger"	: " Kaydetme esnasında bir hata oluştu. "
		}

		$scope.durumAyarla = function(durum){
			$scope.durumClass = durum;
			$scope.Durum = objDurum[durum];
		}

		$scope.durumAyarla("");

		$scope.init = function(){
			$scope.getSector();
		};
		

	   	var customerListBackup = "";
		$scope.getSector = function(){
			Customer
				.getSector()
				.then(function(data){
					$scope.sectorList = data;
				});
			
		};
		$scope.updatesector= function(id, name){
			Customer
				.update
				.sector({name: name, id: id})
				.then(function(data) {
					$scope.sectorList = data;
				});
		}
		$scope.save = {
			sector: function(){
				$scope.durumAyarla("warning");
				Customer
					.save
					.sector($scope.newsector)
					.then(function(data){
						$scope.sectorList = data;
						$scope.durumAyarla("success");
				});
			},
		}

		$scope.init();
	})

	.controller('demopoolAltController', function($scope, $stateParams, Demopool) {
			
			var id = parseInt($stateParams.id);
			$scope.demopool = {};
			$scope.durumAyarla("");
			$scope.totalDisplayed = 20;
			$scope.$back = function() { 
			    window.history.back();
			};
			$scope.getCustomer = function(){
				Demopool
					.get(id)
					.then(function(data){
						$scope.demoList = data;
					});
			};
			
			$scope.delete = function(linkid){

				var list = $scope.sectorList;
				for (var i = list.length - 1; i >= 0; i--) {
					if (id == list[i].id){
						$scope.sectorList[i].count--;
						break;
					}
				};
				Demopool
					.delete(linkid, id)
					.then(function(data){
						$scope.demoList = data;
					});
			}
			$scope.update = function(demo, name){

				if (name != 'priority') demo.link = name;
				else demo.priority = demo.priority == '1' ? '0' : '1';
console.log(demo);
				$scope.durumAyarla("warning");
				Demopool
					.update(demo)
					.then(function(data){
						$scope.demoList = data;
						$scope.durumAyarla("success");
				});
			},
			
			$scope.saveDemo = function(){
				$scope.durumAyarla("warning");
				var list = $scope.sectorList;
				for (var i = list.length - 1; i >= 0; i--) {
					if (id == list[i].id){
						$scope.sectorList[i].count++;
						break;
					}
				};
				Demopool
					.save({ link: $scope.demopool.newLink, sector_id: id })
					.then(function(data){
						$scope.demoList = data;
						$scope.durumAyarla("success");
				});
			},
			
			$scope.getCustomer();
	});