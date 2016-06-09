;appCRM.factory('Timeline', function(WebService) {

		return {

			get: function() {
                
                return WebService.get('timeline'); 

			},
			getCount: function() {
                
                return WebService.get('timeline/?count=true'); 

			}
		
		}

	});