define(['jquery', 'underscore', 'backbone', 'text!templates/weather/weather.html'

], function($, _, Backbone, weatherTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(weatherTemplate);
      this.src= "http://forecast.io/embed/#lat=43.431598&lon=-80.519807&name=Kitchener&units=si";
    },
    render: function() {
      var self = this;
 
        $(self.el).html(self.template({
  
        }));


      this.refreshFrame();

      return this;
    },
    refreshFrame: function(){
      var element = $('iframe', this.el)[0];
      element.src = this.src;

      var self = this;

      setTimeout( function(){ self.refreshFrame(); }, 300000 );

    }

  });

  return eventListView;

});
