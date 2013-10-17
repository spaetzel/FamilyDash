define(['jquery', 'underscore', 'backbone', 'text!templates/weather/weather.html'

], function($, _, Backbone, weatherTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(weatherTemplate);
    },
    render: function() {
      var self = this;
 
        $(self.el).html(self.template({
  
        }));



      return this;
    }

  });

  return eventListView;

});
