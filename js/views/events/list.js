define(['jquery', 'underscore', 'backbone', 'moment', 'config', 'views/events/day', 'text!templates/events/list.html'

], function($, _, Backbone, moment, config, dayView, listTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(listTemplate);
    },
    render: function() {
      var urls = config.urls;

      $(this.el).html(this.template() );

      var eventsUrl = "http://pipes.yahoo.com/pipes/pipe.run?_id=7d1612a234562c3c4b52ffc1bc682fb0&_render=json&iCalURL=";

      this.fetchEvents(urls, eventsUrl, $('#list', this.el));


      var self = this;

      setTimeout( function(){ self.render(); }, 120000 );

      return this;
    },
    getDates: function(element, events){

      var date = moment({hour: 0});


      for( var i = 0; i < 24; i++ ){
       

         var view = new dayView({
              model: {
                date: date,
                items: events
              }
            });
            $(element).append(
              view.render().el
            );

          date.add('days', 1);


      }

    },
    fetchEvents: function(urls, pipe, element){

      var self = this;


       var events = [];

      var renderEvents = _.after( urls.length, function(){

          var sorted = _.sortBy( events, function(curEvent){
            return curEvent.item.dtstart;
          });

          self.getDates(element, sorted);

/*
          _.each(sorted, function(curItem){
            var view = new itemView({
              model: curItem
            });
            $(element).append(
              view.render().el
            );

          });
*/
 
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
