define(['jquery', 'underscore', 'backbone', 'text!templates/weather/weather.html'

], function($, _, Backbone, weatherTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(weatherTemplate);
      this.src= "http://forecast.io/embed/#lat=43.431598&lon=-80.519807&name=Kitchener&units=si";
    },
    render: function() {
      var self = this;

      this.refreshFrame();

      return this;
    },
    refreshFrame: function(){
      var self = this;

      var url = "https://api.forecast.io/forecast/2d6c80b1da58dfb81fcf5ae22b9a441c/43.431598,-80.519807?units=si&callback=?";

      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'jsonp'
      }).always(function(result){
        console.log(result);


        $(self.el).html(self.template(
            result
        ));

      });

      setTimeout( function(){ self.refreshFrame(); }, 150000 );

    }

  });

  return eventListView;

});
