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
            currently: result.currently
        }));

        _.each( result.hourly.data, function(curHour){
          var date = new Date( curHour.time * 1000 );
          console.log(date.getHours(), curHour.summary );
        });

    }

  });

  return eventListView;

});
