define(['jquery', 'underscore', 'backbone', 'text!templates/events/item.html'

], function($, _, Backbone, itemTemplate) {

  var eventListView = Backbone.View.extend({
    initialize: function() {
      this.template = _.template(itemTemplate);
    },
    render: function() {
      var self = this;
 
 console.log('item', self.model);

        $(self.el).html(self.template({
  			item: self.model
        }));


  

      return this;
    }

  });

  return eventListView;

});
