Template.navbar.helpers({
	streamDisabled: function (button) {
		var settings = Tweets.findOne('settings');
		if (settings) {
			if (settings.running) {
				if (button == 'play') return 'disabled';
			}
			else {
				if (button == 'pause') return 'disabled';
			}
		}

	},
	sortDisabled: function (button) {
		var sort = Session.get('sort');
		if (sort == button) return 'disabled';
	},
	numTweets: function () {
		var settings = Tweets.findOne('settings');
		if (settings) return settings.tweetCount;
	}
});

Template.navbar.events = {
	'click .stream-running': function () {
		var settings = Tweets.findOne('settings');
		if (settings) {
			settings.running = !settings.running;
			Tweets.update({_id: 'settings'}, settings);
		}
	},
	'click .stream-sort': function () {
		var sort = Session.get('sort');
		if (sort == 'timely') sort = 'alphabetical';
		else if (sort == 'alphabetical') sort = 'timely';
		Session.set('sort', sort);
	},
	'click .new-tweet-number': function (e) {
		e.preventDefault();
		var settings = Tweets.findOne('settings');
		if (settings) {
			settings.tweetCount = e.target.id;
			Tweets.update({_id: 'settings'}, settings);
		}
	}
};
