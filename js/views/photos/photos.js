define(['jquery', 'underscore', 'backbone', 'text!templates/photos/photos.html'

], function($, _, Backbone, weatherTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(weatherTemplate);
      this.src= "http://www.flickr.com/slideShow/index.gne?user_id=48889116964@N01";
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

      setTimeout( function(){ self.refreshFrame(); }, 100000 );

    }

  });

  return eventListView;

});
