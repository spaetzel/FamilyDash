define(['jquery', 'underscore', 'backbone', 'config', 'text!templates/chartbeat/chartbeat.html', 'sitetotal'

], function($, _, Backbone, config, chartbeatTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(chartbeatTemplate);
    },
    render: function() {
      var self = this;
 
        $(self.el).html(self.template({
  
        }));

        var chartbeatConfig = {
            'api': 'https://chartbeat.com/api/quickstats/?apikey=' + config.chartbeat.apiKey + '&host=' + config.chartbeat.host,
            'element': 'chartbeatGauge',
            'label': 'Visitors CastRoller',
            'width': 230
        };

        var chartbeat = new SiteTotal(chartbeatConfig);


      return this;
    }

  });

  return eventListView;

});
