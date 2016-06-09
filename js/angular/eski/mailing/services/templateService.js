appCRM.factory('Template', function(WebService) {

		return {

			get: function(id) {
				id = (id == undefined) ? "": id;

                return WebService.get('template/' + id); 

			},

			save: function(name) {

                return WebService.post('template/', $.param({name: name}) ); 

			},

			update: function(templateData) {

                return WebService.put('template/' + templateData.id, templateData); 

			},

			delete : function(id) {

                return WebService.delete('template/' + id); 

			},

			sendMail: function(id, data, subject){

                return WebService.put('sendmail/' + id, $.param({customers: data, subject: subject}) ); 

			}

		}

	});