var router;


// Filename: router.js
define(['jquery', 'underscore', 'backbone', 'views/home/home'], function($, _, Backbone, mainHomeView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
  
      'home': 'defaultAction',
    
      // Default
      '*actions': 'defaultAction'
    },

    defaultAction: function(actions) {

      // We have no matching route, lets display the home page
      var homeView = new mainHomeView();
      homeView.render();

    }
  });

  var initialize = function() {
      router = new AppRouter;
      Backbone.history.start();
      };
  return {
    initialize: initialize
  };

});
