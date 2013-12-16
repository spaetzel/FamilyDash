define(['jquery', 'underscore', 'backbone', 'config', 'text!templates/chartbeat/chartbeat.html', 'sitetotal'], function($, _, Backbone, config, chartbeatTemplate) {

  var chartbeatView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(chartbeatTemplate);
    },
    render: function() {
      var self = this;
 
        $(self.el).html(self.template({
  
        }));

        var chartbeatConfig1 = {
            'api': 'https://chartbeat.com/api/quickstats/?apikey=' + config.chartbeat.apiKey + '&host=' + config.chartbeat.host,
            'element': 'chartbeatGauge',
            'label': 'CastRoller',
            'width': 230
        };

        var chartbeat1 = new SiteTotal(chartbeatConfig1);





      return this;
    }

  });

  return chartbeatView;

});