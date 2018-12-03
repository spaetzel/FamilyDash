define(['jquery', 'underscore', 'backbone', 'moment', 'momentTimezone', 'common', 'views/events/item', 'text!templates/events/day.html', 'text!templates/events/dayWeather.html'

], function ($, _, Backbone, moment, momentTimezone, common, itemView, dayTemplate, displayWeatherTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function () {
      this.template = _.template(dayTemplate);
      this.weatherTemplate = _.template(displayWeatherTemplate);
    },
    render: function () {
      var self = this;



      $(self.el).html(self.template({
        dayOfWeek: this.model.date.format("ddd"),
        date: this.model.date.format("MMM Do"),
      }));

      var items = this.getItems();

      _.each(items, function (curItem) {
        var view = new itemView({
          model: curItem
        });

        $('ul', self.el).append(view.render().el);
      });



      return this;
    },
    getItems: function () {

      var output = new Array();

      var thisDate = parseInt(this.model.date.format("X")) * 1000;
      var endDate = thisDate + 86400000;



      _.each(this.model.items, function (curItem) {

        var startTime = curItem.item.DTSTART * 1000;

        var endTime;

        if (curItem.item.DTEND != null) {
          endTime = curItem.item.DTEND * 1000;
        } else {

          endTime = startTime + 3600000 // add one hour;
        }


        var startMoment = moment.tz(startTime, 'GMT').add(curItem.offset, 'hours');

        var endMoment = moment.tz(endTime, 'GMT').add(curItem.offset, 'hours');


        startTime = parseInt(startMoment.tz('America/Toronto').format("X")) * 1000;
        endTime = parseInt(endMoment.tz('America/Toronto').format("X")) * 1000;

        output.push({
          color: curItem.color,
          name: curItem.name,
          title: curItem.item.SUMMARY,
          start: startMoment.tz('America/Toronto').format("h:mm a"),
          end: endMoment.tz('America/Toronto').format("h:mm a")
        });


      });

      return output;
    },
    displayWeather: function (result) {

      var self = this;
      $('.temps', self.el).html(self.weatherTemplate({
        common: common,
        result: result
      }));
    }

  });

  return eventListView;

});
