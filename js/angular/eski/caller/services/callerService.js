appCRM.factory('Caller', function(WebService) {

		return {


			get: function(id) {
				id = id == undefined ? "": id;

				return WebService.get('callList'+id);
					
			},
			getFilter: function( start, end ){

				return WebService.get('callList/?start=' + start * 1000 + "&end=" + end * 1000);

			},
			save: function(callerData) {

				return WebService.post('callList', callerData);

			},

			update: function(callerData) {

				var id = callerData.id;

				return WebService.put('callList' + id, callerData);

			},
			delete: function(id) {

				return WebService.delete('callList' + id);
				
			},
		}

	});