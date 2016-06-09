appCRM.factory('Ticket', function(WebService) {

		return {

			get: function(id, state) {

				id = id == undefined ? "": id;

                return WebService.get('ticket/?id='+ id + '&state=' + state || 2); 
				
			},
			getFilter: function( start, end ){

                return WebService.get('ticket/?start=' + start*1000 + "&end=" + end*1000); 

			},
			getDetail: function(id) {

				id = id == undefined ? "": id;

                return WebService.get('ticket/'+ id); 

			},
			getComment: function(id) {

                return WebService.get('ticketComments/' + id); 
				
			},
			sendMail: function(id) {

                return WebService.post('ticketsendMail/' + id); 
				
			},
			save: function(ticketData) {
                
                return WebService.post('ticket', ticketData); 

			},
			delete: function(id, state) {

				id = id == undefined ? "": id;

                return WebService.delete('ticket/'+ id); 
				
			},
			saveComment: function(ticketData) {
                
                return WebService.delete('ticketComments', ticketData); 

			},
			update: function(ticketData) {

                return WebService.put('ticketComments' + ticketData.id, ticketData); 

			}

		}

	});