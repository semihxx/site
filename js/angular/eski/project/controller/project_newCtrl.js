;appCRM.controller('projectNewController', function($scope, $stateParams, JsonPersonal, JsonPersonalGroups, Customer, Project, Personal) {
		
		$scope.Pages.banner = {
			title 	: "Yeni Proje Ekle",
			desc	: "yeni çalışmalar, yeni deneyimler",
			thumbcrumb : {
				state  : "main.home",
				text   : "Yeni Proje Ekle"
			}
		};
		$scope.Durum 	= "";
		$scope.durumClass 	= "";

		window.editableProject = false;
		$scope.duzenle = function(){
			window.editableProject = true; 
		}
		
		$scope.init = function(){
			$scope.personalList = JsonPersonal;
			$scope.getPersonalGroup();
		};

		
		$scope.getPersonalGroup = function(){
			$scope.groupList = JsonPersonalGroups;
		};

		$scope.selectedCustomer = '';
		var sayac 				= 0;
		$scope.customerList 	= [];
		$scope.customerID 		= 0;

		$scope.customerList = [];
		$scope.getCustomer = function(viewValue) {
					Customer
						.select("id", "name", "company")
						.search(viewValue)
						.then(function(data){
							$scope.customerList = data;
						});
					sayac = 0;
		   

		   return $.map($scope.customerList, function(customer) {
		   		$("#customerdata").blur();$("#customerdata").focus();
		   		
		    	return customer;
		   });
		}

		$scope.saveProject = function(){
			$scope.durumAyarla("warning");
			Project
				.save($scope.new)
				.then(function(){
					$scope.durumAyarla("success");
				});
		};

		$scope.new = {};
		
		var clear = function(){
			angular.forEach($scope.new, function(value, key){
				this[key] = "";
			});
			$scope.new.start 			= moment().format("DD-MM-YYYY");
			$scope.new.selectedGroups 	= [1];
		}

		clear();
		$scope.newProject 		= clear;
		$scope.cancelPersonal	= clear;
		$scope.init();
		
	})