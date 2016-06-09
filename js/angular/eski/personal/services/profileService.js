appCRM.factory('Profile', function(WebService) {

		return {

			get: function() {

				return WebService.get('profile');
				
			},

			update: function(id, profileData) {

				return WebService.put('profile/' + id, profileData);

			},

			changePassword: function(profileData) {

				return WebService.put('resetpassword/' + profileData.id, profileData);

			}
		}

	});