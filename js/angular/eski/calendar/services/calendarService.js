appCRM.factory('Calendar', function(WebService) {

		return {

			get : function() {

			    var unix = +new Date(moment().format("DD MM YYYY")._d);
			    var unix2 = +new Date(moment().add(1,"day").format("DD MM YYYY")._d);
				
				return WebService.get(
							'calendar/?' + $.param( {start: unix, end: unix2} ) 
						);
					
			},
			save :  function(calendarData) {
				return WebService.post('calendar', calendarData);
			},
			update : function(calendarData) {
				return WebService.put('calendar/' + calendarData.id, calendarData);
			},
			delete : function(id) {
				return WebService.delete('calendar/' + id);
			}
		}

	});