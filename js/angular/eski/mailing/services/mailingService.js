appCRM.factory('Mailing', function(WebService) {

		return {

			getCategory : function(id) {
				

                return WebService.get('mailingCategory/' + (id || "") ) ; 
				
			},
			getEMail : function(id) {

                return WebService.get('mailingList/?kid=' + + (id || "") ); 
				
			},
			saveCategory : function(mailData) {

                return WebService.post('mailingCategory', mailData); 

			},
			saveEMail : function(mailData) {

                return WebService.post('mailingList', mailData); 

			},
			deleteEMail : function(id,kid) {

                return WebService.delete('mailingList' + id + '?kid=' + kid); 

			}
		}

	});