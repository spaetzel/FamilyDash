define(['jquery', 'underscore', 'backbone', 'text!templates/events/list.html'

], function($, _, Backbone, listTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(listTemplate);
    },
    render: function() {
      var urls = [ "http://p01-calendarws.icloud.com/ca/subscribe/1/PtSggz87k5UY1Yzlg1u56opPikvOTXJNQoz_7EXDvqfR1tlzK8jcMfrCCGEhRhNQ",
      "http://p01-calendarws.icloud.com/ca/subscribe/1/W5A1qfQwaf-IN68VkEcJoECoht9hbtM9DxpFg8snr5sUqKvBGXX1z7HlYcEbFryLzfBKP0cg88YbHmLE7-s_bH40StWi9Mpd-P3dsZgzSlI"
      ];

      var eventsUrl = "http://pipes.yahoo.com/pipes/pipe.run?_id=7d1612a234562c3c4b52ffc1bc682fb0&_render=json&iCalURL=";

      var self = this;

      var events = [];

      var renderEvents = _.after( urls.length, function(){
          console.log(events[0]);

        console.log(events.length);

          var sorted = _.sortBy( events, function(curEvent){
            return curEvent.dtstart;
          });

          $(self.el).html(self.template({
            topItems: _.first(sorted, 1),
            restItems: _.rest(sorted, 1)
          }));
      });

      
      _.each( urls, function(curUrl){
        var fullUrl = eventsUrl + encodeURIComponent(curUrl) + "&_callback=?";

            console.log(fullUrl);

        $.getJSON(fullUrl, function(data){

            _.each( data.value.items, function(curItem){
              events.push( curItem );
            });

            console.log(events.length);

            renderEvents();
        });
      });

  /*

      $.getJSON(eventsUrl, function(data) {
        var events = data.value.items;

        console.log(events.length);

 
        $(self.el).html(self.template({
          topItems: _.first(events, 1),
          restItems: _.rest(events, 1)
        }));


      });

*/

      return this;
    }

  });

  return eventListView;

});
