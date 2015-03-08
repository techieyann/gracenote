Template.tweetStream.helpers({
	streamRunning: function () {
		var settings = Tweets.findOne('settings');
		if (settings) {
			return (settings.running ? 'pause':'play');
		}
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
