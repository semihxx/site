appCRM.factory('Demopool', function(WebService) {

		return {

			get : function(id) {
				
				id = id == undefined ? "": id;

                return WebService.get('demopool/' + id); 

			},

			save : function(demoData) {

                return WebService.post('demopool/', demoData); 

			},

			update : function(demoData) {

                return WebService.put('demopool/' + demoData.id, demoData); 

			},
			delete : function(id, sector_id) {

                return WebService.delete('demopool/' + id + "?sector_id=" + sector_id); 

			}
		}

	});