define([
  'jquery',
  'underscore',
  'backbone',
  'router', 
  'common'
], function($, _, Backbone, Router, common){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();

  }

  return {
    initialize: initialize
  };
});
