define(['jquery', 'underscore', 'backbone', 'moment', 'common', 'views/events/item', 'text!templates/events/day.html', 'text!templates/events/dayWeather.html'

], function($, _, Backbone, moment, common, itemView, dayTemplate, displayWeatherTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(dayTemplate);
      this.weatherTemplate = _.template(displayWeatherTemplate);
    },
    render: function() {
      var self = this;
 


        $(self.el).html(self.template({
          date: this.model.date.format("ddd MMM Do"),
        }));

      var items = this.getItems();

      _.each(items, function(curItem){
        var view = new itemView({
          model: curItem
        });

        $('ul', self.el).append( view.render().el );
      });

  

      return this;
    },
    getItems: function(){

      var output = new Array();

      var thisDate = parseInt( this.model.date.format("X") ) * 1000;
      var endDate = thisDate + 86400000;


      _.each( this.model.items, function( curItem ){

        var startTime = curItem.item['y:dtstart'].utime * 1000;
        
        var endTime;

        if( curItem.item['y:dtend'] != null ){
          endTime = curItem.item['y:dtend'].utime * 1000;
        }else{
       
          endTime = startTime + 3600000 // add one hour;
        }


        var startMoment = new moment( startTime );
        var endMoment = new moment( endTime );

        // Fix time zone weirdness from pipes

        var offset = curItem.offset;

        if( startMoment.isDST() ){
          offset -= 1;

        }

        startMoment.add('hours', offset);
        endMoment.add('hours', offset);

        startTime = parseInt(startMoment.format("X")) * 1000;
        endTime = parseInt(endMoment.format("X")) * 1000;
        
        if( startTime >= thisDate && endTime < endDate ){
          output.push({
              color: curItem.color,
              name: curItem.name,
              title: curItem.item.title,
              start: startMoment.format("h:mm a"),
              end: endMoment.format("h:mm a")
          });

        }
      });

      return output;
    },
    displayWeather: function(result){

      var self = this;
        $('.temps', self.el).html(self.weatherTemplate({
          common: common,
        result: result
      }));
      }

  });

  return eventListView;

});
