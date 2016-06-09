;appCRM.controller('profileController', function($scope, $stateParams, Personal, Mission, Project) {
			
			var id = localStorage.user_id;
			$scope.currentProject = id;
			$scope.id = id;

			$scope.edit = {};

			$scope.image = "images/profil.png";

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

			$scope.getPersonal = function(){

				Personal
					.get(id)
					.then(function(data){

						list = $scope.personal = data.liste;
						$scope.image = data.liste.id + "-img.jpg";

						var scope = angular.element($("#topmenu")).scope();
					    setTimeout(
							function(){
						    	scope.$apply(function(){
						        	scope.profile.image = data.liste.id + "-img.jpg";;
						    	})
					    }, 0);

						if (data.gorev[0]){
							$scope.personal.gorev 	= data.gorev[0].type;
							$scope.personal.typeID 	= data.gorev[0].id;
						}
						$scope.gorevler = data.gorevler;

						Project
							.projectpersonal(id)
							.then(function(data){
								$scope.projectList = data;
							});

					});

			};
			
			$scope.uploadProfile = function(img){
				img.resume();
				img.on('fileSuccess', function(file,message){
					
					var scope = angular.element($("#topmenu")).scope();
					setTimeout(
						function(){
						    scope.$apply(function(){
						        scope.profile.image =  $scope.personal.image;
						    })
					}, 0);

				});
				
				
			}
		
			$scope.savePersonal = function(){
				
				$scope.durumAyarla("warning");
				Personal
					.update($scope.personal).then(function(){
						$scope.durumAyarla("success");
					});
			 
			}

			

			$scope.getProject = function(){
				Project
					.get()
					.then(function(data){
						$scope.projects = data;
					});
			};
			$scope.btnGorevEkle = function(){
				Mission
					.personal
					.save({ 
						gorev 	: $scope.personal.yeniGorev, 
						id 		: id 
					})
					.then(function(data){
						$scope.missionList = data;
				});
			}

			$scope.missionObj = {
				get: function(){
					Mission
						.personal
						.get(id)
						.then(function(data){
							$scope.missionList = data;
						});
				},
				delete: function(deleted_id){
					Mission
						.personal
						.delete(deleted_id, id)
						.then(function(data){
							$scope.missionList = data;
						});
				},
				change: {
					project: function(prid, id){
						Mission
							.postproject({ 
								prid: prid, 
								id: id 
							});
					},
					state: function(state, id){
						Mission
							.state({ 
								state: (state == 1 ? 0 : 1), 
								id: id 
							});
							
					},
					mission: function(id, name){
						Mission
							.mission({ 
								name: name, 
								id: id 
							});
					}
				}

			};
			
	
			$scope.getProject();
			$scope.getPersonal();
			$scope.missionObj.get();
	});