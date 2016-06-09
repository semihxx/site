;appCRM.controller('projectsListController', function($scope, $sce, $stateParams,  Project, personalID) {
		/*
			name 			: 'main.project-list',
			url         	: '/project/list/:state_id',
			templateUrl   	: 'templates/project/project.list.html',
			controller    	: 'projects_listController',
		*/

		$scope.state_id = $stateParams.state_id;
		$scope.personalID = personalID;
		$scope.searchProject = "";
		var title = $scope.state_id == 0 ? "Devam Eden Projeler" : 
					($scope.state_id == 1 ? "Tamamlanan Projeler" : "Projelerim");
		$scope.Pages.banner = {
			title 	: title,
			desc	: "çalışmalarımız ve yönetimi",
			thumbcrumb : {
				state  : "main.project-list",
				text   : title
			}
		};
		$scope.companyName = "";
		window.editableProject = false;
		$scope.personalID = personalID;
		$scope.duzenle = function(){
			window.editableProject = true; 
		}
		
		$scope.init = function(){
			$scope.getProject();
		};
		
		$scope.sortableOptions = {
			cancel: '.no-sort',
			stop: function(e, ui) {
				var item 	= ui.item[0];
				var after 	= item.nextElementSibling;
				after 		= after ? after.getAttribute("data-id") : 0;
				var before 	= item.previousElementSibling;
				before 		= before ? before.getAttribute("data-id") : 0;
				var current = item.getAttribute("data-id");
				Project.sort( {current:current, before:before, after:after} );
			}
		};
		
		$scope.getProject = function(){
			Project.get($scope.state_id).then(function(data){
				$scope.projectList = data;
			});
		};

		
		$scope.complete = function(id){
			Project
				.state(id)
				.then(function(data){
					$scope.projectList = data;
			});
		}
		$scope.priority_project = function(project){
			var list = $scope.projectList;
			project.priority = project.priority==1?0:1;
			for (var i = list.length - 1; i >= 0; i--) {
				if (project.id == list[i].id){
					$scope.projectList[i].priority = project.priority+"";
					break;
				}
			};
			Project.priority(project);
		}

		
		$scope.init();
	});