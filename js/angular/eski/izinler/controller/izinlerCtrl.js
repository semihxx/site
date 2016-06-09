;appCRM.controller('izinlerController', function($scope, $stateParams, $timeout, Izinler) {
		
		$scope.Durum 		= "";
		$scope.durumClass 	= "";
		$scope.new 			= {};
		$scope.yeniizin 		= {};
		$scope.selectedPage = '';
	    $scope.izinler = [
	      {value: '100000000', label: 'Personel'},
	      {value: '010000000', label: 'Projeler'},
	      {value: '001000000', label: 'Duyurular'},
	      {value: '000100000', label: 'Domainler'},
	      {value: '000010000', label: 'Müşteriler'},
	      {value: '000001000', label: 'Ticket'},
	      {value: '000000100', label: 'Mailing'},
	      {value: '000000010', label: 'Arama Kaydı'},
	      {value: '000000001', label: 'Demo Havuzu'},

	    ];
	    $scope.permissionModel = {};

	
		$scope.durum ={};

		$scope.btnGorevEkle = function(){
			Izinler
				.save({ 
					type 		: $scope.yeniizin.gorev,
					permissions : "000000000" 
				})
				.then(function(data){
					$scope.izinList = data;
					for (var i = 0; i < data.length ; i++) {
						$scope.permissionModel[i]=[];

						var arrData = data[i].permissions.split('');
						var tam = "00000000";
						var sifir = "";
						var arrIzin = [];
						for (var ii = 0; ii < arrData.length ; ii++) {
							if (parseInt(arrData[ii]))
								arrIzin.push( sifir + arrData[ii] + tam );
							tam = tam.substring(0, tam.length - 1);
							sifir +="0";
						};
						$scope.permissionModel[i] = arrIzin;
					};
				});
		}

		$scope.init = function(){
			$scope.getIzinler();
		};
		var refresh = function(data){
			$scope.izinList = data;
					for (var i = 0; i < data.length ; i++) {
						$scope.permissionModel[i]=[];

						var arrData = data[i].permissions.split('');
						var tam = "00000000";
						var sifir = "";
						var arrIzin = [];
						for (var ii = 0; ii < arrData.length ; ii++) {
							if (parseInt(arrData[ii]))
								arrIzin.push( sifir + arrData[ii] + tam );
							tam = tam.substring(0, tam.length - 1);
							sifir +="0";
						};
						$scope.permissionModel[i] = arrIzin;
					};
		}
		$scope.getIzinler = function(){
			Izinler
				.get()
				.then(function(data){
					refresh(data);
				});
		};
		
		
		$scope.delete = function(id){
			Izinler
				.delete(id)
				.then(function(data){
					refresh(data);
				});

		}
		$scope.update = function(index, id, type){

			var arr = $scope.permissionModel[index];
			var permissions = 0;
			var tam 		= 1;

			for (var i = 0; i < arr.length ; i++) {
				permissions += parseInt(arr[i]);
				tam = tam * 10;
			}

			var perLen 		= ( permissions + "" ).length;
			var sifirSayi 	= 6-perLen;

			for (var i = 0; i < sifirSayi ; i++) {
				permissions = "0"+permissions;
			}
			
			$scope.durum[index] = "kaydediliyor...";
			Izinler
				.update({id: id, permissions: permissions,type:type })
				.then(function(data){
					
					$scope.durum[index] = "kaydedildi.";
					$timeout( (function(){
						$scope.durum[index] = "";
					}) ,1000);

			});
			 
		}

		$scope.updateName = function(izin, name){
			izin.type = name;
			
			Izinler
				.update(izin)
				.then(function(data){
					$scope.durum[index] = "kaydedildi.";
					$timeout( (function(){
						$scope.durum[index] = "";
					}) ,1000);
			});
		}

		var clear = function(){
			$scope.new.name			= "";
			$scope.new.desc 		= "";
			$scope.new.image 		= "";
			$scope.new.typeID 		= "";
			$scope.new.start 		= "";
			$scope.new.end 			= "";
			$scope.new.phone 		= "";
			$scope.new.mobile 		= "";
			$scope.new.email 		= "";
			$scope.new.emailpwd 	= "";
			$scope.new.birth_date 	= "";
			$scope.new.experience	= "";
		}

		$scope.newPersonal 	= clear;
		$scope.cancelPersonal= clear;
		$scope.init();
		clear();

	});