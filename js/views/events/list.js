define(['jquery', 'underscore', 'backbone', 'config', 'views/events/item', 'text!templates/events/list.html'

], function($, _, Backbone, config, itemView, listTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(listTemplate);
    },
    render: function() {
      var urls = config.urls;

      $(this.el).html(this.template() );

      var eventsUrl = "http://pipes.yahoo.com/pipes/pipe.run?_id=7d1612a234562c3c4b52ffc1bc682fb0&_render=json&iCalURL=";

      var currentUrl = "http://pipes.yahoo.com/pipes/pipe.run?_id=2483704c2eece2e34e88db1fbfe6aa1a&_render=json&iCalURL=";

      this.fetchEvents(urls, eventsUrl, $('#list', this.el));


      this.fetchEvents(urls, currentUrl, $('#current', this.el));
      
     
      return this;
    },
    fetchEvents: function(urls, pipe, element){

      var self = this;


       var events = [];

      var renderEvents = _.after( urls.length, function(){

          var sorted = _.sortBy( events, function(curEvent){
            return curEvent.item.dtstart;
          });

          _.each(sorted, function(curItem){
            var view = new itemView({
              model: curItem
            });
            $(element).append(
              view.render().el
            );

          });

 
      });

      
      var now = new Date();

      _.each( urls, function(curUrl){
        var fullUrl = pipe + encodeURIComponent(curUrl.url) + "&_callback=?";


        $.getJSON(fullUrl, function(data){


            _.each( data.value.items, function(curItem){


              events.push( {
                item: curItem,
                color: curUrl.color,
                name: curUrl.name } );
            });
            renderEvents();
        });
      });

    }

  });

  return eventListView;

});
