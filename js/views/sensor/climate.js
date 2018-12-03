define(['jquery', 'underscore', 'backbone', 'common', 'text!templates/sensor/climate.html'

], function($, _, Backbone, common, template) {

  var ClimateView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(template);
    },
    render: function() {
      this.displayClimate();

      return this;
    },
    displayClimate : function(){
      var self = this;

      common.fetchState( self.model.entityId, function(result){

      
        var set = result.attributes.temperature;

        if ( set == null ){
          set = result.attributes.target_temp_low;
        }

        $(self.el).html(self.template({
            name : result.attributes.friendly_name,
            setTemperature : set,
            currentTemperature : result.attributes.current_temperature,
            mode: result.attributes.operation_mode
        }));

        self.fetchTimeout = setTimeout( function(){ self.displayClimate(); }, 60000 );

      } );
    },
    destroy : function(){
      clearTimeout( this.fetchTimeout );
      this.remove();
    }

  });

  return ClimateView;

});
