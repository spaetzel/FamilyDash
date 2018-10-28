define(['jquery', 'underscore', 'backbone', 'config'], function($, _, Backbone, config) {

	var common = {
		roundTemp: function(temp){
		return Math.round( temp );
	  },
	  translateIcon: function(icon){
		  switch(icon){
			  case "clear-day":
				  return "wi-day-sunny";
			  case "clear-night":
				  return "wi-night-clear";
			  case "rain":
				  return "wi-rain";
			  case "snow":
				  return "wi-snow";
			  case "sleet":
				  return "wi-hail";
			  case "wind":
				  return "wi-cloudy-windy";
			  case "fog":
				  return "wi-fog";
			  case "cloudy":
				  return "wi-cloudy";
			  case "partly-cloudy-night":
				  return "wi-night-cloudy";
			  case "partly-cloudy-day":
				  return "wi-day-sunny-overcast";
			  default:
		  }
	  },
		formatHour: function(hour){
			if( hour > 12 ){
				return ( hour - 12 ) + " PM";
			}else{
				return hour + " AM";
			}
		},
		fetchUrl: function(url, callback){
			$.ajax({
				url: url,
				method: 'GET',
				dataType: 'jsonp'
			}).always(callback);
		},
		fetchWeather: function(callback){
				var self = this;
	
			 var url = "https://api.forecast.io/forecast/2d6c80b1da58dfb81fcf5ae22b9a441c/43.431598,-80.519807?units=si&callback=?";
	
			this.fetchUrl(url, callback);
		},
		fetchState : function(entityId, callback){
			var url = config.homeAssistantUrl + '/api/states/' + entityId + "?api_password=" + config.homeAssistantPassword;
	
			$.ajax({
				url: url,
				method: 'GET'
			}).always(callback);
		}
	}
		return common;
		});
	