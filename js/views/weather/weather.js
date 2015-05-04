define(['jquery', 'underscore', 'backbone', 'common', 'text!templates/weather/weather.html'

], function($, _, Backbone, common, weatherTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(weatherTemplate);
    },
    render: function() {
      var self = this;

      return this;
    },
    displayWeather: function(result){
      var self = this;


        $(self.el).html(self.template({
            common: common,
            currently: result.currently,
            hourly: _.first(result.hourly.data, 6)
        }));


        _.each( result.hourly.data, function(curHour){
          var date = new Date( curHour.time * 1000 );
          console.log(common.formatHour( date.getHours() ), curHour.icon, curHour.temperature, curHour.precipProbability );
        });

    }

  });

  return eventListView;

});
