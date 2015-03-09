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
			var settings = Tweets.findOne('settings');
			var maxTweets = settings.tweetCount;
			var filter = {limit: maxTweets};
			var sort = Session.get('sort');
			if (sort == 'timely') filter['sort'] = {created_at: -1};
			if (sort == 'alphabetical') filter['sort'] = {text: 1};
			var foundTweets = Tweets.find({_id: {$ne: 'settings'}}, filter);
			return {
				tweets: foundTweets
			};
		}

	});
});
