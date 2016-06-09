appCRM.factory('WebService', function($http) {
	
		var serialize = function(obj) {
		  var str = [];
		  for(var p in obj)
		    if (obj.hasOwnProperty(p)) {
		      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		    }
		  return str.join("&");
		}

		var cache = {};
		var timer = {};

		var remove_cache = function(storage_url){
			return function(){
				delete cache[storage_url];
			}
		}
		console.log($.param);
		var request = function(method, path, data, clear_time)
		{
			clear_time = clear_time || 5;

			var storage_url = path + data;
			var b_method = !!(method === "GET");

			cache[storage_url] = (b_method && cache[storage_url]) ||
				$http({
					method: method,
					url: /*'/api/' + */path,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: serialize(data)
				}).then(function(response) {
					return response.data;
				});

			b_method && setTimeout(remove_cache(storage_url), clear_time * 10000);

			return cache[storage_url];
		}

		return {
			clear: function(storage_url)
			{
				remove_cache[storage_url];
				return this;
			},
			get: function(path, data, clear_time)
			{
				return request('GET', path, data, clear_time);
			},
			post: function(path, data, clear_time)
			{
				return request('POST', path, data, clear_time);
			},
			put: function(path, data, clear_time)
			{
				return request('PUT', path, data, clear_time);
			},
			delete: function(path, data, clear_time)
			{
				return request('DELETE', path, data, clear_time);
			}
		}
	});