appCRM.factory('DuyurularYonetim', function(WebService) {

		return {

			get: function(id) {

                return WebService.get('panelYonetim/'+id); 

			},

			save : function( duyuruData ) {

                return WebService.post('panelYonetim', duyuruData); 

			},

			update : function( duyuruData ) {

                return WebService.post('panelYonetim/' + duyuruData.id, duyuruData); 

			},

			delete : function( id ) {

                return WebService.delete('panelYonetim' + id); 

			}

		}

	});