appCRM.factory('Customer', function(WebService) {
		
		return {

			
			selected: "",
			select:function(){
				this.selected = Array.prototype.join.call(arguments, ",");
				return this;
			},
			
			get : function(id) {
				var val = this.selected;
				this.selected = "";

				return WebService.get('customer/' + (id + '?' + $.param({params: val}) || "" + '?' +  $.param({state: 1, params: val}) ));

			
			},
			getPending : function(id) {
				id = id == undefined ? "": id;

				return WebService.get('customer/' + '?' +  $.param({state: 0}));
				
			},
			getpager : function(page) {

				var val = this.selected;
				this.selected = "";

				return WebService.get('customer/page/' + page + '?' + $.param({state: 1, params: val}));

			},
			search : function(name) {

				var val = this.selected;
				this.selected = "";

				return WebService.get('customer/search/' + name  + "?params=" + val);

			},
			

			save : function(customerData) {

				return WebService.post('customer', customerData);

			},
				
			update : function(customerData, sendPwd, reset) {


				customerData.state_mail	= sendPwd;
				customerData.state_reset = reset;

				return WebService.put('customer/' + customerData.id, customerData);

			},

			delete : function(id) {

				return WebService.delete('customer');

			},

		}
	});