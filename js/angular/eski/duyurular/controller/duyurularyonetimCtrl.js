;appCRM.controller('duyurularyonetimController', function($scope, DuyurularYonetim) {
		$scope.islem = "Kaydet";
		$scope.selectedPage = '';
	    $scope.selectedPages = ['Web'];
	    $scope.modulpages = [
	      {value: 'Web', label: 'Web '},
	      {value: 'Seo', label: 'Seo'},
	      {value: 'Android', label: 'Android'},
	      {value: 'Mobil', label: 'Mobil'},
	      {value: 'Genel', label: 'Genel'},
	      {value: 'Sosyal Medya', label: 'Sosyal Medya'}
	    ];

	    $scope.colorLink = [];
		$scope.colorLinks = [
	      {value: 'warning', label: '<span class="label label-sm label-icon label-warning">Sarı</span>'},
	      {value: 'success', label: '<span class="label label-sm label-icon label-success">Yeşil</span>'},
	      {value: 'default', label: '<span class="label label-sm label-icon label-default">Gri</span>'}
	    ];

	    var objDurum = {
			"warning" 	: "Lüften Bekleyiniz...",
			"success" 	: "Bilgileriniz başarılı bir şekilde kaydedilmiştir.",
			"danger"	: "Kaydetme esnasında bir hata oluştu."
		}

		$scope.durumAyarla = function(durum){
			$scope.durumClass = durum;
			$scope.Durum = objDurum[durum];
		}
		$scope.durumAyarla("");


	    $(".simplelineicons-demo .item-box").click(function(){
	      var $this = $(this);
	      $scope.icon = $this.find("span i").attr("class");

	      $(".item-box .item").removeClass("item-active");
	      $this.children("span").addClass("item-active");

	    });

	    $scope.panelList = window.panelDuyurularYonetim;


	    $scope.modulEkle = function(){
		    var baslik  = $scope.adi != undefined ? $scope.adi : "";
		    var aciklama= $scope.aciklama != undefined ? $scope.aciklama : "";
		    var tur  	= $scope.selectedPages != undefined ? $scope.selectedPages : "";
		    var link  	= $scope.link != undefined ? $scope.link : "";
		    var yazi  	= $scope.yazi != undefined ? $scope.yazi : "";
		    var renk  	= $scope.colorLink != undefined ? $scope.colorLink : "";
		    var onem  	= $scope.onem != undefined ? $scope.onem : "";
		    var icon 	= $scope.icon != undefined ? $scope.icon : "";
			
			$scope.durumAyarla("warning");

			var json = '{"baslik": "'+baslik+'","aciklama": "'+aciklama+'","tarih"	: "'+ moment(new Date()).format('MM/DD/YYYY') +'","tip"	: "'+tur+'","icon"	: "'+icon+'","oncelik" : "'+onem+'","button": {"label": "'+renk+'","text" : "'+yazi+'","link" : "'+link+'"}}';
	        if ($scope.islem == "Kaydet"){
		        DuyurularYonetim
		        	.save({ data: json, modul: $scope.adi })
		        	.then(function( data ){
						$scope.durumAyarla("success");
	          			$scope.updateModuls(data);
		        	});
	      	}else{
	      		DuyurularYonetim
		        	.update({ data: json, modul: $scope.adi, id: $scope.id })
		        	.then(function( data ){
						$scope.durumAyarla("success");
	          			$scope.updateModuls(data);
		        	});
	      	}

	    }
	    $scope.updateModuls = function(data){
			$scope.panelList = data;
		        window.panelDuyurularYonetim = data;
		        var scope = angular.element($("#pageCtrl")).scope();

			    setTimeout(
			        function(){
			            scope.$apply(function(){
			            	scope.pageModul  = data;
			        	})
			    	}, 
			    0);
	    }
	      $scope.delete = function(id){

	      	DuyurularYonetim
	      		.delete(id)
	      		.then(function( data ){
	          		$scope.updateModuls(data);
	        	});

	      }

	      $scope.edit = function(id){
			$scope.islem = "Güncelle";

	      	DuyurularYonetim
	      		.get(id)
	      		.then(function(data1){

	      			window.panelDuyurularYonetim  = data1;
				var data = data1;
			    	$scope.id 	= data1.id;
			    	$scope.adi 	= data.baslik;
			   		$scope.aciklama = data.aciklama;
			   		if (data.button){
				    	$scope.link = data.button.link;
				    	$scope.yazi = data.button.text;
			    		$scope.colorLink = data.button.label;
			    	}
			    	$scope.onem = data.oncelik;
			    	$scope.icon = data.icon;

			    	if (data.tip){
				    	var depencyPage = data.tip.split(",");
		    			$scope.selectedPages = [];
		      			for (var i = depencyPage.length - 1; i >= 0; i--) {
		    				$scope.selectedPages.push(depencyPage[i]);
		      			}
					}
	      		});
	      }


	});