define(['jquery', 'order!underscore', 'backbone', 'views/events/list', 'views/clock/clock', 'views/weather/weather', 'views/photos/photos', 'text!templates/main/home.html'], 
  function($, _, Backbone, eventsList, clockView, weatherView, photosView, mainTemplate) {

    var weather;
    var events;

    var weather;
    var events;

  var mainHomeView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(mainTemplate);
    },
    render: function() {


      $(this.el).html(this.template());


      events = new eventsList({
        el: $('#events')
      });

      events.render();

      var clock = new clockView({
        el: $('#clock')
      });
      clock.render();

      weather = new weatherView({
        el: $('#weather')
      });
      weather.render();

/*

      var photos = new photosView({
        el: $('#photos')
      });
      photos.render();
*/


      this.fetchWeather();


    },
    fetchWeather: function(callback){
        var self = this;

       var url = "https://api.forecast.io/forecast/2d6c80b1da58dfb81fcf5ae22b9a441c/43.431598,-80.519807?units=si&callback=?";

      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'jsonp'
      }).always(function(result){
          weather.displayWeather( result );
          events.displayWeather( result );


      });

      setTimeout( function(){ self.fetchWeather(); }, 150000 );
    }

  });



  return mainHomeView;
});
