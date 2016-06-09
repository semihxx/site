appCRM.factory('CustomerSector', function(WebService) {


		return {

			get : function(id) {

				return WebService.get('sector');

			},
			
			save : function(sectorData) {

				return WebService.post('sector', sectorData);

			},

			update : function(sectorData) {

				return WebService.put('sector' + sectorData.id, sectorData);

			}

		}

	});