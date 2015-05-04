define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

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
	}
}
	return common;
	});
