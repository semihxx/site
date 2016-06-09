appCRM.factory('Izinler', function(WebService) {


		return {

			get : function(id) {
				id = id == undefined ? "": id;

                return WebService.get('group/' + id); 
				
			},
			
			save : function(permissionData) {

                return WebService.post('group/', permissionData); 

			},

			update : function(permissionData) {

                return WebService.put('group/' + permissionData.id, permissionData); 

			},
			
			delete : function(id) {

                return WebService.post('group/' + id); 

			}
		}

	});