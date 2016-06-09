appCRM.factory('Personal', function(WebService) {

		return {
			
			selected: "",
			select:function(){
				this.selected = Array.prototype.join.call(arguments, ",");
				return this;
			},

			get : function(id, detail) {
				var val = this.selected;
				this.selected = "";
				
				return WebService.get('personal/' + (id || "") + "?detail="+ (detail || "") +"&params=" + val);
			},
			save : function(personalData) {

				return WebService.post('personal', personalData);
			},
			update : function(personalData) {

				return WebService.put('personal/' + personalData.id, personalData);
			},
			delete : function(id) {

				return WebService.delete('personal/' + id);
			},

			getType : function() {
				
				return WebService.get('personals/type/');
			},
			
			getOnline: function(){

				return WebService.get('online');
			},

			getGroup : function(id) {

				return WebService.get('personals/group/' + (id || ""));
			},
			saveGroup : function(groupData) {
				
				return WebService.save('personals/group', groupData);
			},
			updateGroup : function(groupData) {

				return WebService.put('personals/group/'+groupData.id, groupData);
			},

			password : function(passData) {

				return WebService.put('personalpwd/' + passData.id, passData);
			}
		}

	});