;appCRM.controller('mainController', function($scope, $rootScope, Timer) {
		$scope.Pages =  {};
		$scope.Pages.buttons = {};		
		$scope.Pages.buttons.filter = false;

		$scope.Pages.banner = {
			title 	: "",
			desc	: "",
			thumbcrumb : {
				link   : "",
				text   : ""
			}
		};
		
		Timer.init();

		$scope.refreshRadio = function(){
			setTimeout(function(){
				var ae = angular.element;
				ae(".radioCheck").uniform();
				ae("table").on('change', '.radioCheck', function () {
					ae(this).parents('tr').toggleClass("active");
				});
			}, 0);
		}
		var objDurum = {
			"warning" 	: "Lütfen Bekleyiniz...",
			"success" 	: "Bilgileriniz başarılı bir şekilde kaydedilmiştir.",
			"danger"	: "Kaydetme esnasında bir hata oluştu."
		}
		$scope.durumClass = "";
		$scope.Durum = "";
		$scope.durumAyarla = function(durum){
			$scope.durumClass = durum;
			$scope.Durum = objDurum[durum];
		}
		Array.prototype.remove = function(from, to) {
		  var rest = this.slice((to || from) + 1 || this.length);
		  this.length = from < 0 ? this.length + from : from;
		  return this.push.apply(this, rest);
		};
	})
	.controller('timelineCountController', function($scope, TimerPeriod, Timeline, Timer) {
		$scope.timelineListCount  = 0;
    	$scope.show.timeline = false;
    
		Timer.fnAdd({
			fn: 			function(){
								Timeline
									.getCount()
									.then(function(data){
						    			$scope.show.timeline = true;
										$scope.timelineListCount = data;
									});
							}, 
			start: 			1000, 
			frekans: 		60000, 
			allPageRepeat : true
		});
		
	})
	.controller('timelineController', function($scope, $rootScope, $stateParams, TimerPeriod, Timeline, Timer) {
		$scope.renderer = false;
    	
 		$scope.$on('clickTimeline', function() {$scope.renderer = !$scope.renderer; });

		$scope.duyurular 		 = [];
    	$scope.mailLen 	 		 = 0;
		$scope.person_state 	 = {};
		$scope.date 			 = ""; 
		$scope.lim 				 = 25;
		$scope.timelineSearch 	 = "";
		$scope.timelineList 	= [];
		$scope.timelineListCount = 0;
		$scope.loadingTimeLine 	 = false;
    	$scope.show = {};
		var el = $(".tab-content");

		$scope.getTimeLine = function(){
			$scope.loadingTimeLine = true;
			Metronic.blockUI({target: el, iconOnly: true});
			Timeline
				.get()
				.then(function(data){
                    Metronic.unblockUI(el);
					
					$scope.timelineList = data;
					for (var i = $scope.timelineList.length - 1; i >= 0; i--) {
						$scope.timelineList[i].image = $scope.timelineList[i].pid +"-img.jpg";
					};

					$scope.dateTimeLine();
				});
		}
		Timer.fnAdd($scope.getTimeLine, 4000, 60000, true);
		
		$scope.dateTimeLine = function(){
			var scopeDate;
			for (var i = 0; i < $scope.timelineList.length ; i++) {			
				scopeDate = $scope.timelineList[i].updated_at;
				$scope.timelineList[i].hour = moment(scopeDate, "YYYY-MM-DD hh:mm:ss").format("HH:mm:ss")

				var date = moment(scopeDate, "YYYY-MM-DD hh:mm:ss").format("DD MMMM YYYY dddd");
				if ($scope.date != date) {
					$scope.date = date;
					$scope.timelineList[i].day = "<div class='timeline-date'>"+date+"</div>";
				}

			};
		}
		

	})
	.controller('pageController', function($scope, $location) {
		
    	$scope.isActive = function(route) {
			var path = $location.path().split('/');
			var path2;
			var state;

			if (path.length > 2){
				var path2 = $location.path().split('/')[1];
				var path3 = $location.path().split('/')[2];
				state = (route === path2);
			}
			else state = (route === path[1]);
			return state ;
    	}

	})

	
	.controller('topPageController', function($scope, $rootScope, $timeout, $stateParams, Personal, JsonPersonal, Ticket, Calendar, Timer) {
		$scope.duyurular = [];
		$scope.tickets  = [];
    	$scope.mailLen 	 = 0;
		$scope.person_state = {};
    	$scope.person_state.online = 0;

		$scope.renderTimeline = function(){
    		$rootScope.$broadcast('clickTimeline');
    	};

    	$scope.show = {
    		ticket: 	false,
    		calendar: 	false,
    		person: 	false,
    		error: 		false,
    	};

    	Timer.fnAdd({
    		fn: function(){ // TODO timer her çalıştığında sayı yazan yerde loading dönmeli!
	    		Ticket
	    			.get(undefined, 5)
	    			.then(function(data){
	    				$scope.tickets 	= data;
	    				$scope.show.ticket = true;
	    			});
    		}, start: 1800, frekans: 60000, allPageRepeat: false
    	});

		$scope.person_state.online = [];
    	Timer.fnAdd({fn:function(){
    		Personal
    			.getOnline()
    			.then(function(data){
    				$scope.show.person = true;
    				$scope.person_state.online 	= data.online;
    				$scope.person_state.waiting = data.waiting;
    				for (var i = data.online.length - 1; i >= 0; i--) {
						data.online[i].image = data.online[i].id +"-img.jpg";
					};
					for (var i = data.waiting.length - 1; i >= 0; i--) {
						data.waiting[i].image = data.waiting[i].id +"-img.jpg";
					};

    			});
    	}, start: 1500, frekans: 60000, allPageRepeat: true});

		$scope.takvimler = [];
		$scope.duyurular = window.panelDuyuru ;
		$scope.getTakvim = function(){
			
			Calendar
				.get()
				.then(function(data){
					$scope.takvimler = data;
					var datas = $scope.takvimler;
					var count = 1;

    				$scope.show.calendar = true;

					for (var i = datas.length - 1; i >= 0; i--) {
							
							var data = datas[i];
							count *= 2;
		                	(function(){

		                		var countx 	 = count;
		                		var id 	 = data.id;
		                		var baslik 	 = data.title;
		                		var aciklama = data.desc == undefined || data.desc == "" ? " " : data.desc;
		                		var resim 	= "images/logo.jpg";
		                		var link 	 = "#";
									$timeout(function () {
										Index.initIntro(id, baslik, aciklama, link, resim);
			                		}, 1000*countx);

		                	})();

					};

				});
		}
		$timeout( $scope.getTakvim, 1200 );
    	
		$scope.profile = [];
   		$scope.getProfile = function(){
			var json = JsonPersonal;
			Personal
				.select("id", "name")
				.get(localStorage.user_id)
				.then(function(data){
					$scope.profile = data;
					$scope.profile.image = data.id + "-img.jpg";
				});
		}
		$scope.getProfile();

	});