appCRM.factory('Mission', function(WebService) {
/*
TODO

- bindonce plugin
- angular-paginate-filter
- nginfite-scroll
- https://github.com/scalyr/angular
- fastscroll-demo (demienklinnert)
- ngreact

*/
		return {
			
			personal: {
				get2 : function(id) {

                	return WebService.get('mission/personal/' + (id || "") ); 

				},
				get : function(id) {

                	return WebService.get('mission/personal/' + (id || "") ); 
                	
				},
				save : function(datas) {

                	return WebService.post('mission/personal/', datas); 

				},
				update : function(datas) {

                	return WebService.put('mission/personal/'+ datas.id, datas); 

				},
				delete : function(deleted_id, id) {

                	return WebService.delete('mission/personal/' + deleted_id, {id: id} ); 

				}

			},
			
			get : function(id) {

                return WebService.get('mission/project/' + (id || "") ); 
				
			},

			onGoingGet : function(id) {

                return WebService.get('mission'); 
				
			},

			save : function(data) {

                return WebService.post('mission', data); 

			},

			update : function(data) {

                return WebService.put('mission/' + data.id, data); 

			},

			delete : function(deleted_id, id) {

                return WebService.delete('mission/' + deleted_id, {id: id}); 

			}
		}

	});