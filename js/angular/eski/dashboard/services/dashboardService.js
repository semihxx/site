appCRM.factory('Dashboard', function(WebService) {

           
		return {

			get : function() {

                return WebService.get('stats'); 

			},
          
          
            getDuyuru : function() {

                return WebService.get('/js/duyuru.json'); 

            },
			
           
		}

	});