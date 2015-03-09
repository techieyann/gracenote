Router.configure({
	layoutTemplate: 'index',
	notFoundTemplate: 'error404',
	loadingTemplate: 'loading'
});

Router.onBeforeAction('loading');

Router.map(function () {
	this.route('tweetStream', {
		path: '/',
		title: 'tweetStream',
		subscriptions: function () {
			this.wait(Meteor.subscribe('tweets'));
		},
		data: function () {
			var filter = {};
			var settings = Tweets.findOne('settings');
			if (settings) {
				filter.limit = settings.tweetCount;
			}
			var sort = Session.get('sort');
			if (sort == 'timely') filter.sort = {created_at: -1};
			if (sort == 'alphabetical') filter.sort = {text: 1};
			var foundTweets = Tweets.find({type: 'tweet'}, filter);
			return {
				tweets: foundTweets
			};
		}

	});
});
