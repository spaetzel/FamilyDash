define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	// Fill the URLs with as many iCal URLs as needed
	var config = {
		// The url to a server running iCal2json http://github.com/philippbosch/ical2json
		ical2json: 'https://...com/',
		urls: [{
			name: 'WatCamp Events',
			url: "http://www.google.com/calendar/feeds/nlkc39jt4p0nbc4pk9pj7p5fh0%40group.calendar.google.com/public/basic?orderby=starttime&max-results=20&singleevents=true&sortorder=ascending&futureevents=true&ctz=America/New_York",
			color: "#00bd00"
		}]
	}
	return config;
});
