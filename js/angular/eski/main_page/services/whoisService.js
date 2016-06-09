appCRM.factory('Whois', function(WebService) {
		
		return {

			get: function(domain) {

                return WebService.get('/whois.php?domain='+domain); 
				
			},

		}

});