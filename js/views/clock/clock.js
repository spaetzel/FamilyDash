define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

	  var clockView = Backbone.View.extend({

	initialize: function(){

		
	},
	render: function(){

    

		this.displayClock();
	},
	displayClock: function(){

		thelement=this.el;

		var Digital=new Date()
		var hours=Digital.getHours()
		var minutes=Digital.getMinutes()
		var seconds=Digital.getSeconds()

		if (hours>12)
		hours=hours-12
		if (hours==0)
		hours=12
		if (minutes<=9)
		minutes="0"+minutes
		if (seconds<=9)
		seconds="0"+seconds
		var ctime=hours+":"+minutes+":"+seconds+" "
		$(thelement).html(ctime);
		var self = this;
		setTimeout(function(){ self.displayClock() },1000)

    }

  });



  return clockView;
});
