define(['jquery', 'underscore', 'backbone', 'text!templates/events/list.html'

], function($, _, Backbone, listTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(listTemplate);
    },
    render: function() {
      var eventsUrl = "http://pipes.yahoo.com/pipes/pipe.run?_id=c4d622b74864444d50c1d73e56bfbb13&_render=json&_callback=?";

      console.log(eventsUrl);

      var self = this;

      $.getJSON(eventsUrl, function(data) {
        var events = data.value.items;

        console.log(events.length);

 
        $(self.el).html(self.template({
          topItems: _.first(events, 1),
          restItems: _.rest(events, 1)
        }));


      });



      return this;
    }

  });

  return eventListView;

});
