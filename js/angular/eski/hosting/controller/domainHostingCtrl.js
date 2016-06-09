;appCRM.filter('split', function() {
		return function(input, splitChar, splitIndex) {
	    	return input.split(splitChar)[splitIndex];
	    }
	})
	.controller('domainHostingController', function($scope, $stateParams, Domainhosting, Project, Customer) {
		
		$scope.Durum 		= "";
		$scope.durumClass 	= "";
		$scope.new 			= { hosting_firma:"Markum", platform:"Windows" };
		$scope.search 		= {};
		$scope.newTemplate 	= {};

		var objDurum = {
			"warning" 	: "Lüften Bekleyiniz...",
			"success" 	: "Bilgileriniz başarılı bir şekilde kaydedilmiştir.",
			"danger"	: "Kaydetme esnasında bir hata oluştu."
		}

		$scope.getProject = function(){
			Project
				.get("all")
				.then(function(data){
					$scope.projectList = data;

				});
		};

		$scope.durumAyarla = function(durum){
			$scope.durumClass = durum;
			$scope.Durum = objDurum[durum];
		}

		$scope.durumAyarla("");
		$scope.txtDateSkip = "1";

		$scope.atlat = function(hosting){
			hosting.hosting_bitis = moment(hosting.hosting_bitis,"YYYY-MM-DD").add("years",hosting.txtDateSkip).format("YYYY-MM-DD");
			
			Domainhosting
				.update(hosting)
				.then(function(){
					for (var i = $scope.domainHostingList.length - 1; i >= 0; i--) {
						if( hosting.id == $scope.domainHostingList[i].id ) {
							var $listItem 		= $scope.domainHostingList[i];
							$listItem			= hosting;
							$listItem.bl_kalan 	= $scope.control30($listItem.hosting_bitis);
							$listItem.kalan 	= $scope.subDate($listItem.hosting_bitis);
						}
					};
				});
		}
		$scope.stopBubling = function($event){
			if ($event.stopPropagation) $event.stopPropagation();
		}

		$scope.init = function(){
			$scope.getDomainHosting();
			setTimeout($scope.getProject,1000);
		};
			$scope.totalDisplayed = 20;

			$scope.loadMore = function () {
			  $scope.totalDisplayed += 20;  
			};
	
		$scope.getDomainHosting = function(){
			Domainhosting
				.get()
				.then(function(data){
					$scope.domainHostingList = data;
				});
		};
		$scope.getLastDomainHosting = function(){
			Domainhosting
				.getEnd()
				.then(function(data){
					$scope.domainHostingEndList = data;
				});
		};
		$scope.saveDomain = function(){
			$scope.durumAyarla("warning");
			Domainhosting
				.save($scope.new)
				.then(function(data){
					$scope.domainHostingList = data;
					$scope.durumAyarla("success");
			});
		}
		$scope.generateEndDateHosting = function() {
			$scope
				.new
				.hosting_bitis 
			= moment($scope.new.hosting_baslangic,"YYYY-MM-DD")
				.add(1, 'year')
				.format("YYYY-MM-DD");
		}
		

		$scope.dateFormat = function(date){
			return moment(date,"YYYY-MM-DD").format("DD-MM-YYYY");
		}
		$scope.$watchCollection('domainHostingList', function (newItems) {
			for (var i = 0; i < newItems.length; i++) {
				newItems[i].bl_kalan = $scope.control30(newItems[i].hosting_bitis);
				newItems[i].kalan = $scope.subDate(newItems[i].hosting_bitis);
			}
			$scope.domainHostingList = newItems;
		});
		var kalan = {};
		$scope.subDate = function(end){
			var d1 		= moment(moment(),"YYYY-MM-DD");
			var d2 		= moment(end,"YYYY-MM-DD");
			kalan[end] 	= kalan[end] || moment.duration(d2.diff(d1)).asDays();
			return Math.ceil(kalan[end]);
		};

		$scope.control30 = function(end){
			var d1 		= moment(moment(),"YYYY-MM-DD");
			var d2 		= moment(end,"YYYY-MM-DD");
			kalan[end] 	= kalan[end] || moment.duration(d2.diff(d1)).asDays();
			return Math.ceil(kalan[end]) <= 30 ? true : false;
		}

		$scope.delete = function(id){
			Domainhosting
				.delete(id)
				.then(function(data){
					$scope.domainHostingList = data;
				});
		}
		
		$scope.selectedCustomer = '';
		var sayac 				= 0;
		$scope.customerList 	= [];
		function IsNumeric(input){
			var RE = /^-{0,1}\d*\.{0,1}\d+$/;
			return (RE.test(input));
		}
		$scope.getCustomer = function(viewValue) {
		    if (IsNumeric(viewValue)){
				Customer
					.get(parseInt(viewValue))
					.then(function(data){
						$scope.customerList 	= data;
						$("#customerdata").val(data[0].company);
					});
			} else {
				Customer
					.search(viewValue)
					.then(function(data){
						$scope.customerList = data;
					});
					sayac = 0;
			}
			return $scope.customerList;
		};
		
		
		$scope.init();

	})
	.controller('domainHostingAltController', function($scope, $location, $timeout, $stateParams, Domainhosting) {

		var id = parseInt($stateParams.id);
		$scope.edit = {};
		$scope.getDomain = function(){
			Domainhosting
				.get(id)
				.then(function(data){
					$scope.edit = data;
					
				});

		}
			
		$scope.update = function(edit){
			Domainhosting
				.update(edit)
				.then(function(){
					for (var i = $scope.domainHostingList.length - 1; i >= 0; i--) {
						if( edit.id == $scope.domainHostingList[i].id )
							$scope.domainHostingList[i] = edit;
					};
					$scope.durumAyarla("success");
					$timeout(function(){
						$location.path("/hosting", false);
					}, 500);
				});

		}
		
		$scope.getDomain();

	});