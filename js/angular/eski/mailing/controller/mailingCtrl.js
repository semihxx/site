;appCRM.controller('mailingController', function($scope, $stateParams, $timeout, Mailing, Template, Domainhosting, Personal, Customer) {
		
		$scope.mailing = {};
		$scope.mailing.name = "";

		$scope.saveCategory = function(){
			Mailing
				.saveCategory($scope.mailing)
				.then(function (data) {
					$scope.categoryList = data;
				});
		}
		$scope.getCategory = function(){
			Mailing
				.getCategory()
				.then(function(data){
					$scope.categoryList = data;
				});
		};

		/*Add E-Mail*/
		$scope.setupList = {};

		$scope.getListe = function(kid){
			if (!$scope.setupList["liste"]) $scope.setupList["liste"] = {};
			if (!$scope.setupList["liste"][kid])
				Mailing
					.getEMail(kid)
					.then(function(data){
						$scope.setupList["liste"][kid] = data;
						$scope.refreshRadio();
					});
			else {
				delete $scope.setupList["liste"][kid];
				console.log($scope.setupList["liste"].length,$scope.setupList["liste"]);
				if ($scope.setupList["liste"].length==0) delete $scope.setupList["liste"];
			}
		};
		$scope.getDomain30 = function(){

			if (!$scope.setupList["domain"])
				Domainhosting
					.getEnd()
					.then(function(data){
						$scope.setupList["domain"] = data;
						$scope.refreshRadio();
					});
			else delete $scope.setupList["domain"];
		};
		$scope.getPersonal = function(kid){

			if (!$scope.setupList["personal"])
				Personal
					.get()
					.then(function(data){
						$scope.setupList["personal"] = data;
						$scope.refreshRadio();
					});
			else delete $scope.setupList["personal"];

		};
		$scope.getMusteriler = function(kid){

			if (!$scope.setupList["musteriler"])
				Customer
					.get()
					.then(function(data){
						$scope.setupList["musteriler"] = data;
						$scope.refreshRadio();
					});
			else delete $scope.setupList["musteriler"];

		};
		

/*End E-mail adder*/

		$scope.init = function(){
			$scope.getTemplate();
			$scope.getCategory();
		}
		
		$scope.generateEndDateHosting = function() {
			$scope
				.new
				.hosting_bitis 
			= moment($scope.new.hosting_baslangic,"YYYY-MM-DD")
				.add(1, 'year')
				.format("YYYY-MM-DD");
		}

		$scope.generateEndDateDomain = function() {
			$scope
				.new
				.domain_bitis 
			= moment($scope.new.domain_baslangic,"YYYY-MM-DD")
				.add(1, 'year')
				.format("YYYY-MM-DD");
		}

		$scope.dateFormat = function(date){
			return moment(date,"YYYY-MM-DD").format("DD-MM-YYYY");
		}
		$scope.selectedAll = {
			domain: 0,
			musteriler: 0,
			personal:0,
			liste:0
		};
 		$scope.selectedCheckbox = {
 			domain: 	[],
 			musteriler: [],
 			liste: 		[],
 			personal: 	[],
 		};
 		$scope.selectedEmail 	= [];

 		$scope.checkAll = function(key){
 			$scope.selectedAll[key] = $scope.selectedAll[key] == 0 ? 1: 0;
 			for (var i = $(".chkAll"+key).length - 1; i >= 0; i--) {
 				$(".chkAll"+key)[i].checked = $scope.selectedAll[key];
 			};
 			$scope.refreshCheckArr(key);
 			$scope.refreshRadio();
 		}
 		$scope.refreshCheckArr = function(key){
 			console.log(key);
			$scope.selectedCheckbox = {
	 			'domain': 	[],
	 			'musteriler': [],
	 			'liste': 		[],
	 			'personal': 	[],
	 		};
			$scope.selectedEmail = [];

				for (var i = $(".chkAll").length - 1; i >= 0; i--) {
	 				if ($(".chkAll")[i].checked){
	 					$scope.selectedCheckbox[$($(".chkAll")[i]).data("key")].push( $($(".chkAll")[i]).data("id") );
	 					$scope.selectedEmail.push( $($(".chkAll")[i]).data("email") );
	 				}
	 			};

 			
 		}
 		$scope.refreshRadio = function(){
				setTimeout(function(){
					$(".radioCheck").uniform();
					$("table").on('change', '.radioCheck', function () {
						$(this).parents('tr').toggleClass("active");
					});
				},0);
			}
		$scope.subDate = function(start, end){
			var d1 		= moment(moment(),"YYYY-MM-DD");
			var d2 		= moment(end,"YYYY-MM-DD");
			var days 	= moment.duration(d2.diff(d1)).asDays();
			return Math.ceil(days);
		};

		
		$scope.getTemplate = function(){
			Template
				.get()
				.then(function(data){
					$scope.templateList = data;
				});
		};
$scope.temp = 0;
		$scope.getTemplateContent = function(id){
			Template
				.get(id)
				.then(function(data){
					$scope.temp = 1;
					$("#temp").contents().find("body").html(data[0].content);
				});
		};

		$scope.addTemplate = function(){
			Template
				.save( $scope.newTemplate.name )
				.then(function(data){
					$scope.templateList = data;
				});
			return false;
		};

		$scope.deleteTemplate = function(id){
			Template
				.delete(id)
				.then(function(data){
					$scope.templateList = data;
				});
		};
		$scope.gonderim = "Mail Gönder...";
		$scope.selectedTemplate = {};
		$scope.mailing.subject = "";
		$scope.sendTemplate = function(id){
			console.log( $scope.selectedCheckbox, $scope.selectedCheckbox.length);
			if ($scope.mailing.subject != ""){
				$scope.gonderim = "Lütfen Bekleyiniz, İşlem biraz uzun sürebilir...";

				var senderFn = function(obj, i, len, index){
					var objj = obj;
					var ii = i;
					var lenn = len;
					var indexx = index;
					return function(){
						$scope.statesend[ii].state = '1';
						var o = {};
						o[indexx] = objj;
						Template
							.sendMail( 
								$scope.selectedTemplate.id, 
								o, 
								$scope.mailing.subject 
							).then(function(data){
								$scope.statesend[ii].state = '2';
								if ( ii+1 == lenn )
									$scope.gonderim = "Mail Gönderimi Tamamlandı...";
							})
							.error(function(data, status, headers, config) {
								$scope.statesend[ii].state = '3';
								if ( ii+1 == lenn )
									$scope.gonderim = "Mail Gönderimi Tamamlandı...";
							  });
						}
				}
				$.each($scope.selectedCheckbox, function(index, value) {
					var len = $scope.selectedCheckbox[index].length;
					for ( var i = 0 ; i < len; i++) {
						console.log(i,"repeat");
						setTimeout(senderFn($scope.selectedCheckbox[index][i], i, len, index), 2000*i);
					};
				}); 
				
	 			
			}else{
				$scope.gonderim = "Mail Konusunu Giriniz!";
				
			}
 		}

 		$scope.init();
	})
	.controller('mailListeController', function($scope, $stateParams, Mailing ) {
		$scope.mailingList = {};
		$scope.mailingList.email = "";
		var kid = parseInt($stateParams.listeid);

		$scope.getCategory = function(){
			Mailing
				.getEMail(kid)
				.then(function(data){
					$scope.emailList = data;
				});
		};
		$scope.saveEmail = function(){
			$scope.mailingList.kid = kid;
			Mailing
				.saveEMail($scope.mailingList)
				.then(function (data) {
					$scope.emailList = data;
				});
		}
		$scope.delete = function(id){
			Mailing
				.deleteEMail(id,kid)
				.then(function (data) {
					$scope.emailList = data;
				});
		}

		$scope.getCategory();
	});