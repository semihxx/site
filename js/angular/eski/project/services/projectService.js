appCRM.factory('Project', function(WebService) {
		
		var mission_seen = function (state_id, id) {
			setTimeout(function(){
				WebService.get('project/' + id + '?' + {state: "state"});
			}, 1000);
		}

		return {

			selected: "",

			select:function(){
				this.selected = Array.prototype.join.call(arguments, ",");
				return this;
			},
			
			get : function(state_id, id) {
				id = (id == undefined) ? "": id;

				state_id == "project" && mission_seen(state_id, id);
					
				return  WebService.get('project/' + id + '?' + $.param({state: state_id}) );
			},

			save : function(saveData) {
				return WebService.post('project', saveData)
			},

			update : function(updateData) {
				return WebService.put('project/' + commentData.id, updateData)
			},

			delete : function(id) {
				return WebService.delete('project/' + id)
			},

			personal : function(id) {
				id = (id == undefined) ? "": id;
				return  WebService.get('project/personal/' + id);
			},

			sort : function(sortData) {
				return WebService.put('project/sort/' + sortData.current, sortData)
			},

			state : function(id) {
				return WebService.put('project_state/' + id)
			},

			priority : function(priorityData) {
				return WebService.put('project/priority/' + priorityData.id, priorityData)

			}
			
		}

	});