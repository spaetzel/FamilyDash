define(['jquery', 'order!underscore', 'backbone', 'views/events/list',  'views/clock/clock', 'views/weather/weather', 'views/photos/photos', 'text!templates/main/home.html'], 
  function($, _, Backbone, eventsList, clockView, weatherView, photosView, mainTemplate) {

  var mainHomeView = Backbone.View.extend({

    el: $('#bodyArea'),

    initialize: function() {
      this.template = _.template(mainTemplate);
    },
    render: function() {


      $(this.el).html(this.template());


      var events = new eventsList({
        el: $('#events')
      });

      events.render();

      var clock = new clockView({
        el: $('#clock')
      });
      clock.render();

       var weather = new weatherView({
        el: $('#weather')
      });
      weather.render();

      var photos = new photosView({
        el: $('#photos')
      });
      photos.render();

      $('.nav li').removeClass('active');
      $('#home').addClass('active');

    }

  });



  return mainHomeView;
});
