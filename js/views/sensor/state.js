define(['jquery', 'underscore', 'backbone', 'common', 'text!templates/sensor/state.html'

], function($, _, Backbone, common, template) {

  var StateView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(template);
    },
    render: function() {
      this.display();

      return this;
    },
    display : function(){
      var self = this;

      common.fetchState( self.model.entityId, function(result){

        $(self.el).html(self.template({
            name : result.attributes.friendly_name,
            state : result.state,
        }));

        self.fetchTimeout = setTimeout( function(){ self.display(); }, 60000 );

      } );
    },
    destroy : function(){
      clearTimeout( this.fetchTimeout );
      this.remove();
    }

  });

  return StateView;

});
