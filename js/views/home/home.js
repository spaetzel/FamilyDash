define(['jquery', 'order!underscore', 'backbone', 'views/events/list', 'views/clock/clock', 'views/weather/weather', 
'views/sensor/climate', 'views/sensor/state', 'text!templates/main/home.html'],
  function($, _, Backbone, eventsList, clockView, weatherView, ClimateView, StateView, mainTemplate) {

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

      this.evelynRoom = new ClimateView({
        el: $('#evelynRoom', this.el),
        model : {
          entityId : 'climate.evelyn_heater'
        }
      });
      this.evelynRoom.render();
 
      this.ecobee = new ClimateView({
        el: $('#ecobee', this.el),
        model : {
          entityId : 'climate.my_ecobee3'
        }
      });
      this.ecobee.render();

      this.office = new ClimateView({
        el: $('#office', this.el),
        model : {
          entityId : 'climate.office_heater'
        }
      });
      this.office.render();


      this.garage = new StateView({
        el: $('#garageDoor', this.el),
        model : {
          entityId : 'cover.garage_door'
        }
      });
      this.garage.render();

      this.outside = new StateView({
        el: $('#outside', this.el),
        model : {
          entityId : 'light.outside'
        }
      });
      this.outside.render();


      weather = new weatherView({
        el: $('#weather')
      });
      weather.render();




      this.fetchWeather();


    },
    fetchWeather: function(callback){
        var self = this;

       var url = "https://api.darksky.net/forecast/da017f7fd9caeb26a344bcca792d15a2/43.431598,-80.519807?units=si&callback=?";

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
