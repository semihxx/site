;appCRM.controller('projectController', function ($scope, $stateParams, Project, Mission, Customer, JsonPersonal) {
		/*
			name		: main.project
			abstract    : true,
            templateUrl : 'templates/project/project.tabs.html',
	        url         : '/project/:state_id'
        */
        
		$scope.settings = {};
		$scope.tab_state = false;

		$scope.state_id = $stateParams.state_id;
	    $scope.init = function () {
	       // $scope.getProject();
	       $scope.getPersonal();

	    };

	    if (window.editableProject == true) {
	        window.editableProject = false;
	        $(".tabproject a").click();
	    }
	    $scope.getPersonal = function () {
	       $scope.personalList = JsonPersonal;
	    };
	    
	    $scope.getProject = function () {
	        Project
				.get($stateParams.state_id, $scope.settings.id)
				.then(function (data) {
					$scope.getCustomerName(data.liste[0].customerID);
					$scope.customerID = data.liste[0].customerID;
				    $scope.edit = data.liste[0];
				    $scope.edit.selectedGroups = [];
				    var selected = data.selected;
				    for (var i = selected.length - 1; i >= 0; i--) {
				        $scope.edit.selectedGroups.push(selected[i].group_id);
				    };

				    var person = JsonPersonal;
				    var edit = $scope.edit;
				    var len = person.length;
				    for (var i = len - 1; i >= 0; i--) {
				    	if (person[i]["id"] == edit["person_id"]) edit.person = person[i]["name"];
				    };

				    $scope.Pages.banner = {
						title 	: data.liste[0].name,
						desc	: "yaptıklarımız ve yapacaklarımız",
						thumbcrumb : {
							state  : "main.home",
							text   : data.liste[0].name
						}
					};
				});
	    };
		   		
	    $scope.customerList = [];
		$scope.getCustomerName = function(viewValue) {
			function IsNumeric(input) {
		        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
		        return (RE.test(input));
		    }
			if (IsNumeric(viewValue)) {
	            Customer
                    .get(parseInt(viewValue))
                    .then(function (data) {

                        setTimeout(function () {
                            $scope.$apply(function () {
                            	console.log(data.name);
                                $scope.$parent.company_state = data.name || data.company;
                                $scope.$parent.customer = data;

                            });
                        }, 20);
                        angular.element("#customerdata").val(data.company);

                    });
	        } else {
				Customer
					.select("id", "name", "company")
					.search(viewValue)
					.then(function(data){
						$scope.customerList = data;
					});
				sayac = 0;

			   return $.map($scope.customerList, function(customer) {
			   		angular.element("#customerdata").blur();
			   		angular.element("#customerdata").focus();
			    	return customer;
			   });
			}
		}

	    $scope.refreshRadio = function(){
			setTimeout(function(){
				$(".radioCheck").uniform();
				$("table").on('change', '.radioCheck', function () {
					$(this).parents('tr').toggleClass("active");
				});
			}, 0);
		}

	    $scope.duzenle 	= function(){}
	    $scope.complete = function(id){}
	    $scope.priority_project = function(){}
	    $scope.init();


	});

	