appCRM.factory('CustomerType', function(WebService) {

		return {


			get : function(id) {

				return WebService.get('customerType');

			},
			
			save : function(typeData) {

				return WebService.post('customerType', typeData);
				
			},

			update :  function(typeData) {

				return WebService.put('customerType' + typeData.id, typeData);

			}
			
		}

	});