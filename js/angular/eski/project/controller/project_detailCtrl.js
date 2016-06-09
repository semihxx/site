;appCRM.controller('projectDetailController', function ($scope, Timer, $sce, $timeout, $stateParams, Mission) {
		
		/*
			name 		: main.project.tabs
			url   		: '/project/0/:id',
			views 		: 'project.tabs-1'
			templateUrl : 'templates/project/project.tab.detail.html',
			controller  : 'projectMissionController',
		*/

		$scope.settings["id"] = $stateParams.id;
		$scope.totalDisplayed = 15;

		
		$scope.init = function () {
			$scope.missionObj.get();
			$scope.getProject();
			Timer.fnAdd({
				fn: 			$scope.missionObj.get, 
				start: 			false, 
				frekans: 		60000, 
				allPageRepeat: 	false
			});
		};
			
		
		$scope.btnGorevEkle = function(){
			var fn = function(){$('.combo_container select').combobox(); fn = undefined;}
			var len = $scope.missionList.length ;

			$scope.missionList
				.push({
				    name 		: $scope.project.yeniGorev, 
					person_id 	: $scope.edit.person_id,
					person 		: $scope.edit.person,
					state		: '0',
					id 			: $scope.missionList[len-1].id+1,
					is_read 	: '0',
					sending 	: true,
					priority 	: '0'
			});
			$scope.refreshRadio();
			$timeout(fn);
			
			Mission
				.save({ 
					name 	: $scope.project.yeniGorev, 
					person 	: $scope.edit.person_id,
					id 		: $scope.settings["id"],
				})
				.then(function(mid){
					$scope.missionList[len].sending = false;
					$scope.missionList[len].id 		= mid;
					$scope.project.yeniGorev 		= "";
				});
		}

		var fn = function(){$('.combo_container select').combobox(); fn = undefined;}

		$scope.missionObj = {
			refresh: function(){
				Mission.cacheClear();
				this.get();
			},
			get: function () {
				
				Mission
					.get($scope.settings["id"])
					.then(function (data) {
						$scope.missionList = data;
						$scope.refreshRadio();
						$timeout(fn);
					});
			},
			delete: function (deleted_id) {
				Mission
					.delete(deleted_id, $scope.settings["id"])
					.then(function (data) {
						var list = $scope.missionList;
						for (var i = list.length - 1; i >= 0; i--) {
							if (deleted_id == list[i].id) {
								list.remove(i);
								break;
							}
						};
					});
			},
			update: function (mission, name) {
				if (name == "priority") {
					var list = $scope.missionList;
					mission.priority = mission.priority == "1" ? "0" : "1";
					for (var i = list.length - 1; i >= 0; i--) {
						if (mission.id == list[i].id) {
							$scope.missionList[i].priority = mission.priority + "";
							mission.project_id = $scope.missionList[i].project_id;
							break;
						}
					};
				}
				else if (name) mission.name = name;
				Mission
					.update(mission)
					.then(function (data) {
						$scope.projectList = data;
						$scope.refreshRadio();

					});
			},

		}

		
		$scope.$watchCollection('missionList', function (newItems) {
			var len = angular.isUndefined(newItems) ? 0 : newItems.length;
			
			for (var i = 0; i < len; i++) {
				newItems[i].id = parseInt(newItems[i].id);
				var unixDate = newItems[i].created_at;
				newItems[i].date = moment(unixDate*1000).format('MM.DD.YYYY');
				newItems[i].hour = moment(unixDate*1000).format('H:mm:ss');
			}
			
			$scope.missionList = newItems;
		});
		$scope.loadMore = function () {
			$scope.totalDisplayed += 20;
			$scope.refreshRadio();
			var fn = function(){$('.combo_container select').combobox(); fn = undefined;}
			$timeout(fn);
		};
		$scope.removeBubling = function (item, $event) {
			$event.originalEvent.prevent = true;
		}
		
		

		/*Mission edit*/
		$scope.mission_edit = {};
			$scope.getMission = function(mission){
				$scope.mission_edit = mission;
			};

			$scope.updateMission = function(){
				durumAyarla("warning");
				$scope.mission_edit.desc = $("#aciklama").val();
				Mission
					.update($scope.mission_edit)
					.then(function(data){
						durumAyarla("success");

						$edit = $scope.missionList;
						$newEdit = $scope.mission_edit;
						for (var i = $edit.length - 1; i >= 0; i--) {

							if ( $edit[i].id == $newEdit.id ){
								$scope.missionList[i].person_id = $scope.mission_edit.person_id;
								$scope.missionList[i] 			= $scope.mission_edit;
								break;
							}

						};
						setTimeout($scope.close, 500);
						
						$scope.refreshRadio();

				});
			 
			}
			
		$scope.init();
		$scope.Linkify = function (inputText) {
			if (inputText) {
				var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
				var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
				var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
				var replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
				var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
				var replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
				return $sce.trustAsHtml(replacedText);
			}
		}
	});