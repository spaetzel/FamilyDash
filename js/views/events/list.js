define(['jquery', 'underscore', 'backbone', 'moment', 'config', 'views/events/day', 'text!templates/events/list.html'

], function($, _, Backbone, moment, config, dayView, listTemplate) {

  var dayViews;
  var storedWeather;

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(listTemplate);
    },
    render: function() {
      var urls = config.urls;



      var eventsUrl = config.ical2json;

      this.fetchEvents(urls, eventsUrl);


      var self = this;

      setTimeout( function(){ self.render(); }, 120000 );

      return this;
    },
    getDates: function( events ){

      var element = $('#list', this.el);

      var self = this;

      var date = moment({hour: 0});

      dayViews = new Array();

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

          dayViews.push(view);

          date.add( 1, 'days');


      }

      if( storedWeather != null ){
        self.displayWeather( storedWeather );
      }

    },
    fetchEvents: function(urls, pipe){

      var self = this;


       var events = [];

      var renderEvents = _.after( urls.length, function(){
           $(self.el).html(self.template() );

          var sorted = _.sortBy( events, function(curEvent){
            return curEvent.item.DTSTART;
          });

          self.getDates(sorted);


      });


      var now = new Date();

      _.each( urls, function(curUrl){
        var fullUrl = pipe + curUrl.url + "?callback=?";


        $.getJSON(fullUrl, function(data){


            _.each( data.VCALENDAR.VEVENT, function(curItem){


              events.push( {
                item: curItem,
                color: curUrl.color,
                name: curUrl.name,
                offset: curUrl.offset } );
            });
            renderEvents();
        });
      });

    },
    displayWeather: function(result){
      if( dayViews != null ){

        for( var i = 0; i < dayViews.length; i++){
          var curView = dayViews[i];
          var weather = result.daily.data[i];

          if( weather != null ){
            curView.displayWeather( weather );
          }
        }

      }
      storedWeather = result;
    }

  });

  return eventListView;

});
