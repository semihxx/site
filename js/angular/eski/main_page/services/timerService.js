appCRM.factory('Timer', function($rootScope, $interval, $timeout, TimerPeriod) {

		return {
			fnArr: {},
			init: function(){
				$fnArr = this.fnArr;

				len = $fnArr.length || 1;
				$rootScope.$on('$stateChangeSuccess', 
					function(event, toState, toParams, fromState, fromParams){ 
						for (var i = len - 1; i >= 0; i--) {
							if ($fnArr[i]["allPageRepeat"] === false){
								$interval.cancel($fnArr[i]);
							}
						};
					});
			},
			fnAdd: function( obj ){ // aynı sayfa açıldığına ikinci kayıt engellenecek unutma!!
				$fnArr = this.fnArr;
				var len = $fnArr.length || 0;
				$fnArr[len] = $interval(obj.fn, obj.frekans * TimerPeriod);
				$fnArr[len]["allPageRepeat"] = obj.allPageRepeat;
				$timeout(obj.fn, obj.start);
			}
		}

	});