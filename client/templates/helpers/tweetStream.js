Template.tweetStream.helpers({
	streamRunning: function () {
		var settings = Tweets.findOne('settings');
		if (settings) {
			return (settings.running ? 'pause':'play');
		}
	},
	lat: function () {
		return this.coordinates.coordinates[1];
	},
	lon: function () {
		return this.coordinates.coordinates[0];
	}
});

Template.tweetStream.events = {
	'click .stream-running': function () {
		var settings = Tweets.findOne('settings');
		if (settings) {
			settings.running = !settings.running;
			Tweets.update({_id: 'settings'}, settings);
		}
	}
};
