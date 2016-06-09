;appCRM.controller('sorularController', function($scope, $stateParams, WebService) {
	
	var no = 0;
	function range(start, count) {
      return Array.apply(0, Array(count))
        .map(function (element, index) { 
          return {};  
      });
    }
	$scope.cevaplar = range(0,10);

	/*WebService.get("sorular/" + 1, "", 100)
		.then(function(data){
			$scope.sorular = data;
			$scope.git(0);
		});*/
	
	$scope.btnIsaretle = function ($event, isaret) 
	{
		if ( !$scope.cevaplar[no].isaret )
		{
			$scope.cevaplar[no].isaret = isaret;
			isaretle($event.target, $scope.soru.dogru, isaret);
		}
	}

	var isaretle = function (elem, dogru, cevap) {
		var elem = angular.element(elem);
		var edogru = angular.element("#secenekler ." + dogru);

		var isaret = dogru == cevap ? "dogru" : "yanlis";
		$scope.cevaplar[no].sonuc = isaret;

		elem.addClass(isaret);
		edogru.addClass("dogru");
	}

	var kontrol = function () {
		var cevap = $scope.cevaplar[no].isaret;
		angular.element("#secenekler li").removeClass("yanlis dogru");

		cevap && isaretle("#secenekler ." + cevap, $scope.soru.dogru, cevap);
	}
	$scope.ileri = function () 
	{
		no = no < 9 ? ++no : 0;
		$scope.git(no);
	}

	$scope.geri = function () 
	{
		no = no > 0 ? --no : 9;
		$scope.git(no);
	}

	$scope.git = function ($index) 
	{
		no = $index;
		$scope.sayac = no; 

		var sonuc = $scope.cevaplar[no].sonuc;
		$scope.cevaplar[no].sonuc = sonuc ? sonuc : 'beklemede';
		$scope.soru = $scope.sorular[no];
		kontrol();
	}
	//
	$scope.sorular = data;
	$scope.git(0);
	//
});
