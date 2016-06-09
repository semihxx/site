appCRM.factory('Error', function($http) {

		return {

			get : function() {
				return  $http({
					method: 'GET',
					url: '/error'
				});
			},

			update : function(errorData) {

				return $http({
					method: 'PUT',
					url: '/error/' + errorData.id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param({state: errorData.state})
				});
			},
			getFilter: function( start, end ){

				return  $http({
					method: 'GET',
					url: '/error/?start=' + start * 1000 + "&end=" + end * 1000,
				});
			}

		}

	});