appCRM.factory('Duyurular', function(WebService) {

		return {

			get: function(id) {

                return WebService.get('panel/' + id); 
				
			},

			save : function( duyuruData ) {

                return WebService.post('panel', duyuruData); 

			},

			update : function( duyuruData ) {

                return WebService.put('panel', duyuruData); 

			},

			delete : function( id ) {

                return WebService.delete('panel' + id); 

			}

		}

	});