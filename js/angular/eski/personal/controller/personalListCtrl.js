;appCRM.controller('personalListController', function($scope, $stateParams, Personal) {
		
		/*
            url     : '/personals/list/:grup',
            templateUrl : 'templates/personel.html',
            controller  : 'personalListController'
		*/

		$scope.Durum 		= "";
		$scope.durumClass 	= "";
		$scope.new 			= {};
		$scope.image		= "images/profil.png";

		$scope.Pages.banner = {
			title 	: "Personeller",
			desc	: "çalışanlar ve bilgileri",
			thumbcrumb : {
				state  : "main.personal",
				text   : "Personel"
			}
		};

		$scope.durumAyarla("");

		$scope.init = function(){
			$scope.getPersonal();
		};

		$scope.getPersonal = function(){
			Personal
				.get()
				.then(function(data){
					$scope.personalList = data;

				});
		};

		$scope.newgroup = {};
		$scope.saveGroup = function(){
			Personal
				.saveGroup($scope.newgroup)
				.then(function(data){
					$scope.groupList = data;
				});
		}
		$scope.updateGroup= function(id, name){
				Personal
					.updateGroup({name: name, id: id})
		}

		$scope.delete = function(id){
			Personal
				.delete(id)
				.then(function(data){
					$scope.personalList = data;
				});

		}

		$scope.savePersonal1 = function(){

			$scope.durumAyarla("warning");
			Personal
				.save($scope.new)
				.then(function(data){
					$scope.personalList = data;
					$scope.durumAyarla("success");
			});
			 
		}

		var clear = function(){
			$scope.new.name			= "";
			$scope.new.desc 		= "";
			$scope.new.image 		= "";
			$scope.new.typeID 		= "";
			$scope.new.start 		= "";
			$scope.new.end 			= "";
			$scope.new.phone 		= "";
			$scope.new.mobile 		= "";
			$scope.new.email 		= "";
			$scope.new.emailpwd 	= "";
			$scope.new.birth_date 	= "";
			$scope.new.experience	= "";
		}

		$scope.newPersonal 	= clear;
		$scope.cancelPersonal= clear;
		$scope.init();
		clear();

	})
