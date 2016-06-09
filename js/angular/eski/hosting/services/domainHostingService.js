appCRM.factory('Domainhosting', function(WebService) {
		
		return {

			get : function(id) {
				
				id = id == undefined ? "": id;

                return WebService.get('domainhosting/' + id); 

			},

			getEnd : function() {

                return WebService.get('domainhosting/?end=end'); 

			},

			save : function(domainData) {

                return WebService.post('domainhosting', domainData); 

			},

			update :  function(domainData) {

				var id = domainData.id;

                return WebService.put('domainhosting/'+ id, domainData); 

			},
			
			delete : function(id) {

                return WebService.delete('domainhosting' + id); 

			}
		}

	});