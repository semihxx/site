;appCRM.controller('domainController', function($scope, $stateParams, Whois) {

		$scope.whoisLoading 	= false;
		$scope.whoisLoaded 		= true;
		$scope.whoisUnLoaded 	= true;

		var domain 				= $stateParams.domain;
		$scope.whoisDomain 		= domain;

		Whois
			.get(domain)
			.then(function(data){

				if (!data.ErrorMessage){

					$scope.whoisLoading 	= true;
					$scope.whoisLoaded 		= false;
					$scope.domainDetail 	= data;

				}else{

					$scope.whoisLoading 	= true;
					$scope.whoisUnLoaded 	= false;
				}

			});

	})
	.controller('dashboardController', function($scope, $stateParams, $location, Whois, Mission, Dashboard, Project, personalID) {
			$scope.Pages.banner = {
				title 	: "Gösterge Paneli",
				desc	: "istatistik ve daha fazlası",
				thumbcrumb : {
					state  : "main.home",
					text   : "Gösterge Paneli"
				}
			};
			$scope.pageviews 	= 0;
			$scope.sessions 	= 0;
			$scope.bounceRate 	= 0;
			$scope.avgSessionDuration = 0;
			$scope.color 	= "f89f9f";
			$scope.start 	= moment().subtract('days', 0).format('YYYY-MM-DD');
			$scope.end 		= moment().format('YYYY-MM-DD');
			$scope.fark		= "day";
			$scope.loading 	= true;
			$scope.search = {};
			$scope.searchFilter = {};
			Project
				.personal(personalID)
				.then(function(data){
					$scope.projectList = data;
				});

			$scope.whois = function(){
				if ($scope.whoisDomain)
					$location.path("/home/whois/"+ $scope.whoisDomain);
			}

			$scope.getProject = function(){
				Project
					.get(0)
					.then(function(data){
						$scope.cprojectList = data;
						
					});
			};
			$scope.getProject();

			
			var getIstatistik = function(){
				$scope.loading 	= true;
				Dashboard
					.get()
					.then(function(data){
						$scope.loading 				= false;
						$scope.pageviews 			= data["sonDomain"];
						$scope.sessions 			= data["musteri"];
						$scope.bounceRate 			= data["proje"];
						$scope.avgSessionDuration 	= data["gorev"];
						$scope.biten 				= data["bitti"];

					});
			}

			$scope.getterObj = {
					start: $scope.start, 
					end: $scope.end, 
					fark: $scope.fark, 
					color: $scope.color,
					ulke: $scope.ulke
			};
			
			var refreshObj = function(){
				
				$scope.getterObj = {
					start: $scope.start, 
					end: $scope.end, 
					fark: $scope.fark, 
					color: $scope.color
				};
			}


			getIstatistik( $scope.getterObj );

		
			$scope.dateRefresh = function(start, end){
				var fark = end.diff(start,'days') + 1;
				$scope.fark = "date";

				if ( fark == 1 ){
					$scope.fark = "hour";
				}else if ( fark > 7 ){
					$scope.fark = "day";
				}else if ( fark > 31 ){
					$scope.fark = "month";
				}else if ( fark > 365 ){
					$scope.fark = "year";
				}
				$scope.start 	= start.format('YYYY-MM-DD');
				$scope.end 		= end.format('YYYY-MM-DD');

				refreshObj();
				getIstatistik( $scope.getterObj );
				
			}
			
			$scope.missionObj = {
				get: function(){
					Mission
						.personal
						.get(personalID)
						.then(function(data){
							$scope.missionList = data;
							$scope.refreshRadio();
						});
				},
				delete: function(deleted_id){
					Mission
						.personal
						.delete(deleted_id, personalID)
						.then(function(data){
							$scope.missionList = data;
						});
				},
				update: function(mission, name){
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
					.update(mission);

				},
			};
			
			$scope.$watchCollection('missionList', function (newItems) {
				var len = angular.isUndefined(newItems) ? 0 : newItems.length;
				for (var i = 0; i < len; i++) {
					newItems[i].id = parseInt(newItems[i].id);
				}
				$scope.missionList = newItems;
			});
			$scope.missionObj.get();


		});