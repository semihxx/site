;appCRM.controller('ticketsController', function($scope, $timeout, Ticket, personalID) {
		$scope.newTicketState = true;
		$scope.new = {};
		$scope.limitList = 5;

		var objDurum = {
			"warning" 	: "Lüften Bekleyiniz...",
			"success" 	: "Bilgileriniz başarılı bir şekilde kaydedilmiştir.",
			"danger"	: "Kaydetme esnasında bir hata oluştu."
		}

		$scope.durumAyarla = function(durum){
			$scope.Durum = objDurum[durum];
		}
		$scope.Durum = "Gönder";
		Ticket
			.get(personalID,4)
			.then(function(data){
				var len = data.length;
				$scope.ticketList = [];
				for (var i = 0; i < len; i++) {
					var fn = function(){
						var data2 = data[i];
						return function(){ $scope.ticketList.push(data2); };
					}
					$timeout( fn(), 500*i );
				};
			});

 		$scope.dateRefresh = function(start, end){
            Ticket
                .getFilter(moment(start._d).unix(), moment(end._d).unix())
                .then(function(data){
                    $scope.ticketList = data;                   
                });

        }
        
		$scope.delete = function($index, ticket){
			if ( confirm('Silmek istediğinize emin misiniz?') ) 
				Ticket
					.delete(ticket.id)
					.then(function(){
						var len = $scope.ticketList.length;
						for (var i = len - 1; i >= 0; i--) {
							if ( $scope.ticketList[i].id == ticket.id ){
								$scope.ticketList.splice(i, 1);
							}
						};

					});
		}

		$scope.ticketState = function(ticket, state){

			ticket.state = state;
			Ticket.update(ticket);
		}

		$scope.comment = {};
		$scope.sendComment = function(ticket, img){
			$scope.comment.ticket_id = ticket.id;
			$scope.comment.person_id = personalID;
			
			$scope.durumAyarla("warning");

			$scope
				.comment
				.image 	= img.files.length > 0 ? img.files[0].relativePath : "";
				
			Ticket
				.saveComment($scope.comment)
				.then(function(data){

					ticket.count = parseInt(ticket.count) +1;
					$scope.Durum = "Kaydedildi, mail gönderiliyor...";
					
					Ticket
						.sendMail(ticket.id)
						.then(function(data){
							ticket.answerState = true;
							$scope.Durum = "İşlem Tamamlandı.";
							$scope.getComment(ticket.id, ticket);

						});

					$scope.comment.comment = "";
					$scope.comment.image 	= "";

				});
		}
    	
    	var state = [];
    	$scope.getComment = function(id, objComment){
			objComment.ticketComment = [[]];
			state[id] = state[id] ? 0 : 1;
    		if ( state[id] == 1 )
    		{

	    		Ticket
					.getComment(id)
					.then(function(data){
						var len = data.length;
						$scope.Durum = "Gönder";
						objComment.ticketComment = [[]];
						$scope.yazan = window.personalName;
						for (var i = 0; i < len; i++) {
							var fn = function(){
								var data2 = data[i];
								console.log(data2);
								return function(){ objComment.ticketComment[0].push(data2); };
							}
							$timeout( fn(), 500*i );
						};
					});
			}else{
				objComment.ticketComment = [[]];
			}
    	}

	});
	