;appCRM.controller('customerController', function($scope, $stateParams, Customer) {
		$scope.Pages.banner = {
			title 	: "Müşteriler",
			desc	: "çalıştıklarımız ve çalışacaklarımız",
			thumbcrumb : {
				state  : "main.customer",
				text   : "Müşteriler"
			}
		};
		$scope.Durum 		= "";
		$scope.durumClass 	= "";
		$scope.new 			= {};
		$scope.customer 	= {};
		$scope.newsector 	= {};
		$scope.newtype 		= {};
		$scope.customer.search = "";
		var page = 1;
		
		$scope.getPage = function(page){

			var el = $(".task-content");
			Metronic.blockUI({target: el, iconOnly: true});

			Customer
				.select("id", "company", "name", "phone", "mobile", "email")
				.getpager(page)
				.then(function(data){

					$scope.customerLists 	 = data.data;
					$scope.customerCurrent 	 = data.current_page;
					$scope.customerLast_page = new Array(data.last_page);
					customerListBackup 		 = data.data;
					Metronic.unblockUI(el);
					
				});
		}

		
		$scope.durumAyarla2 = function(durum){
			$scope.durumClass2 = durum;
		}

		$scope.durumAyarla("");
		$scope.durumAyarla2("");

		$scope.init = function(){
			$scope.getPage(1);
			$scope.getCustomerPending();
		};
		
		
		$scope.pwdDurum2 = "";
		
		$scope.onayla = function(customer, i, pwd, reset){
			pwd 	= pwd 	=== "0" ?  false : true;
			reset 	= reset === "0" ?  false : true;

			customer.state = 1;
			$scope.pwdDurum2 = "Lütfen Bekleyiniz...";
			$scope.durumAyarla2("warning");
			Customer
				.update(customer, pwd, reset)
				.then(function(data) {

					$scope.pwdDurum2 = "İşleminiz başarı ile gerçekleştirildi.";
					$scope.durumAyarla2("success");

					if ( i != "onayli" ){
						setTimeout(function(){
							$scope.$apply(function () {
								$scope.customerLists.push(customer);
							});
						}, 0);
						
						$scope.customerOnayList.remove(i);
					}
				});
		}

		$scope.$watch('customer.search', function() {
			var search = $scope.customer.search;
			if (search){
	       		Customer
					.select("id", "company", "name", "phone", "mobile", "email")
					.search($scope.customer.search)
					.then(function(data){
						$scope.customerLists = data;
					});

			} else $scope.customerLists = customerListBackup;
	   	});

	   	var customerListBackup = "";

		$scope.getCustomerPending = function(){

			Customer
				.getPending()
				.then(function(data){
					$scope.customerOnayList = data;
				});

		};

		$scope.findAndRun = function(arr, prop, val, callback){
			var len = arr.length;

			for (var i = len - 1; i >= 0; i--) 
				if (arr[i][prop] == val ) callback(i);

		}

		$scope.delete = function(id){
			Customer
				.delete(id)
				.then(function(){

					$scope.findAndRun($scope.customerLists, "id", id, $scope.customerLists.remove );
					$scope.findAndRun($scope.customerOnayList, "id", id, $scope.customerOnayList.remove );

				});
		}
		
		var clear = function(){
			angular.forEach($scope.new, function(value, key){
				this[key] = "";
			});
		}

		$scope.clear = clear;
		clear();

		$scope.init();

	});
	