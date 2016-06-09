appCRM.factory('Survey', function(WebService) {

		return {

			get: function(id, person) {
				id = id == undefined ? "": id;

                return WebService.get('survey/' + id + '?person_id=' + person); 

			},

			save: function(newLink){

                return WebService.post('survey', 
                	{link: newLink.link, project_id: newLink.project_id, person_id: newLink.person_id}); 

			},

			update: function(survey, project_id){

                return WebService.put('survey/' + project_id, survey); 

			},

			delete: function(id){
                
                return WebService.delete('survey' + id); 

			}

		}

	});