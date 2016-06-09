;appCRM.controller('personalProfileController', function($scope, $stateParams, Mission, Personal) {
			
			var id = parseInt($stateParams.id);
			$scope.personal.yeniGorev 	= "";

			$scope.completeMission = function (item) {
		      return (item.state == "1");
		    };
		    $scope.continueMission = function (item) {
		      return (item.state == "0");
		    };

			function merge_options(obj1,obj2){
			    var obj3 = {};
			    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
			    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
			    return obj3;
			}

			$scope.btnGorevEkle = function(){
				Mission
					.save({ 
						name 	: $scope.personal.yeniGorev, 
						person 	: id,
						id 		: 0,

					})
					.then(function(mid){
						$scope.missionList.push({
						    name 		: $scope.personal.yeniGorev, 
							person_id 	: id,
							id 			: mid,
							state		: '0',
							priority 	: '0',
							is_read 	: '0'
						});
						$scope.refreshRadio();
						$scope.personal.yeniGorev = "";
				});
			}

			$scope.missionObj = {
				get: function(){
					Mission
						.personal
						.get(id)
						.then(function(data){
							$scope.missionList = data;
							$scope.refreshRadio();

						});
				},
				delete: function(deleted_id){
					Mission
						.delete(deleted_id)
						.then(function(){
							var list = $scope.missionList;
							for (var i = $scope.missionList.length - 1; i >= 0; i--) {
								if (list[i]["id"] === deleted_id){ 
									list.remove(i);
									return;
								}
							};
						});
				},
				update: function(mission){
					if (name == "priority"){
						var list = $scope.missionList;
						mission.priority = mission.priority == 1 ? 0 : 1;
						for (var i = list.length - 1; i >= 0; i--) {
							if (mission.id == list[i].id){
								$scope.missionList[i].priority = mission.priority+"";
								break;
							}
						};
					}
					Mission
						.update(mission)
						.then(function(data){
							$scope.missionList = data;
						});
				},

			};
			
			$scope.$watchCollection('missionList', function (newItems) {
				var len = angular.isUndefined(newItems) ? 0 : newItems.length;

				for (var i = 0; i < len; i++) {
					newItems[i].id = parseInt(newItems[i].id);
				}
				$scope.missionList = newItems;
			});

			$scope.uploadProfile = function ( $flow ) {
				$flow.opts.query = { id:  $scope.personal.id };
				$flow.resume();
				$flow.on('fileSuccess', function(file,message){
					$scope.image = $scope.image + "?" + (new Date()).getTime();
					$flow.files = [];

						var images = angular.element(".personal-"+id);
						var new_name = "profile-img/temp/thumb/" + $scope.image + "?" + (new Date()).getTime();

						for (var i = images.length - 1; i >= 0; i--) {
							images.attr('src', new_name);
						};
						
				});
			};
			
		
			$scope.missionObj.get();
			$scope.getPersonal(id);

	});